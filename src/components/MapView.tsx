"use client"

import type React from "react"
import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { MapPin, Sprout, User, Thermometer, Droplets, CloudRain, Sun } from "lucide-react"

// Fix for the "marker-icon" not found error
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

interface Parcela {
  id: number
  nombre: string
  ubicacion: string
  tipo_cultivo: string
  responsable: string
  latitud: number
  longitud: number
  sensor?: {
    temperatura: number
    humedad: number
    lluvia: number
    sol: number
  }
}

interface MapViewProps {
  parcelas: Parcela[]
}

// Componente para centrar el mapa en las parcelas
const CenterMap = ({ parcelas }: { parcelas: Parcela[] }) => {
  const map = useMap()

  useEffect(() => {
    if (parcelas.length > 0) {
      // Crear un grupo de límites para todas las parcelas
      const bounds = L.latLngBounds(parcelas.map((p) => [p.latitud, p.longitud]))

      // Centrar el mapa en los límites de todas las parcelas
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [parcelas, map])

  return null
}

const MapView: React.FC<MapViewProps> = ({ parcelas }) => {
  // Posición inicial por defecto (se ajustará automáticamente)
  const defaultPosition: [number, number] = [4.60971, -74.08175] // Bogotá, Colombia

  return (
    <MapContainer center={defaultPosition} zoom={13} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {parcelas.map((parcela) => (
        <Marker key={parcela.id} position={[parcela.latitud, parcela.longitud]}>
          <Popup>
            <div className="popup-title">
              <strong>{parcela.nombre}</strong>
            </div>
            <div className="popup-content">
              <div className="popup-item">
                <MapPin size={16} className="popup-icon location-icon" />
                <span>Ubicación: {parcela.ubicacion}</span>
              </div>
              <div className="popup-item">
                <Sprout size={16} className="popup-icon crop-icon" />
                <span>Cultivo: {parcela.tipo_cultivo}</span>
              </div>
              <div className="popup-item">
                <User size={16} className="popup-icon user-icon" />
                <span>Responsable: {parcela.responsable}</span>
              </div>
              {parcela.sensor && (
                <>
                  <div className="popup-item">
                    <Thermometer size={16} className="popup-icon temp-icon" />
                    <span>Temperatura: {parcela.sensor.temperatura}°C</span>
                  </div>
                  <div className="popup-item">
                    <Droplets size={16} className="popup-icon humidity-icon" />
                    <span>Humedad: {parcela.sensor.humedad}%</span>
                  </div>
                  <div className="popup-item">
                    <CloudRain size={16} className="popup-icon rain-icon" />
                    <span>Lluvia: {parcela.sensor.lluvia} mm</span>
                  </div>
                  <div className="popup-item">
                    <Sun size={16} className="popup-icon sun-icon" />
                    <span>Intensidad del sol: {parcela.sensor.sol} lux</span>
                  </div>
                </>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
      <CenterMap parcelas={parcelas} />
    </MapContainer>
  )
}

export default MapView

