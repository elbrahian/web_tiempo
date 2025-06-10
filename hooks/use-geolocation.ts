"use client"

import { useState, useEffect } from "react"
import type { Coordinates } from "@/lib/types"

export function useGeolocation() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("La geolocalización no está soportada por su navegador")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setLoading(false)
      },
      (err) => {
        let errorMessage = "Error al obtener la ubicación"

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "Usuario denegó la solicitud de geolocalización"
            break
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Información de ubicación no disponible"
            break
          case err.TIMEOUT:
            errorMessage = "Se agotó el tiempo para obtener la ubicación"
            break
        }

        setError(errorMessage)
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    )
  }, [])

  return { coordinates, loading, error }
}
