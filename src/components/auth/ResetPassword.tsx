import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();  // Obtener el token de la URL
  const navigate = useNavigate();

  // Extraer el token de la URL
  const getTokenFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("access_token");
  };

  const token = getTokenFromUrl();

  useEffect(() => {
    // Si no hay token en la URL, mostrar un error
    if (!token) {
      setError("Token de recuperación inválido");
    }
  }, [token]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Enviar la nueva contraseña al backend para que la actualice en Supabase
      await axios.post("http://localhost:3000/auth/reset-password", {
        token,           // Token de recuperación obtenido de la URL
        newPassword     // Nueva contraseña proporcionada por el usuario
      });

      setMessage("Contraseña restablecida con éxito. Ahora puedes iniciar sesión.");
      // Redirigir al login
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError("Error al restablecer la contraseña");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-form-container">
        <div className="auth-form-content">
          <div className="auth-logo">
            <span>Cultivos Del Sur</span>
          </div>

          <h2>Restablecer Contraseña</h2>

          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleResetPassword}>
            <div className="input-group">
              <label htmlFor="newPassword">Nueva Contraseña</label>
              <input
                id="newPassword"
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</label>
              <input
                id="confirmNewPassword"
                type="password"
                placeholder="Confirmar nueva contraseña"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Restablecer Contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
