"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { WeatherData, HourlyForecast } from "../lib/types"
import { formatTime, getWeatherIcon } from "../lib/utils"

interface ForecastProps {
  data: WeatherData
}

export function Forecast({ data }: ForecastProps) {
  const [activeTab, setActiveTab] = useState("future")

  // Organizar datos por pasado y futuro
  const currentTime = new Date()
  const pastHours = data.hourlyForecast.filter((hour) => {
    try {
      return new Date(hour.datetime) < currentTime
    } catch {
      return false
    }
  })
  const futureHours = data.hourlyForecast.filter((hour) => {
    try {
      return new Date(hour.datetime) >= currentTime
    } catch {
      return true // Si hay error en la fecha, asumir que es futuro
    }
  })

  // Limitar a 24 horas en cada dirección
  const past24Hours = pastHours.slice(-24)
  const future24Hours = futureHours.slice(0, 24)

  const renderHourlyForecast = (hours: HourlyForecast[]) => {
    if (hours.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-slate-500">No hay datos disponibles</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {hours.map((hour, index) => (
          <motion.div
            key={`${hour.datetime}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white p-3 rounded-lg shadow-sm text-center"
          >
            <p className="text-sm font-medium mb-1">{formatTime(hour.datetime)}</p>
            <div className="text-3xl my-2">{getWeatherIcon(hour.conditions)}</div>
            <p className="text-lg font-bold">{Math.round(hour.temp)}°C</p>
            <div className="text-xs text-slate-500 mt-1">
              <div>Viento: {Math.round(hour.windspeed)} km/h</div>
              <div>Lluvia: {Math.round(hour.precipprob)}%</div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Pronóstico por hora</h2>
      </div>
      <div className="p-6">
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "past" ? "border-b-2 border-sky-500 text-sky-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("past")}
          >
            Últimas horas
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "future" ? "border-b-2 border-sky-500 text-sky-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("future")}
          >
            Próximas horas
          </button>
        </div>
        <div className="mt-4">
          {activeTab === "past" ? renderHourlyForecast(past24Hours) : renderHourlyForecast(future24Hours)}
        </div>
      </div>
    </div>
  )
}
