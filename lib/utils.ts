import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return "Fecha no válida"
    }
    return new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  } catch {
    return "Fecha no disponible"
  }
}

export function formatTime(dateTimeString: string): string {
  try {
    const date = new Date(dateTimeString)
    if (isNaN(date.getTime())) {
      return "Hora no válida"
    }
    return new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  } catch {
    return "Hora no disponible"
  }
}

export function getWeatherIcon(condition: string) {
  if (!condition) return "❓"

  const conditionLower = condition.toLowerCase()

  if (conditionLower.includes("lluvia") || conditionLower.includes("rain")) {
    return "🌧️"
  } else if (conditionLower.includes("nieve") || conditionLower.includes("snow")) {
    return "❄️"
  } else if (conditionLower.includes("niebla") || conditionLower.includes("fog")) {
    return "🌫️"
  } else if (conditionLower.includes("tormenta") || conditionLower.includes("thunder")) {
    return "⛈️"
  } else if (conditionLower.includes("llovizna") || conditionLower.includes("drizzle")) {
    return "🌦️"
  } else if (
    conditionLower.includes("nublado") ||
    conditionLower.includes("cloud") ||
    conditionLower.includes("overcast")
  ) {
    return "☁️"
  } else if (conditionLower.includes("parcialmente") || conditionLower.includes("partly")) {
    return "⛅"
  } else if (
    conditionLower.includes("despejado") ||
    conditionLower.includes("clear") ||
    conditionLower.includes("sunny")
  ) {
    return "☀️"
  } else {
    return "🌤️"
  }
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
