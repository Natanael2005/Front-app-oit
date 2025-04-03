// privateRoute.tsx
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");

  // Si no hay token, redirige a la ruta de login (en este ejemplo, a "/" que debería ser el login)
  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
