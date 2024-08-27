import axios from "axios";
import { ValidacionesIniciarSesion } from "../util/validaciones/ValidacionesRegistros";

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
  setLoading,
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

  setLoading(true);
  setError("");
  setResultado("");

  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("nombre");

  try {
    const peticion = await axios.get(url);

    if (peticion.data.data.success) {
      const tokenData = peticion.data.token;
      const idData = peticion.data.data.data[sessionId];
      const nombreData = peticion.data.data.data.nombre;

      localStorage.setItem("id", idData);
      localStorage.setItem("token", tokenData);
      localStorage.setItem("nombre", nombreData);

      // Set timeout to clear the session after 30 minutes
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("nombre");
        navigate("/iniciarsesion");
      }, 30 * 60 * 1000); // 30 minutes in milliseconds

      setResultado("Inicio de sesión exitoso.");
      navigate(`/${tipo}`);
    } else {
      setError(peticion.data.data.message);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error en la solicitud.");
  } finally {
    setLoading(false);
  }
}


// Cerrar Sesion
export function CerrarSesion(navigate) {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("nombre");
  navigate("/");
}
