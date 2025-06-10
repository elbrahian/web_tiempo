"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, MapPin, X } from "lucide-react"

interface SearchFormProps {
  onSearch: (location: string) => void
}

interface CitySuggestion {
  name: string
  country: string
  state?: string
  display: string
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [location, setLocation] = useState("")
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Lista expandida de ciudades populares
  const popularCities = [
    // España
    { name: "Madrid", country: "España", display: "Madrid, España" },
    { name: "Barcelona", country: "España", display: "Barcelona, España" },
    { name: "Valencia", country: "España", display: "Valencia, España" },
    { name: "Sevilla", country: "España", display: "Sevilla, España" },
    { name: "Zaragoza", country: "España", display: "Zaragoza, España" },
    { name: "Málaga", country: "España", display: "Málaga, España" },
    { name: "Murcia", country: "España", display: "Murcia, España" },
    { name: "Palma", country: "España", display: "Palma, España" },
    { name: "Las Palmas", country: "España", display: "Las Palmas, España" },
    { name: "Bilbao", country: "España", display: "Bilbao, España" },
    { name: "Alicante", country: "España", display: "Alicante, España" },
    { name: "Córdoba", country: "España", display: "Córdoba, España" },
    { name: "Valladolid", country: "España", display: "Valladolid, España" },
    { name: "Vigo", country: "España", display: "Vigo, España" },
    { name: "Gijón", country: "España", display: "Gijón, España" },
    { name: "Granada", country: "España", display: "Granada, España" },
    { name: "Vitoria", country: "España", display: "Vitoria, España" },
    { name: "A Coruña", country: "España", display: "A Coruña, España" },
    { name: "Elche", country: "España", display: "Elche, España" },
    { name: "Oviedo", country: "España", display: "Oviedo, España" },
    { name: "Santa Cruz", country: "España", display: "Santa Cruz de Tenerife, España" },
    { name: "Badalona", country: "España", display: "Badalona, España" },
    { name: "Cartagena", country: "España", display: "Cartagena, España" },
    { name: "Terrassa", country: "España", display: "Terrassa, España" },
    { name: "Jerez", country: "España", display: "Jerez de la Frontera, España" },
    { name: "Sabadell", country: "España", display: "Sabadell, España" },
    { name: "Móstoles", country: "España", display: "Móstoles, España" },
    { name: "Alcalá de Henares", country: "España", display: "Alcalá de Henares, España" },
    { name: "Pamplona", country: "España", display: "Pamplona, España" },
    { name: "Fuenlabrada", country: "España", display: "Fuenlabrada, España" },

    // México
    { name: "Ciudad de México", country: "México", display: "Ciudad de México, México" },
    { name: "Guadalajara", country: "México", state: "Jalisco", display: "Guadalajara, Jalisco, México" },
    { name: "Monterrey", country: "México", state: "Nuevo León", display: "Monterrey, Nuevo León, México" },
    { name: "Puebla", country: "México", state: "Puebla", display: "Puebla, Puebla, México" },
    { name: "Tijuana", country: "México", state: "Baja California", display: "Tijuana, Baja California, México" },
    { name: "León", country: "México", state: "Guanajuato", display: "León, Guanajuato, México" },
    { name: "Juárez", country: "México", state: "Chihuahua", display: "Ciudad Juárez, Chihuahua, México" },
    { name: "Torreón", country: "México", state: "Coahuila", display: "Torreón, Coahuila, México" },
    { name: "Querétaro", country: "México", state: "Querétaro", display: "Querétaro, Querétaro, México" },
    {
      name: "San Luis Potosí",
      country: "México",
      state: "San Luis Potosí",
      display: "San Luis Potosí, San Luis Potosí, México",
    },
    { name: "Mérida", country: "México", state: "Yucatán", display: "Mérida, Yucatán, México" },
    { name: "Mexicali", country: "México", state: "Baja California", display: "Mexicali, Baja California, México" },
    {
      name: "Aguascalientes",
      country: "México",
      state: "Aguascalientes",
      display: "Aguascalientes, Aguascalientes, México",
    },
    { name: "Hermosillo", country: "México", state: "Sonora", display: "Hermosillo, Sonora, México" },
    { name: "Saltillo", country: "México", state: "Coahuila", display: "Saltillo, Coahuila, México" },
    { name: "Cancún", country: "México", state: "Quintana Roo", display: "Cancún, Quintana Roo, México" },
    { name: "Culiacán", country: "México", state: "Sinaloa", display: "Culiacán, Sinaloa, México" },
    { name: "Acapulco", country: "México", state: "Guerrero", display: "Acapulco, Guerrero, México" },
    { name: "Toluca", country: "México", state: "Estado de México", display: "Toluca, Estado de México, México" },
    { name: "Chihuahua", country: "México", state: "Chihuahua", display: "Chihuahua, Chihuahua, México" },

    // Argentina
    { name: "Buenos Aires", country: "Argentina", display: "Buenos Aires, Argentina" },
    { name: "Córdoba", country: "Argentina", display: "Córdoba, Argentina" },
    { name: "Rosario", country: "Argentina", display: "Rosario, Argentina" },
    { name: "Mendoza", country: "Argentina", display: "Mendoza, Argentina" },
    { name: "Tucumán", country: "Argentina", display: "San Miguel de Tucumán, Argentina" },
    { name: "La Plata", country: "Argentina", display: "La Plata, Argentina" },
    { name: "Mar del Plata", country: "Argentina", display: "Mar del Plata, Argentina" },
    { name: "Salta", country: "Argentina", display: "Salta, Argentina" },
    { name: "Santa Fe", country: "Argentina", display: "Santa Fe, Argentina" },
    { name: "San Juan", country: "Argentina", display: "San Juan, Argentina" },

    // Colombia
    { name: "Bogotá", country: "Colombia", display: "Bogotá, Colombia" },
    { name: "Medellín", country: "Colombia", display: "Medellín, Colombia" },
    { name: "Cali", country: "Colombia", display: "Cali, Colombia" },
    { name: "Barranquilla", country: "Colombia", display: "Barranquilla, Colombia" },
    { name: "Cartagena", country: "Colombia", display: "Cartagena, Colombia" },
    { name: "Cúcuta", country: "Colombia", display: "Cúcuta, Colombia" },
    { name: "Bucaramanga", country: "Colombia", display: "Bucaramanga, Colombia" },
    { name: "Pereira", country: "Colombia", display: "Pereira, Colombia" },
    { name: "Santa Marta", country: "Colombia", display: "Santa Marta, Colombia" },
    { name: "Manizales", country: "Colombia", display: "Manizales, Colombia" },

    // Perú
    { name: "Lima", country: "Perú", display: "Lima, Perú" },
    { name: "Arequipa", country: "Perú", display: "Arequipa, Perú" },
    { name: "Trujillo", country: "Perú", display: "Trujillo, Perú" },
    { name: "Chiclayo", country: "Perú", display: "Chiclayo, Perú" },
    { name: "Piura", country: "Perú", display: "Piura, Perú" },
    { name: "Iquitos", country: "Perú", display: "Iquitos, Perú" },
    { name: "Cusco", country: "Perú", display: "Cusco, Perú" },
    { name: "Huancayo", country: "Perú", display: "Huancayo, Perú" },

    // Chile
    { name: "Santiago", country: "Chile", display: "Santiago, Chile" },
    { name: "Valparaíso", country: "Chile", display: "Valparaíso, Chile" },
    { name: "Concepción", country: "Chile", display: "Concepción, Chile" },
    { name: "La Serena", country: "Chile", display: "La Serena, Chile" },
    { name: "Antofagasta", country: "Chile", display: "Antofagasta, Chile" },
    { name: "Temuco", country: "Chile", display: "Temuco, Chile" },
    { name: "Rancagua", country: "Chile", display: "Rancagua, Chile" },
    { name: "Talca", country: "Chile", display: "Talca, Chile" },

    // Venezuela
    { name: "Caracas", country: "Venezuela", display: "Caracas, Venezuela" },
    { name: "Maracaibo", country: "Venezuela", display: "Maracaibo, Venezuela" },
    { name: "Valencia", country: "Venezuela", display: "Valencia, Venezuela" },
    { name: "Barquisimeto", country: "Venezuela", display: "Barquisimeto, Venezuela" },
    { name: "Maracay", country: "Venezuela", display: "Maracay, Venezuela" },
    { name: "Ciudad Guayana", country: "Venezuela", display: "Ciudad Guayana, Venezuela" },

    // Ecuador
    { name: "Quito", country: "Ecuador", display: "Quito, Ecuador" },
    { name: "Guayaquil", country: "Ecuador", display: "Guayaquil, Ecuador" },
    { name: "Cuenca", country: "Ecuador", display: "Cuenca, Ecuador" },
    { name: "Santo Domingo", country: "Ecuador", display: "Santo Domingo, Ecuador" },
    { name: "Machala", country: "Ecuador", display: "Machala, Ecuador" },

    // Bolivia
    { name: "La Paz", country: "Bolivia", display: "La Paz, Bolivia" },
    { name: "Santa Cruz", country: "Bolivia", display: "Santa Cruz de la Sierra, Bolivia" },
    { name: "Cochabamba", country: "Bolivia", display: "Cochabamba, Bolivia" },
    { name: "Sucre", country: "Bolivia", display: "Sucre, Bolivia" },

    // Paraguay
    { name: "Asunción", country: "Paraguay", display: "Asunción, Paraguay" },
    { name: "Ciudad del Este", country: "Paraguay", display: "Ciudad del Este, Paraguay" },
    { name: "San Lorenzo", country: "Paraguay", display: "San Lorenzo, Paraguay" },

    // Uruguay
    { name: "Montevideo", country: "Uruguay", display: "Montevideo, Uruguay" },
    { name: "Salto", country: "Uruguay", display: "Salto, Uruguay" },
    { name: "Paysandú", country: "Uruguay", display: "Paysandú, Uruguay" },

    // Brasil
    { name: "São Paulo", country: "Brasil", display: "São Paulo, Brasil" },
    { name: "Rio de Janeiro", country: "Brasil", display: "Rio de Janeiro, Brasil" },
    { name: "Brasília", country: "Brasil", display: "Brasília, Brasil" },
    { name: "Salvador", country: "Brasil", display: "Salvador, Brasil" },
    { name: "Fortaleza", country: "Brasil", display: "Fortaleza, Brasil" },
    { name: "Belo Horizonte", country: "Brasil", display: "Belo Horizonte, Brasil" },
    { name: "Manaus", country: "Brasil", display: "Manaus, Brasil" },
    { name: "Curitiba", country: "Brasil", display: "Curitiba, Brasil" },
    { name: "Recife", country: "Brasil", display: "Recife, Brasil" },
    { name: "Porto Alegre", country: "Brasil", display: "Porto Alegre, Brasil" },

    // Estados Unidos
    { name: "Nueva York", country: "Estados Unidos", display: "Nueva York, Estados Unidos" },
    { name: "Los Ángeles", country: "Estados Unidos", display: "Los Ángeles, Estados Unidos" },
    { name: "Chicago", country: "Estados Unidos", display: "Chicago, Estados Unidos" },
    { name: "Houston", country: "Estados Unidos", display: "Houston, Estados Unidos" },
    { name: "Phoenix", country: "Estados Unidos", display: "Phoenix, Estados Unidos" },
    { name: "Philadelphia", country: "Estados Unidos", display: "Philadelphia, Estados Unidos" },
    { name: "San Antonio", country: "Estados Unidos", display: "San Antonio, Estados Unidos" },
    { name: "San Diego", country: "Estados Unidos", display: "San Diego, Estados Unidos" },
    { name: "Dallas", country: "Estados Unidos", display: "Dallas, Estados Unidos" },
    { name: "San José", country: "Estados Unidos", display: "San José, Estados Unidos" },
    { name: "Austin", country: "Estados Unidos", display: "Austin, Estados Unidos" },
    { name: "Jacksonville", country: "Estados Unidos", display: "Jacksonville, Estados Unidos" },
    { name: "San Francisco", country: "Estados Unidos", display: "San Francisco, Estados Unidos" },
    { name: "Columbus", country: "Estados Unidos", display: "Columbus, Estados Unidos" },
    { name: "Fort Worth", country: "Estados Unidos", display: "Fort Worth, Estados Unidos" },
    { name: "Indianapolis", country: "Estados Unidos", display: "Indianapolis, Estados Unidos" },
    { name: "Charlotte", country: "Estados Unidos", display: "Charlotte, Estados Unidos" },
    { name: "Seattle", country: "Estados Unidos", display: "Seattle, Estados Unidos" },
    { name: "Denver", country: "Estados Unidos", display: "Denver, Estados Unidos" },
    { name: "Washington", country: "Estados Unidos", display: "Washington D.C., Estados Unidos" },
    { name: "Boston", country: "Estados Unidos", display: "Boston, Estados Unidos" },
    { name: "El Paso", country: "Estados Unidos", display: "El Paso, Estados Unidos" },
    { name: "Detroit", country: "Estados Unidos", display: "Detroit, Estados Unidos" },
    { name: "Nashville", country: "Estados Unidos", display: "Nashville, Estados Unidos" },
    { name: "Portland", country: "Estados Unidos", display: "Portland, Estados Unidos" },
    { name: "Memphis", country: "Estados Unidos", display: "Memphis, Estados Unidos" },
    { name: "Oklahoma City", country: "Estados Unidos", display: "Oklahoma City, Estados Unidos" },
    { name: "Las Vegas", country: "Estados Unidos", display: "Las Vegas, Estados Unidos" },
    { name: "Louisville", country: "Estados Unidos", display: "Louisville, Estados Unidos" },
    { name: "Baltimore", country: "Estados Unidos", display: "Baltimore, Estados Unidos" },
    { name: "Milwaukee", country: "Estados Unidos", display: "Milwaukee, Estados Unidos" },
    { name: "Albuquerque", country: "Estados Unidos", display: "Albuquerque, Estados Unidos" },
    { name: "Tucson", country: "Estados Unidos", display: "Tucson, Estados Unidos" },
    { name: "Fresno", country: "Estados Unidos", display: "Fresno, Estados Unidos" },
    { name: "Sacramento", country: "Estados Unidos", display: "Sacramento, Estados Unidos" },
    { name: "Mesa", country: "Estados Unidos", display: "Mesa, Estados Unidos" },
    { name: "Kansas City", country: "Estados Unidos", display: "Kansas City, Estados Unidos" },
    { name: "Atlanta", country: "Estados Unidos", display: "Atlanta, Estados Unidos" },
    { name: "Long Beach", country: "Estados Unidos", display: "Long Beach, Estados Unidos" },
    { name: "Colorado Springs", country: "Estados Unidos", display: "Colorado Springs, Estados Unidos" },
    { name: "Raleigh", country: "Estados Unidos", display: "Raleigh, Estados Unidos" },
    { name: "Miami", country: "Estados Unidos", display: "Miami, Estados Unidos" },
    { name: "Virginia Beach", country: "Estados Unidos", display: "Virginia Beach, Estados Unidos" },
    { name: "Omaha", country: "Estados Unidos", display: "Omaha, Estados Unidos" },
    { name: "Oakland", country: "Estados Unidos", display: "Oakland, Estados Unidos" },
    { name: "Minneapolis", country: "Estados Unidos", display: "Minneapolis, Estados Unidos" },
    { name: "Tulsa", country: "Estados Unidos", display: "Tulsa, Estados Unidos" },
    { name: "Arlington", country: "Estados Unidos", display: "Arlington, Estados Unidos" },
    { name: "Tampa", country: "Estados Unidos", display: "Tampa, Estados Unidos" },

    // Canadá
    { name: "Toronto", country: "Canadá", display: "Toronto, Canadá" },
    { name: "Montreal", country: "Canadá", display: "Montreal, Canadá" },
    { name: "Vancouver", country: "Canadá", display: "Vancouver, Canadá" },
    { name: "Calgary", country: "Canadá", display: "Calgary, Canadá" },
    { name: "Edmonton", country: "Canadá", display: "Edmonton, Canadá" },
    { name: "Ottawa", country: "Canadá", display: "Ottawa, Canadá" },
    { name: "Winnipeg", country: "Canadá", display: "Winnipeg, Canadá" },
    { name: "Quebec", country: "Canadá", display: "Quebec, Canadá" },

    // Europa
    { name: "Londres", country: "Reino Unido", display: "Londres, Reino Unido" },
    { name: "París", country: "Francia", display: "París, Francia" },
    { name: "Roma", country: "Italia", display: "Roma, Italia" },
    { name: "Berlín", country: "Alemania", display: "Berlín, Alemania" },
    { name: "Amsterdam", country: "Países Bajos", display: "Amsterdam, Países Bajos" },
    { name: "Viena", country: "Austria", display: "Viena, Austria" },
    { name: "Zurich", country: "Suiza", display: "Zurich, Suiza" },
    { name: "Estocolmo", country: "Suecia", display: "Estocolmo, Suecia" },
    { name: "Copenhague", country: "Dinamarca", display: "Copenhague, Dinamarca" },
    { name: "Oslo", country: "Noruega", display: "Oslo, Noruega" },
    { name: "Helsinki", country: "Finlandia", display: "Helsinki, Finlandia" },
    { name: "Dublín", country: "Irlanda", display: "Dublín, Irlanda" },
    { name: "Lisboa", country: "Portugal", display: "Lisboa, Portugal" },
    { name: "Atenas", country: "Grecia", display: "Atenas, Grecia" },
    { name: "Praga", country: "República Checa", display: "Praga, República Checa" },
    { name: "Budapest", country: "Hungría", display: "Budapest, Hungría" },
    { name: "Varsovia", country: "Polonia", display: "Varsovia, Polonia" },
    { name: "Bucarest", country: "Rumania", display: "Bucarest, Rumania" },
    { name: "Sofía", country: "Bulgaria", display: "Sofía, Bulgaria" },
    { name: "Zagreb", country: "Croacia", display: "Zagreb, Croacia" },
    { name: "Belgrado", country: "Serbia", display: "Belgrado, Serbia" },
    { name: "Kiev", country: "Ucrania", display: "Kiev, Ucrania" },
    { name: "Moscú", country: "Rusia", display: "Moscú, Rusia" },
    { name: "San Petersburgo", country: "Rusia", display: "San Petersburgo, Rusia" },

    // Asia
    { name: "Tokio", country: "Japón", display: "Tokio, Japón" },
    { name: "Seúl", country: "Corea del Sur", display: "Seúl, Corea del Sur" },
    { name: "Beijing", country: "China", display: "Beijing, China" },
    { name: "Shanghai", country: "China", display: "Shanghai, China" },
    { name: "Hong Kong", country: "Hong Kong", display: "Hong Kong" },
    { name: "Singapur", country: "Singapur", display: "Singapur" },
    { name: "Bangkok", country: "Tailandia", display: "Bangkok, Tailandia" },
    { name: "Manila", country: "Filipinas", display: "Manila, Filipinas" },
    { name: "Jakarta", country: "Indonesia", display: "Jakarta, Indonesia" },
    { name: "Kuala Lumpur", country: "Malasia", display: "Kuala Lumpur, Malasia" },
    { name: "Mumbai", country: "India", display: "Mumbai, India" },
    { name: "Delhi", country: "India", display: "Delhi, India" },
    { name: "Bangalore", country: "India", display: "Bangalore, India" },
    { name: "Chennai", country: "India", display: "Chennai, India" },
    { name: "Kolkata", country: "India", display: "Kolkata, India" },
    { name: "Hyderabad", country: "India", display: "Hyderabad, India" },
    { name: "Pune", country: "India", display: "Pune, India" },
    { name: "Ahmedabad", country: "India", display: "Ahmedabad, India" },

    // África
    { name: "El Cairo", country: "Egipto", display: "El Cairo, Egipto" },
    { name: "Lagos", country: "Nigeria", display: "Lagos, Nigeria" },
    { name: "Ciudad del Cabo", country: "Sudáfrica", display: "Ciudad del Cabo, Sudáfrica" },
    { name: "Johannesburgo", country: "Sudáfrica", display: "Johannesburgo, Sudáfrica" },
    { name: "Casablanca", country: "Marruecos", display: "Casablanca, Marruecos" },
    { name: "Túnez", country: "Túnez", display: "Túnez, Túnez" },
    { name: "Argel", country: "Argelia", display: "Argel, Argelia" },

    // Oceanía
    { name: "Sídney", country: "Australia", display: "Sídney, Australia" },
    { name: "Melbourne", country: "Australia", display: "Melbourne, Australia" },
    { name: "Brisbane", country: "Australia", display: "Brisbane, Australia" },
    { name: "Perth", country: "Australia", display: "Perth, Australia" },
    { name: "Adelaide", country: "Australia", display: "Adelaide, Australia" },
    { name: "Auckland", country: "Nueva Zelanda", display: "Auckland, Nueva Zelanda" },
    { name: "Wellington", country: "Nueva Zelanda", display: "Wellington, Nueva Zelanda" },
  ]

  // Función para filtrar ciudades localmente
  const getLocalSuggestions = (query: string): CitySuggestion[] => {
    if (query.length < 2) return []

    const queryLower = query.toLowerCase()
    return popularCities
      .filter(
        (city) =>
          city.name.toLowerCase().includes(queryLower) ||
          city.country.toLowerCase().includes(queryLower) ||
          city.display.toLowerCase().includes(queryLower),
      )
      .slice(0, 8) // Aumentamos a 8 sugerencias
  }

  // Función para obtener sugerencias de la API
  const fetchAPISuggestions = async (query: string): Promise<CitySuggestion[]> => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=8&appid=demo`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        return data.map((item: any) => ({
          name: item.name,
          country: item.country,
          state: item.state,
          display: `${item.name}${item.state ? `, ${item.state}` : ""}, ${item.country}`,
        }))
      }
    } catch (error) {
      console.log("API no disponible, usando sugerencias locales")
    }

    return []
  }

  // Función principal para obtener sugerencias
  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    setLoading(true)

    try {
      // Primero intentar con sugerencias locales
      const localSuggestions = getLocalSuggestions(query)

      if (localSuggestions.length > 0) {
        setSuggestions(localSuggestions)
        setLoading(false)
        return
      }

      // Si no hay sugerencias locales, intentar con la API
      const apiSuggestions = await fetchAPISuggestions(query)

      if (apiSuggestions.length > 0) {
        setSuggestions(apiSuggestions)
      } else {
        // Si tampoco hay sugerencias de la API, mostrar mensaje
        setSuggestions([])
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      setSuggestions(getLocalSuggestions(query))
    } finally {
      setLoading(false)
    }
  }

  // Debounce para las sugerencias
  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.trim()) {
        fetchSuggestions(location.trim())
      } else {
        setSuggestions([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [location])

  // Manejar clicks fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      onSearch(location.trim())
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }

  const handleSuggestionClick = (suggestion: CitySuggestion) => {
    setLocation(suggestion.display)
    onSearch(suggestion.display)
    setShowSuggestions(false)
    setSelectedIndex(-1)
    inputRef.current?.blur()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocation(value)
    setShowSuggestions(true)
    setSelectedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else {
          handleSubmit(e)
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const clearInput = () => {
    setLocation("")
    setSuggestions([])
    setShowSuggestions(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full max-w-md mx-auto" style={{ zIndex: 1000 }}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ingrese una ciudad o ubicación..."
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true)
              }
            }}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent relative z-10"
            autoComplete="off"
          />

          {/* Botón para limpiar */}
          {location && !loading && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-20"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Indicador de carga */}
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-sky-500 border-t-transparent"></div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors relative z-10"
        >
          <Search className="h-4 w-4 mr-2 inline" />
          Buscar
        </button>
      </form>

      {/* Lista de sugerencias con z-index muy alto */}
      {showSuggestions && suggestions.length > 0 && (
        <>
          {/* Overlay para capturar clicks */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => {
              setShowSuggestions(false)
              setSelectedIndex(-1)
            }}
          />

          {/* Lista de sugerencias */}
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-80 overflow-y-auto"
            style={{ zIndex: 9999 }}
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.name}-${suggestion.country}-${index}`}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0 transition-colors ${
                  index === selectedIndex ? "bg-sky-50 border-sky-200" : ""
                }`}
              >
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{suggestion.name}</div>
                    <div className="text-sm text-gray-500 truncate">
                      {suggestion.state && `${suggestion.state}, `}
                      {suggestion.country}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Mensaje cuando no hay sugerencias */}
      {showSuggestions && location.length >= 2 && suggestions.length === 0 && !loading && (
        <>
          {/* Overlay para capturar clicks */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => {
              setShowSuggestions(false)
              setSelectedIndex(-1)
            }}
          />

          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-xl"
            style={{ zIndex: 9999 }}
          >
            <div className="px-4 py-3 text-gray-500 text-center">
              No se encontraron ciudades. Intenta con el nombre completo.
            </div>
          </div>
        </>
      )}
    </div>
  )
}
