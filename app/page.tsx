"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SearchForm } from "../components/search-form"
import { CurrentWeather } from "../components/current-weather"
import { Forecast } from "../components/forecast"
import { Loading } from "../components/loading"
import { getWeatherData } from "../lib/actions"
import { useGeolocation } from "../hooks/use-geolocation"
import type { WeatherData } from "../lib/types"

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { coordinates, locationError, loading: geoLoading } = useGeolocation()

  const handleSearch = async (location: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getWeatherData(location)
      setWeatherData(data)
    } catch (err) {
      setError("Error al obtener datos meteorológicos. Por favor, intente nuevamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    if (weatherData?.location) {
      handleSearch(weatherData.location)
    }
  }

  // Cargar datos meteorológicos de la ubicación actual al inicio
  useEffect(() => {
    if (coordinates && !weatherData) {
      handleSearch(`${coordinates.latitude},${coordinates.longitude}`)
    }
  }, [coordinates, weatherData])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-50">
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-sky-800">Pronóstico Meteorológico</h1>
          <SearchForm onSearch={handleSearch} />
        </motion.div>

        {loading || geoLoading ? (
          <Loading />
        ) : error || locationError ? (
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <p className="text-red-500">{error || locationError}</p>
          </div>
        ) : weatherData ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <CurrentWeather data={weatherData} onRefresh={handleRefresh} />
            <Forecast data={weatherData} />
          </motion.div>
        ) : (
          <div className="text-center p-6">
            <p className="text-slate-600">Ingrese una ubicación para ver el pronóstico meteorológico</p>
          </div>
        )}
      </main>
    </div>
  )
}
