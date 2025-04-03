"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      setLoading(true)
      const response = await axios.post("http://localhost:3000/auth/recover-password", {
        email,
      })

      console.log("Recuperación de contraseña enviada:", response.data)
      setIsSubmitted(true) // Muestra el mensaje de éxito
    } catch (error) {
      console.error("Error al enviar el correo de recuperación:", error)
      setError("Hubo un problema al enviar el enlace de recuperación")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout">
      {/* Partículas flotantes */}
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>

      <div className="auth-form-container">
        <div className="auth-form-content">
          <div className="auth-logo"></div>

          {isSubmitted ? (
            <div className="password-reset-success">
              <div className="success-icon" style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--color-success)" }}
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2 className="auth-title">¡Correo enviado!</h2>
              <p style={{ textAlign: "center", marginBottom: "1rem" }}>
                Hemos enviado un enlace de recuperación a <strong>{email}</strong>. Por favor revisa tu bandeja de
                entrada y sigue las instrucciones.
              </p>
              <p
                className="email-note"
                style={{
                  textAlign: "center",
                  color: "var(--color-text-light)",
                  fontSize: "0.9rem",
                  marginBottom: "1.5rem",
                }}
              >
                Si no recibes el correo en unos minutos, revisa tu carpeta de spam.
              </p>
              <Link to="/" className="auth-link" style={{ display: "block", textAlign: "center" }}>
                Volver al inicio de sesión
              </Link>
            </div>
          ) : (
            <>
              <h2 className="auth-title">Recuperar Contraseña</h2>

              {error && <div className="auth-error">{error}</div>}

              <div
                className="password-reset-info"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  backgroundColor: "rgba(75, 85, 99, 0.05)",
                  borderRadius: "var(--radius)",
                  marginBottom: "1.5rem",
                }}
              >
                <div className="info-icon" style={{ color: "var(--color-primary)" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <p style={{ fontSize: "0.9rem", margin: 0 }}>Ingresa tu correo electrónico.</p>
              </div>

              <form onSubmit={handleResetPassword} className="auth-form">
                <div className="input-group">
                  <label className="input-label">
                    <span className="input-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                    <input
                      type="email"
                      placeholder="tu-correo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="input-field"
                    />
                    <span className="input-highlight"></span>
                  </label>
                </div>

                <button type="submit" className={`submit-btn ${loading ? "loading" : ""}`} disabled={loading}>
                  {loading ? <span className="loader"></span> : "Enviar enlace de recuperación"}
                </button>
              </form>

              <div
                className="reset-steps"
                style={{
                  marginTop: "1.5rem",
                  backgroundColor: "rgba(75, 85, 99, 0.05)",
                  padding: "1rem",
                  borderRadius: "var(--radius)",
                }}
              >
                <h3 style={{ fontSize: "0.95rem", marginBottom: "0.75rem", color: "var(--color-text)" }}>
                  Proceso de recuperación:
                </h3>
                <ol style={{ paddingLeft: "1.25rem", fontSize: "0.9rem", color: "var(--color-text-light)" }}>
                  <li style={{ marginBottom: "0.5rem" }}>Ingresa tu correo electrónico registrado</li>
                  <li style={{ marginBottom: "0.5rem" }}>Recibirás un correo con un enlace de recuperación</li>
                  <li>Haz clic en el enlace y crea una nueva contraseña</li>
                </ol>
              </div>

              <div className="login-links">
                <Link
                  to="/"
                  className="auth-link"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Volver al inicio de sesión
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

