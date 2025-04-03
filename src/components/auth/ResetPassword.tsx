"use client"

import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../../services/supabaseClient"

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const [validaciones, setValidaciones] = useState({
    longitud: false,
    mayuscula: false,
    numero: false,
  })

  const [formularioValido, setFormularioValido] = useState(false)

  useEffect(() => {
    const rawHash = window.location.hash
    const hashParams = new URLSearchParams(rawHash.replace("#", ""))
    const access_token = hashParams.get("access_token")
    const refresh_token = hashParams.get("refresh_token") || ""

    if (!access_token) {
      setError("Token de recuperación no encontrado en la URL")
      return
    }

    supabase.auth.setSession({ access_token, refresh_token })
      .then(({ error }) => {
        if (error) {
          console.error(error)
          if (error.message.includes("expired") || error.message.includes("Invalid")) {
            setError("El enlace ha expirado o ya fue utilizado. Solicita uno nuevo para restablecer tu contraseña.")
          } else {
            setError("Error al establecer sesión de recuperación: " + error.message)
          }
        }
      })
  }, [])

  useEffect(() => {
    const validarContrasena = () => {
      setValidaciones({
        longitud: newPassword.length >= 8,
        mayuscula: /[A-Z]/.test(newPassword),
        numero: /[0-9]/.test(newPassword),
      })
    }
    validarContrasena()
  }, [newPassword])

  useEffect(() => {
    const todasValidacionesOk = Object.values(validaciones).every((v) => v)
    const contrasenaCoincide = newPassword === confirmNewPassword

    setFormularioValido(
      todasValidacionesOk &&
        contrasenaCoincide &&
        newPassword.length > 0 &&
        confirmNewPassword.length > 0
    )
  }, [validaciones, newPassword, confirmNewPassword])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")

    if (newPassword !== confirmNewPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (!validaciones.longitud || !validaciones.mayuscula || !validaciones.numero) {
      setError("La contraseña no cumple con los requisitos")
      return
    }

    try {
      setLoading(true)
      const { error } = await supabase.auth.updateUser({ password: newPassword })

      if (error) {
        setError("Error al actualizar la contraseña: " + error.message)
        return
      }

      setMessage("Contraseña restablecida con éxito. Ahora puedes iniciar sesión.")
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (err) {
      setError("Error al restablecer la contraseña")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout">
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
          <div className="auth-logo">
            <span>Cultivos Del Sur</span>
          </div>

          <h2 className="auth-title">Restablecer Contraseña</h2>

          {message && (
            <div
              style={{
                color: "var(--color-success)",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius)",
                fontSize: "0.9rem",
                marginBottom: "1rem",
                borderLeft: "3px solid var(--color-success)",
                backgroundColor: "rgba(16, 185, 129, 0.05)",
              }}
            >
              {message}
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleResetPassword} className="auth-form">
            <div className="input-group password-group">
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
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </span>
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <span className="input-highlight"></span>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
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
                    {showNewPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </label>
            </div>

            <div className="input-group password-group">
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
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar nueva contraseña"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <span className="input-highlight"></span>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
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
                    {showConfirmPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </label>
            </div>

            <button
              type="submit"
              className={`submit-btn ${loading ? "loading" : ""}`}
              disabled={loading || !formularioValido}
            >
              {loading ? <span className="loader"></span> : "Restablecer Contraseña"}
            </button>

            <div className="login-links">
              <Link to="/" className="auth-link">
                Volver al inicio de sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
