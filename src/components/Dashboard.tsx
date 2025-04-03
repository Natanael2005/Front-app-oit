"use client"

import type React from "react"
import { useEffect, useState } from "react"
import WeatherInfo from "./WeatherInfo"
import MapView from "./MapView"
import axios from "axios"

const Dashboard: React.FC = () => {
  const [clima, setClima] = useState<any>(null)
  const [parcelas, setParcelas] = useState<any[]>([])
  const [ultimaSync, setUltimaSync] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  const sincronizarManualmente = async () => {
    try {
      setCargando(true)
      await axios.post("http://localhost:4000/api/sincronizar")

      const parcelasRes = await axios.get("http://localhost:4000/api/parcelas/activas-ultimosensor")
      const climaRes = await axios.get("http://localhost:4000/api/sensores/ultimo")

      setParcelas(parcelasRes.data)
      const climaData = climaRes.data
      setClima({
        temp: climaData.temperatura,
        humidity: climaData.humedad,
        rain: climaData.lluvia,
        sun: climaData.sol,
      })
      setUltimaSync(new Date().toLocaleString())
    } catch (error) {
      console.error("❌ Error al sincronizar:", error)
      alert("Hubo un error al sincronizar.")
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    sincronizarManualmente()
  }, [])

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Panel de monitoreo</h2>
        <button onClick={sincronizarManualmente} disabled={cargando} className="btn">
          {cargando ? "Sincronizando..." : "Sincronizar"}
        </button>
      </div>

      {ultimaSync && <p className="dashboard-syncInfo">🕒 Última sincronización: {ultimaSync}</p>}

      <div className="dashboard-grid">
        <div className="card">
          <MapView parcelas={parcelas} />
        </div>
        <div className="card">
          <WeatherInfo clima={clima} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

