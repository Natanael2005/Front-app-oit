import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Importar useNavigate
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();  // Crear una instancia del hook useNavigate

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      console.log("Usuario logueado:", response.data);
      // Aquí puedes guardar los tokens en el localStorage o las cookies si es necesario

      // Redirigir al dashboard después de un login exitoso
      navigate("/dashboard");  // Redirige a la ruta de dashboard

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-form-container">
        <div className="auth-form-content">
          <div className="auth-logo">
            <span>Cultivos Del Sur</span>
          </div>
          <h2>Iniciar sesión</h2>

          {/* Formulario */}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
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
            
            <button type="submit" className="submit-btn">Ingresar</button>
          </form>

          <div className="login-links">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link> <br />
            <Link to="/register">¿No tienes cuenta? Regístrate</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
