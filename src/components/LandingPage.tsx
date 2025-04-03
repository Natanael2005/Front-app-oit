"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// Importa la imagen desde la carpeta assets
import agriculturaHero from "../assets/detail-rice-plant-sunset-valencia-with-plantation-out-focus-rice-grains-plant-seed.jpg"

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  // Verificar si el usuario está autenticado al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  // Función para manejar el clic en el botón de iniciar sesión
  const handleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAuthenticated) {
      e.preventDefault()
      navigate("/dashboard")
    }
    // Si no está autenticado, el comportamiento por defecto del Link lo llevará a /login
  }

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="landing-logo"> 
          <span>Dashboard IOT</span>
        </div>
        <nav className="landing-nav">
          <ul>
            <li>
              {/* <a href="#caracteristicas">Características</a> */}
            </li>
            <li>
              {/* <a href="#empresas">Para agricultores</a> */}
            </li>
            <li>
              {/* <a href="#recursos">Recursos</a> */}
            </li>
            <li>
              {/* <a href="#precios">Precios</a> */}
            </li>
          </ul>
        </nav>
        <div className="landing-actions">
          {/* <Link to="/contact" className="landing-contact-btn">
            HABLAR CON UN ASESOR
          </Link> */}
          <Link to="/login" className="landing-cta-btn" onClick={handleLoginClick}>
            {isAuthenticated ? "IR AL DASHBOARD" : "INICIAR SESIÓN"}
          </Link>
        </div>
      </header>

      <main className="landing-main">
        <div className="landing-hero">
          <div className="landing-hero-content">
            <h1>Este es tu momento. Vamos a transformar la agricultura juntos.</h1>
            <p>
              La tecnología está cambiando la forma en que cultivamos. ¿Qué te parece si creamos un futuro más
              eficiente, sostenible y conectado para tus cultivos?
            </p>
            <Link to={isAuthenticated ? "/dashboard" : "/register"} className="landing-hero-cta">
              {isAuthenticated ? "IR A MI DASHBOARD" : "DESCUBRE CÓMO HACERLO"}
            </Link>
            <div className="landing-secondary-text">
              {isAuthenticated ? (
                <>
                  Ya tienes una cuenta activa. <Link to="/dashboard">Ir a tu dashboard</Link>
                </>
              ) : (
                <>
                  ¿Necesitas gestionar tus parcelas de cultivo? <Link to="/register">Empieza ahora</Link>
                </>
              )}
            </div>
          </div>
          <div className="landing-hero-image">
            <div className="landing-image-container">
              {/* Usa la imagen importada */}
              <img
                src={agriculturaHero || "/placeholder.svg"}
                alt="Agricultor usando la aplicación en el campo"
                className="landing-main-image"
              />
              {/* Se ha eliminado el chat overlay */}
            </div>
          </div>
        </div>
      </main>

      <div className="landing-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
    </div>
  )
}

export default LandingPage

