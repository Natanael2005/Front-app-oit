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
  ultimo_riego: string
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

      // Centrar el mapa en los límites de todas las parcelas con padding moderado
      map.fitBounds(bounds, { padding: [40, 40] })
    }
  }, [parcelas, map])

  return null
}

const MapView: React.FC<MapViewProps> = ({ parcelas }) => {
  // Posición inicial por defecto (se ajustará automáticamente)
  const defaultPosition: [number, number] = [4.60971, -74.08175] // Bogotá, Colombia

  return (
    <div className="map-wrapper">
      <MapContainer center={defaultPosition} zoom={13} className="map-container">
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
                  <span>
                    <strong>Ubicación:</strong> {parcela.ubicacion}
                  </span>
                </div>
                <div className="popup-item">
                  <Sprout size={16} className="popup-icon crop-icon" />
                  <span>
                    <strong>Cultivo:</strong> {parcela.tipo_cultivo}
                  </span>
                </div>
                <div className="popup-item">
                  <User size={16} className="popup-icon user-icon" />
                  <span>
                    <strong>Responsable:</strong> {parcela.responsable}
                  </span>
                </div>
                {parcela.sensor && (
                  <>
                    <div className="popup-item">
                      <Thermometer size={16} className="popup-icon temp-icon" />
                      <span>
                        <strong>Temperatura:</strong> {parcela.sensor.temperatura}°C
                      </span>
                    </div>
                    <div className="popup-item">
                      <Droplets size={16} className="popup-icon humidity-icon" />
                      <span>
                        <strong>Humedad:</strong> {parcela.sensor.humedad}%
                      </span>
                    </div>
                    <div className="popup-item">
                      <CloudRain size={16} className="popup-icon rain-icon" />
                      <span>
                        <strong>Lluvia:</strong> {parcela.sensor.lluvia} mm
                      </span>
                    </div>
                    <div className="popup-item">
                      <Sun size={16} className="popup-icon sun-icon" />
                      <span>
                        <strong>Intensidad del sol:</strong> {parcela.sensor.sol} lux
                      </span>
                    </div>
                    <div className="popup-item">
                      <Droplets size={16} className="popup-icon droplet-icon" />
                      <span>
                        <strong>Ultimo Riego:</strong> {parcela.ultimo_riego}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        <CenterMap parcelas={parcelas} />
      </MapContainer>
    </div>
  )
}

export default MapView

