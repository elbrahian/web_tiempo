export interface CurrentConditions {
  datetime: string
  temp: number
  feelslike: number
  humidity: number
  windspeed: number
  conditions: string
  precipprob: number
  icon?: string
}

export interface HourlyForecast {
  datetime: string
  temp: number
  conditions: string
  icon?: string
  windspeed: number
  precipprob: number
}

export interface WeatherData {
  location: string
  currentConditions: CurrentConditions
  hourlyForecast: HourlyForecast[]
}

export interface Coordinates {
  latitude: number
  longitude: number
}
