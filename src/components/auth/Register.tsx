import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Registro = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false);

  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        email: correo,
        password: contrasena,
      });

      console.log("Usuario registrado:", response.data);
      // Puedes redirigir al usuario al login o a otra página
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      alert("Hubo un problema al registrar al usuario");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-form-container">
        <div className="auth-form-content">
          <div className="auth-logo">
            <span>Cultivos Del Sur</span>
          </div>

          <h2>Crear una Cuenta</h2>

          <form onSubmit={manejarRegistro}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="input-group password-group">
              <input
                type={mostrarContrasena ? "text" : "password"}
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setMostrarContrasena(!mostrarContrasena)}
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
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
            <div className="input-group password-group">
              <input
                type={mostrarConfirmarContrasena ? "text" : "password"}
                placeholder="Confirmar Contraseña"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setMostrarConfirmarContrasena(!mostrarConfirmarContrasena)}
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
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
            <button type="submit" className="submit-btn">Registrarse</button>
            <div className="login-links mobile-only">
              <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
