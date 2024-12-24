import axios from "axios";
import { ValidacionesIniciarSesion } from "../util/validaciones/ValidacionesRegistros";
import { jwtDecode } from "jwt-decode";

//IniciarSesion
export async function obtenerUsuario(
  e,
  navigate,
  url,
  sessionId,
  tipo,
  nombre,
  contrasena,
  setMensajeNombre,
  setMensajeContrasena,
  setError,
  setCargando,
  setResultado
) {
  e.preventDefault();

  if (
    !ValidacionesIniciarSesion(
      nombre,
      contrasena,
      setMensajeNombre,
      setMensajeContrasena
    )
  ) {
    return;
  }

  if (!url) {
    setError("URL inválida.");
    return;
  }

  setCargando(true);
  setError("");
  setResultado("");

  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("nombre");
  localStorage.removeItem("token_expiry");
  localStorage.removeItem("barberiaId");

  try {
    const peticion = await axios.get(url);

    if (peticion.data.data.success) {
      const tokenData = peticion.data.token;
      const idData = peticion.data.data.data[sessionId];
      const nombreData = peticion.data.data.data.nombre;
      const idBarberia = peticion.data.data.data.barberiaId;

      localStorage.setItem("id", idData);
      localStorage.setItem("barberiaId", idBarberia);
      localStorage.setItem("token", tokenData);
      localStorage.setItem("nombre", nombreData);

      const decodedToken = jwtDecode(tokenData);
      const now = Date.now();
      const expiryDate = now + 30 * 60 * 1000;
      localStorage.setItem("token_expiry", expiryDate.toString());
      setResultado("Inicio de sesión exitoso.");
      navigate(`/${tipo}`);
    } else {
      setTimeout(() => {
        setError(peticion.data.message);
      }, 2000);
    }
  } catch (error) {
    setTimeout(() => {
      setError(error.response?.data?.message || "Error en la solicitud.");
    }, 2000);
  } finally {
    setCargando(false);
  }
}

// Cerrar Sesion
export function CerrarSesion(navigate) {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("nombre");
  localStorage.removeItem("token_expiry");
  localStorage.removeItem("barberiaId");
  navigate("/");
}
