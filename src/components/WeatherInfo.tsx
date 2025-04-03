import type React from "react"
import { WiThermometer, WiHumidity, WiRain, WiDaySunny } from "react-icons/wi"

interface Props {
  clima: {
    temp: number
    humidity: number
    rain: number
    sun: number
  } | null
}

const WeatherInfo: React.FC<Props> = ({ clima }) => {
  if (!clima) return <p>Cargando clima...</p>

  return (
    <div className="weather-container">
      <div className="weather-card">
        <WiThermometer className="weather-icon" />
        <h3>Temperatura</h3>
        <p className="weather-value">{clima.temp}°C</p>
      </div>
      <div className="weather-card">
        <WiHumidity className="weather-icon" />
        <h3>Humedad</h3>
        <p className="weather-value">{clima.humidity}%</p>
      </div>
      <div className="weather-card">
        <WiRain className="weather-icon" />
        <h3>Lluvia</h3>
        <p className="weather-value">{clima.rain} mm</p>
      </div>
      <div className="weather-card">
        <WiDaySunny className="weather-icon" />
        <h3>Intensidad del sol</h3>
        <p className="weather-value">{clima.sun} lux</p>
      </div>
    </div>
  )
}

export default WeatherInfo

