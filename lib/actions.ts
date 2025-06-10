"use server"

import type { WeatherData } from "./types"

const API_KEY = process.env.VISUAL_CROSSING_API_KEY

export async function getWeatherData(location: string): Promise<WeatherData> {
  try {
    // Construir URL de la API para obtener datos actuales y pronóstico
    const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline"
    const url = `${baseUrl}/${encodeURIComponent(location)}?unitGroup=metric&include=hours%2Ccurrent%2Cdays&key=${API_KEY}&contentType=json`

    console.log("Fetching weather data from:", url)

    // Realizar la solicitud a la API
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidar cada hora
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`)
      throw new Error(`Error en la API: ${response.status}`)
    }

    const data = await response.json()
    console.log("API Response structure:", {
      hasCurrentConditions: !!data.currentConditions,
      hasDays: !!data.days,
      daysLength: data.days?.length,
      resolvedAddress: data.resolvedAddress,
    })

    // Verificar que tenemos los datos necesarios
    if (!data.days || data.days.length === 0) {
      throw new Error("No se encontraron datos meteorológicos para esta ubicación")
    }

    // Obtener condiciones actuales (usar el primer día si no hay currentConditions)
    const currentConditions = data.currentConditions || {
      datetime: new Date().toISOString().split("T")[1].substring(0, 5), // HH:MM format
      temp: data.days[0].temp,
      feelslike: data.days[0].feelslike || data.days[0].temp,
      humidity: data.days[0].humidity || 0,
      windspeed: data.days[0].windspeed || 0,
      conditions: data.days[0].conditions || "Desconocido",
      precipprob: data.days[0].precipprob || 0,
      icon: data.days[0].icon,
    }

    // Crear array de pronóstico por horas
    const hourlyForecast = []

    // Agregar horas del día actual y siguiente (si están disponibles)
    for (let dayIndex = 0; dayIndex < Math.min(data.days.length, 2); dayIndex++) {
      const day = data.days[dayIndex]
      if (day.hours && Array.isArray(day.hours)) {
        const dayHours = day.hours.map((hour: any) => ({
          datetime: `${day.datetime}T${hour.datetime}`,
          temp: hour.temp || 0,
          conditions: hour.conditions || "Desconocido",
          icon: hour.icon,
          windspeed: hour.windspeed || 0,
          precipprob: hour.precipprob || 0,
        }))
        hourlyForecast.push(...dayHours)
      }
    }

    // Formatear los datos para nuestra aplicación
    const weatherData: WeatherData = {
      location: data.resolvedAddress || location,
      currentConditions: {
        datetime: currentConditions.datetime,
        temp: Math.round(currentConditions.temp || 0),
        feelslike: Math.round(currentConditions.feelslike || currentConditions.temp || 0),
        humidity: Math.round(currentConditions.humidity || 0),
        windspeed: Math.round(currentConditions.windspeed || 0),
        conditions: currentConditions.conditions || "Desconocido",
        precipprob: Math.round(currentConditions.precipprob || 0),
        icon: currentConditions.icon,
      },
      hourlyForecast: hourlyForecast.slice(0, 48), // Limitar a 48 horas
    }

    console.log("Processed weather data:", {
      location: weatherData.location,
      currentTemp: weatherData.currentConditions.temp,
      hourlyCount: weatherData.hourlyForecast.length,
    })

    return weatherData
  } catch (error) {
    console.error("Error detallado al obtener datos meteorológicos:", error)

    if (error instanceof Error) {
      throw new Error(`No se pudieron obtener los datos meteorológicos: ${error.message}`)
    }

    throw new Error("Error desconocido al obtener los datos meteorológicos")
  }
}
