import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

// Función para obtener el rol del usuario desde el token
const getRoleFromToken = () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }

  return null;
};

// Función para verificar si el token ha expirado
export const isTokenExpired = () => {
  const tokenExpiry = localStorage.getItem("token_expiry");

  if (tokenExpiry) {
    const now = Date.now();
    return now > parseInt(tokenExpiry);
  }

  return true; 
};

// Componente de protección de rutas
const ProtectedRoute = ({ element, requiredRole, requiredRole2, requiredRole3, elementDefault }) => {
  const role = getRoleFromToken();
  const tokenExpired = isTokenExpired();

  if (tokenExpired) {
    return <Navigate to="/iniciarsesion" />;
  }

  if (role === requiredRole || role === requiredRole2 || role === requiredRole3) {
    return element;
  }

  return <Navigate to={elementDefault} />;
};

export default ProtectedRoute;
