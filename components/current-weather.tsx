"use client"

import { motion } from "framer-motion"
import { RefreshCw, Wind, Droplets, Thermometer } from "lucide-react"
import type { WeatherData } from "../lib/types"
import { formatDate, getWeatherIcon } from "../lib/utils"

interface CurrentWeatherProps {
  data: WeatherData
  onRefresh: () => void
}

export function CurrentWeather({ data, onRefresh }: CurrentWeatherProps) {
  const current = data.currentConditions

  return (
    <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
      <div className="flex flex-row items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Clima actual en {data.location}</h2>
        <button onClick={onRefresh} className="p-2 text-gray-600 hover:text-sky-600 rounded-full hover:bg-gray-100">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mr-4 text-6xl"
            >
              {getWeatherIcon(current.conditions)}
            </motion.div>
            <div>
              <h3 className="text-4xl font-bold">{current.temp}°C</h3>
              <p className="text-lg text-slate-600 capitalize">{current.conditions}</p>
              <p className="text-sm text-slate-500">{current.datetime ? formatDate(current.datetime) : "Ahora"}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center">
              <Thermometer className="h-5 w-5 mr-2 text-orange-500" />
              <span>Sensación térmica: {current.feelslike}°C</span>
            </div>
            <div className="flex items-center">
              <Wind className="h-5 w-5 mr-2 text-blue-500" />
              <span>Viento: {current.windspeed} km/h</span>
            </div>
            <div className="flex items-center">
              <Droplets className="h-5 w-5 mr-2 text-blue-400" />
              <span>Probabilidad de lluvia: {current.precipprob}%</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-5 h-5 mr-2 text-center">💧</span>
              <span>Humedad: {current.humidity}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
