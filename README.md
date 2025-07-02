# 🌤️ Aplicación Meteorológica

Una aplicación web moderna y elegante para consultar el pronóstico del tiempo con autocompletado inteligente de ciudades de todo el mundo. Basada en https://roadmap.sh/projects/weather-app

DEMO
https://v0-new-project-ra2qxflbmuj.vercel.app/

## ✨ Características

- 🔍 **Autocompletado inteligente** con más de 300 ciudades de todo el mundo
- 🌡️ **Clima actual detallado** con temperatura, sensación térmica, humedad, velocidad del viento y probabilidad de lluvia
- ⏰ **Pronóstico por horas** mostrando las últimas 24 horas y las próximas 24 horas
- 📱 **Diseño completamente responsive** optimizado para móviles, tablets y escritorio
- 🎨 **Animaciones fluidas** implementadas con Framer Motion
- 🌍 **Geolocalización automática** para mostrar el clima de tu ubicación actual
- 🔄 **Actualización en tiempo real** con botón de refresh
- 🎯 **Navegación por teclado** en las sugerencias de búsqueda
- 🌈 **Iconos meteorológicos** intuitivos para cada condición climática

## 🛠️ Tecnologías Utilizadas

- **[Next.js 15](https://nextjs.org/)** - Framework de React con App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático para JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utilitario
- **[Framer Motion](https://www.framer.com/motion/)** - Biblioteca de animaciones para React
- **[Lucide React](https://lucide.dev/)** - Iconos modernos y elegantes
- **[Visual Crossing Weather API](https://www.visualcrossing.com/)** - Datos meteorológicos precisos y actualizados


## 🔑 Obtener API Key de Visual Crossing
1. Ve a [Visual Crossing Weather](https://www.visualcrossing.com/)
2. Haz clic en "Sign Up" para crear una cuenta gratuita
3. Verifica tu email y accede a tu dashboard
4. Copia tu API key desde la sección "Account"
5. Pégala en tu archivo `.env.local`


## 🎯 Funcionalidades Detalladas

### Búsqueda Inteligente

- **Autocompletado en tiempo real** con debounce de 300ms
- **Base de datos local** con más de 300 ciudades populares
- **Búsqueda por nombre de ciudad, estado o país**
- **Navegación con teclado** (flechas arriba/abajo, Enter, Escape)
- **API de respaldo** para ciudades no incluidas localmente


### Información Meteorológica

- **Temperatura actual** y sensación térmica
- **Condiciones climáticas** con iconos descriptivos
- **Velocidad del viento** en km/h
- **Probabilidad de precipitación** en porcentaje
- **Humedad relativa** del aire
- **Fecha y hora** de la última actualización


### Pronóstico por Horas

- **Últimas 24 horas** de datos históricos
- **Próximas 24 horas** de pronóstico
- **Navegación por pestañas** entre pasado y futuro
- **Información compacta** por cada hora
- **Animaciones suaves** al cambiar entre pestañas
