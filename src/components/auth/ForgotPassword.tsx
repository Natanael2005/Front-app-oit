import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/recover-password", {
        email,
      });

      console.log("Recuperación de contraseña enviada:", response.data);
      setIsSubmitted(true);  // Muestra el mensaje de éxito

    } catch (error) {
      console.error("Error al enviar el correo de recuperación:", error);
      alert("Hubo un problema al enviar el enlace de recuperación.");
    }
  };

  return (
    <div className="auth-layout">
      {/* Lado izquierdo - Formulario */}
      <div className="auth-form-container">
        <div className="auth-form-content">
          {/* Logo */}
          <div className="auth-logo">
            <span>Cultivos Del Sur</span>
          </div>

          {isSubmitted ? (
            <div className="password-reset-success">
              <div className="success-icon">
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
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2>¡Correo enviado!</h2>
              <p>
                Hemos enviado un enlace de recuperación a <strong>{email}</strong>.
                Por favor revisa tu bandeja de entrada y sigue las instrucciones.
              </p>
              <p className="email-note">
                Si no recibes el correo en unos minutos, revisa tu carpeta de spam.
              </p>
              <Link to="/" className="back-to-login">
                Volver al inicio de sesión
              </Link>
            </div>
          ) : (
            <>
              <h2>Recuperar Contraseña</h2>

              <div className="password-reset-info">
                <div className="info-icon">
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
                <p>
                  Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleResetPassword}>
                <div className="input-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <div className="email-input-wrapper">
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
                      className="email-icon"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <input
                      id="email"
                      type="email"
                      placeholder="tu-correo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="submit-btn">
                  Enviar enlace de recuperación
                </button>
              </form>

              <div className="reset-steps">
                <h3>Proceso de recuperación:</h3>
                <ol>
                  <li>Ingresa tu correo electrónico registrado</li>
                  <li>Recibirás un correo con un enlace de recuperación</li>
                  <li>Haz clic en el enlace y crea una nueva contraseña</li>
                </ol>
              </div>

              <div className="login-links">
                <Link to="/login" className="back-link">
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
  );
};

export default ForgotPassword;
