import axios from "axios";
import { urlEstilos } from "../endpoints/Endpoints";
import { obtenerCredenciales } from "./CitasPeticiones";
import { ValidacionesRegistroEstilos } from "../util/validaciones/ValidacionesRegistros";

//Agregar estilo
export async function agregarEstilos(
  nombre,
  descripcion,
  precio,
  imagen,
  setMensaje,
  setMensajeNombre,
  setMensajeDescripcion,
  setMensajePrecio,
  setMensajeImagen
) {
  const { id, token } = obtenerCredenciales();

  if (!token || !id) {
    setMensaje("Token o ID no disponible");
    return;
  }

  //Validaciones
  if (
    !ValidacionesRegistroEstilos(
      nombre,
      descripcion,
      precio,
      imagen,
      setMensajeNombre,
      setMensajeDescripcion,
      setMensajePrecio,
      setMensajeImagen
    )
  ) {
    return;
  }

  const EstiloDto = {
    estiloId: 0,
    nombre: nombre,
    descripcion: descripcion,
    precio: precio,
    imgestilo: imagen,
  };

  try {
    const peticion = await axios.post(`${urlEstilos}/Save`, EstiloDto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setMensaje("Estilo Agregado Correctamente");
    } else {
      setMensaje("No se pudo agregar el estilo");
    }
  } catch (error) {
    console.log("Ha ocurrido un error: " + error);
  }
}

// Obtener estilos - Busqueda
export async function obtenerEstilosBusqueda(setData, setRespuesta) {
  try {
    const peticion = await axios.get(`${urlEstilos}/GetEstilos`);

    if (peticion.data.success) {
      setData(peticion.data.data);
    } else {
      setRespuesta("No hay Estilos");
    }
  } catch (error) {
    console.log("Ha ocurrido un error: " + error);
  }
}

// Obtener estilos para cliente
export async function obtenerEstilos(setEstilos) {
  try {
    const peticion = await axios.get(`${urlEstilos}/GetEstilos`);
    if (peticion.data.success) {
      setEstilos(peticion.data.data);
    }
  } catch (error) {
    console.error("Error al obtener los estilos:", error);
  }
}