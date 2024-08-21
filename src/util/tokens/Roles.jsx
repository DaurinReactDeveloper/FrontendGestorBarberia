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

// Componente de protección de rutas
const ProtectedRoute = ({ element, requiredRole, elementDefault }) => {
  const role = getRoleFromToken();

  if (role === requiredRole) {
    return element;
  }

  return <Navigate to={elementDefault} />;
};

export default ProtectedRoute;
