import axios from "axios";
import { urlBarbero } from "../endpoints/Endpoints";
import { ValidacionesRegistroBarbero } from "../util/validaciones/ValidacionesRegistros";
import { obtenerCredenciales } from "./CitasPeticiones";

// Obtener lista de barberos
export async function obtenerBarberos(setBarberos) {
  try {
    const peticion = await axios.get(`${urlBarbero}/GetBarberos`);

    if (peticion.data.success) {
      setBarberos(peticion.data.data);
    }
  } catch (error) {
    console.error("Error al obtener los barberos:", error);
  }
}

// Obtener barberos con respuesta
export async function obtenerBarberosData(setBarberos, setRespuesta) {
  try {
    const peticion = await axios.get(`${urlBarbero}/GetBarberos`);

    if (peticion.data.success) {
      setBarberos(peticion.data.data);
    } else {
      setRespuesta("No hay Barberos");
    }
  } catch (error) {
    console.error("Ha ocurrido un error: " + error);
  }
}

//Obtener Barbero por su Id
export async function obtenerBarberoId(setBarberos, setRespuesta, id) {
  try {

    const peticion = await axios.get(`${urlBarbero}/BarberoById/${id}`);

    if (peticion.data.success) {
      setBarberos(peticion.data.data);
    } else {
      setRespuesta("No hay Barberos");
    }
  } catch (error) {
    console.error("Ha ocurrido un error: " + error);
  }
}

//Agregar Barbero
export async function anadirBarbero(
  nombre,
  telefono,
  email,
  password,
  imgbarbero,
  setMensajeNombre,
  setMensajeTelefono,
  setMensajeEmail,
  setMensajeImagen,
  setMensajePassword,
  setMensaje
) {
  //validaciones
  if (
    !ValidacionesRegistroBarbero(
      nombre,
      telefono,
      email,
      password,
      imgbarbero,
      setMensajeNombre,
      setMensajeTelefono,
      setMensajeEmail,
      setMensajeImagen,
      setMensajePassword
    )
  ) {
    return;
  }

  //Obtener Credenciales
  const { id, token } = obtenerCredenciales();

  if (!token || !id) {
    setMensaje("Token o ID no disponible");
    return;
  }

  const barberoDto = {
    barberoId: 0,
    nombre: nombre,
    telefono: telefono,
    email: email,
    password: password,
    imgbarbero: imgbarbero,
  };

  try {
    const { data } = await axios.post(`${urlBarbero}/save`, barberoDto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setMensaje("Barbero Agregado Correctamente");
    } else {
      setMensaje(data.message);
    }
  } catch (error) {
    console.log("Ha ocurrido un error" + error);
  }
}
