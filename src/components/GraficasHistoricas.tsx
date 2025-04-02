import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from "chart.js"
import { Line, Bar, Radar } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
)

interface Historico {
  id: number
  fecha: string
  temperatura: number
  humedad: number
  lluvia: number
  sol: number
}

const GraficasHistoricas: React.FC = () => {
  const [historico, setHistorico] = useState<Historico[]>([])

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const resp = await axios.get("http://localhost:4000/api/sensores/historico")
        setHistorico(resp.data)
      } catch (error) {
        console.error("Error al obtener histórico de sensores:", error)
      }
    }

    fetchHistorico()
  }, [])

  const obtenerFechaActual = (): string => {
    const date = new Date()  // Obtiene la fecha y hora actual del dispositivo
    return date.toLocaleString("es-MX", { 
      hour12: false,  // Usa formato de 24 horas
      timeZoneName: "short"  
    }).replace(/(GMT.*)/, "");  // Elimina cualquier referencia a la zona horaria (como GMT-5)
  }
  

  // Obtener solo los últimos 7 registros y reemplazar las fechas con la fecha actual generada
  const ultimosDatos = historico.slice(-7)
  const labels = Array(ultimosDatos.length).fill(obtenerFechaActual()) // Usamos la fecha generada en el frontend

  // Calcular promedios y valores máximos/mínimos
  const calcularEstadisticas = () => {
    if (!ultimosDatos.length) return null

    const tempPromedio = ultimosDatos.reduce((sum, item) => sum + item.temperatura, 0) / ultimosDatos.length
    const humedadPromedio = ultimosDatos.reduce((sum, item) => sum + item.humedad, 0) / ultimosDatos.length
    const lluviaTotal = ultimosDatos.reduce((sum, item) => sum + item.lluvia, 0)
    const solPromedio = ultimosDatos.reduce((sum, item) => sum + item.sol, 0) / ultimosDatos.length

    const tempMax = Math.max(...ultimosDatos.map((item) => item.temperatura))
    const tempMin = Math.min(...ultimosDatos.map((item) => item.temperatura))
    const humedadMax = Math.max(...ultimosDatos.map((item) => item.humedad))

    return {
      tempPromedio: tempPromedio.toFixed(1),
      humedadPromedio: humedadPromedio.toFixed(1),
      lluviaTotal: lluviaTotal.toFixed(1),
      solPromedio: solPromedio.toFixed(1),
      tempMax: tempMax.toFixed(1),
      tempMin: tempMin.toFixed(1),
      humedadMax: humedadMax.toFixed(1),
    }
  }

  const estadisticas = calcularEstadisticas()

  const lineData = {
    labels,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: ultimosDatos.map((item) => item.temperatura),
        borderColor: "#1f2937",
        backgroundColor: "rgba(31, 41, 55, 0.1)",
        tension: 0.3,
        yAxisID: "y",
        fill: true,
      },
      {
        label: "Humedad (%)",
        data: ultimosDatos.map((item) => item.humedad),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
        yAxisID: "y1",
        fill: true,
      },
    ],
  }

  // Opciones del gráfico de línea
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Temperatura (°C)",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Humedad (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Fecha y Hora",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(1)
            }
            return label
          },
        },
      },
    },
  }

  const barData = {
    labels,
    datasets: [
      {
        label: "Lluvia (mm)",
        data: ultimosDatos.map((item) => item.lluvia),
        backgroundColor: "rgba(31, 41, 55, 0.7)",
        borderColor: "#1f2937",
        borderWidth: 1,
      },
    ],
  }

  // Opciones del gráfico de barras
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Precipitación (mm)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Fecha y Hora",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(1) + " mm"
            }
            return label
          },
        },
      },
    },
  }

  // Preparar datos para el gráfico de radar
  // Tomamos los últimos 5 registros para el radar
  const ultimosRegistrosRadar = ultimosDatos.slice(-5)

  // Normalizar los datos para que estén en una escala comparable
  const normalizarValor = (valor: number, min: number, max: number) => {
    return ((valor - min) / (max - min)) * 100
  }

  const radarData = {
    labels: ultimosRegistrosRadar.map((item) => obtenerFechaActual()),
    datasets: [
      {
        label: "Temperatura",
        data: ultimosRegistrosRadar.map((item) =>
          normalizarValor(
            item.temperatura,
            Math.min(...ultimosDatos.map((d) => d.temperatura)),
            Math.max(...ultimosDatos.map((d) => d.temperatura)),
          ),
        ),
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        borderColor: "#ef4444",
        borderWidth: 2,
        pointBackgroundColor: "#ef4444",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#ef4444",
      },
      {
        label: "Humedad",
        data: ultimosRegistrosRadar.map((item) =>
          normalizarValor(
            item.humedad,
            Math.min(...ultimosDatos.map((d) => d.humedad)),
            Math.max(...ultimosDatos.map((d) => d.humedad)),
          ),
        ),
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3b82f6",
        borderWidth: 2,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#3b82f6",
      },
      {
        label: "Intensidad Solar",
        data: ultimosRegistrosRadar.map((item) =>
          normalizarValor(
            item.sol,
            Math.min(...ultimosDatos.map((d) => d.sol)),
            Math.max(...ultimosDatos.map((d) => d.sol)),
          ),
        ),
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        borderColor: "#f59e0b",
        borderWidth: 2,
        pointBackgroundColor: "#f59e0b",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#f59e0b",
      },
    ],
  }

  // Opciones del gráfico de radar
  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: "transparent",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: any) => "Fecha: " + tooltipItems[0].label,
          label: (context: any) => {
            const datasetLabel = context.dataset.label || ""
            const value = context.raw.toFixed(1)
            return `${datasetLabel}: ${value}%`
          },
        },
      },
    },
  }

  return (
    <div className="graficas-container">
      <div className="graficas-header">
        <h2 className="graficas-title">Gráficas Históricas</h2>
        <div className="graficas-info">
          <span className="graficas-subtitle">Últimos 7 registros</span>
        </div>
      </div>

      {estadisticas && (
        <div className="graficas-resumen">
          <div className="resumen-item">
            <span className="resumen-label">Temperatura promedio:</span>
            <span className="resumen-valor">{estadisticas.tempPromedio}°C</span>
          </div>
          <div className="resumen-item">
            <span className="resumen-label">Humedad promedio:</span>
            <span className="resumen-valor">{estadisticas.humedadPromedio}%</span>
          </div>
          <div className="resumen-item">
            <span className="resumen-label">Lluvia acumulada:</span>
            <span className="resumen-valor">{estadisticas.lluviaTotal} mm</span>
          </div>
          <div className="resumen-item">
            <span className="resumen-label">Temperatura máx/mín:</span>
            <span className="resumen-valor">
              {estadisticas.tempMax}°C / {estadisticas.tempMin}°C
            </span>
          </div>
        </div>
      )}

      <div className="card">
        <h3 className="graficas-sectionTitle">Histórico - Temperatura y Humedad</h3>
        <p className="graficas-descripcion">Esta gráfica muestra la relación entre temperatura y humedad.</p>
        <div className="grafica-wrapper">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* Tarjeta combinada para las dos últimas gráficas */}
      <div className="card">
        <div className="graficas-grid">
          {/* Primera mitad - Precipitaciones */}
          <div className="graficas-grid-item">
            <h3 className="graficas-sectionTitle">Histórico - Precipitaciones</h3>
            <p className="graficas-descripcion">Muestra la cantidad de lluvia registrada en milímetros.</p>
            <div className="grafica-wrapper grafica-wrapper-half">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          {/* Segunda mitad - Análisis Multivariable (Radar) */}
          <div className="graficas-grid-item">
            <h3 className="graficas-sectionTitle">Histórico - Análisis Multivariable (Radar)</h3>
            <p className="graficas-descripcion">Muestra la relación entre temperatura, humedad e intensidad solar.</p>
            <div className="grafica-wrapper grafica-wrapper-half">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GraficasHistoricas
