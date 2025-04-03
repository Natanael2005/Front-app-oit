"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Registro = () => {
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [confirmarContrasena, setConfirmarContrasena] = useState("")
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState("")
  const [exito, setExito] = useState("")

  // Estado para validaciones de contraseña
  const [validaciones, setValidaciones] = useState({
    longitud: false,
    mayuscula: false,
    numero: false,
  })

  // Estado para verificar si el formulario es válido
  const [formularioValido, setFormularioValido] = useState(false)

  // Hook para navegar
  const navigate = useNavigate()

  // Validar contraseña cuando cambia
  useEffect(() => {
    const validarContrasena = () => {
      setValidaciones({
        longitud: contrasena.length >= 8,
        mayuscula: /[A-Z]/.test(contrasena),
        numero: /[0-9]/.test(contrasena),
      })
    }
    validarContrasena()
  }, [contrasena])

  // Verificar si el formulario es válido
  useEffect(() => {
    const todasValidacionesOk = Object.values(validaciones).every((v) => v)
    const contrasenaCoincide = contrasena === confirmarContrasena
    const correoValido = /\S+@\S+\.\S+/.test(correo)
    setFormularioValido(
      todasValidacionesOk &&
        contrasenaCoincide &&
        correoValido &&
        contrasena.length > 0 &&
        confirmarContrasena.length > 0,
    )
  }, [validaciones, contrasena, confirmarContrasena, correo])

  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setExito("")

    if (contrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden")
      return
    }
    if (!validaciones.longitud || !validaciones.mayuscula || !validaciones.numero) {
      setError("La contraseña no cumple con los requisitos")
      return
    }
    try {
      setCargando(true)
      const response = await axios.post("http://localhost:3000/auth/register", {
        email: correo,
        password: contrasena,
      })
      console.log("Usuario registrado:", response.data)
      setExito("Registro exitoso. Serás redirigido al login en unos segundos.")
      setTimeout(() => {
        navigate("/")
      }, 2000)
    } catch (error: any) {
      console.error("Error al registrar el usuario:", error)
      // Verificar si el error indica que el usuario ya está registrado
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data.error === "string" &&
        (error.response.data.error.includes("already registered") ||
          error.response.data.error.includes("User already exists"))
      ) {
        setError("El usuario ya está registrado")
      } else {
        setError("Hubo un problema al registrar al usuario")
      }
    } finally {
      setCargando(false)
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
          <div className="auth-logo">
            <span>Registro</span>
          </div>
          <h2 className="auth-title">Crear una Cuenta</h2>
          {error && <div className="auth-error">{error}</div>}
          {exito && (
            <div
              className="auth-success"
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius)",
                fontSize: "0.9rem",
                marginBottom: "1rem",
                borderLeft: "3px solid var(--color-success)",
                backgroundColor: "rgba(16, 185, 129, 0.05)",
                color: "var(--color-success)",
              }}
            >
              {exito}
            </div>
          )}
          <form onSubmit={manejarRegistro} className="auth-form">
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
                    <path d="M22 17.5l-9.9 1.2L2 17.5V5l9.9 1.2L22 5v12.5z" />
                    <path d="M12 12v6" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                  className="input-field"
                />
                <span className="input-highlight"></span>
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
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </span>
                <input
                  type={mostrarContrasena ? "text" : "password"}
                  placeholder="Contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                  className="input-field"
                />
                <span className="input-highlight"></span>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                  aria-label={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
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
                    {mostrarContrasena ? (
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
              {contrasena.length > 0 && (
                <div className="password-requirements">
                  <div
                    className={`password-requirement ${validaciones.longitud ? "requirement-valid" : "requirement-invalid"}`}
                  >
                    <span>
                      {!validaciones.longitud && (
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
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      )}
                    </span>
                    <span>Mínimo 8 caracteres</span>
                  </div>
                  <div
                    className={`password-requirement ${validaciones.mayuscula ? "requirement-valid" : "requirement-invalid"}`}
                  >
                    <span>
                      {!validaciones.mayuscula && (
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
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      )}
                    </span>
                    <span>Al menos una letra mayúscula</span>
                  </div>
                  <div
                    className={`password-requirement ${validaciones.numero ? "requirement-valid" : "requirement-invalid"}`}
                  >
                    <span>
                      {!validaciones.numero && (
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
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      )}
                    </span>
                    <span>Al menos un número</span>
                  </div>
                </div>
              )}
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
                  type={mostrarConfirmarContrasena ? "text" : "password"}
                  placeholder="Confirmar Contraseña"
                  value={confirmarContrasena}
                  onChange={(e) => setConfirmarContrasena(e.target.value)}
                  required
                  className="input-field"
                />
                <span className="input-highlight"></span>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setMostrarConfirmarContrasena(!mostrarConfirmarContrasena)}
                  aria-label={mostrarConfirmarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
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
                    {mostrarConfirmarContrasena ? (
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
              {confirmarContrasena.length > 0 && (
                <div className="password-requirements">
                  <div
                    className={`password-requirement ${contrasena === confirmarContrasena ? "requirement-valid" : "requirement-invalid"}`}
                  >
                    <span>
                      {contrasena !== confirmarContrasena && (
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
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      )}
                    </span>
                    <span>Las contraseñas coinciden</span>
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className={`submit-btn ${cargando ? "loading" : ""}`}
              disabled={cargando || !formularioValido}
            >
              {cargando ? <span className="loader"></span> : "Registrarse"}
            </button>
            <div className="login-links">
              <Link to="/" className="auth-link">
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registro
