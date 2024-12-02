import { ValidacionesAdminCitasReportes } from "../util/validaciones/ValidacionesRegistros";
import { obtenerCredenciales } from "./CitasPeticiones";
import { urlReportes } from "../endpoints/Endpoints";
import axios from "axios";

//Obtener Reportes
export async function obtenerReportes(
  setCitas,
  setMensaje,
  fechaInicio,
  fechaFin,
  setFechaInicioMensaje,
  setFechaFinMensaje
) {
  const { id, token } = obtenerCredenciales();

console.log(id);

  if (!token || !id) {
    setMensaje("Debe registrarse.");
    setCitas([]); 
    return;
  }

  if (
    !ValidacionesAdminCitasReportes(
      fechaInicio,
      fechaFin,
      setFechaInicioMensaje,
      setFechaFinMensaje
    )
  ) {
    setCitas([]); 
    return;
  }

  try {
    const peticion = await axios.get(
      `${urlReportes}/GetReportes/${id}/${fechaInicio}/${fechaFin}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

console.log(peticion.data)

    if (peticion.data.success) {
      setCitas(peticion.data.data); 
    } else {
      setMensaje(peticion.data.message);
      setCitas([]); 
      setTimeout(() => setMensaje(""), 1000);
    }
  } catch (error) {
    setMensaje("Ocurrió un error obteniendo las citas: " + error.message);
    setCitas([]); 
  }
}

export async function obtenerTotalClientes(setTotalClientes, setMensaje) {
  // Obtener credenciales
  const { id, token } = obtenerCredenciales();

  if (!token || !id) {
    setMensaje("Debe registrarse.");
    return;
  }

  try {
    const peticion = await axios.get(`${urlReportes}/GetTotalClientes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setTotalClientes(peticion.data.data);
    } else {
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 1000);
    }
  } catch (error) {
    setMensaje(
      "Ocurrió un error obteniendo el total de clientes: " + error.message
    );
  }
}

export async function obtenerTotalBarberos(setTotalBarberos, setMensaje) {
  // Obtener credenciales
  const { id, token } = obtenerCredenciales();

  if (!token || !id) {
    setMensaje("Debe registrarse.");
    return;
  }

  try {
    const peticion = await axios.get(`${urlReportes}/GetTotalBarberos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setTotalBarberos(peticion.data.data);
    } else {
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 1000);
    }
  } catch (error) {
    setMensaje(
      "Ocurrió un error obteniendo el total de clientes: " + error.message
    );
  }
}

export async function obtenerTotalIngresos(setTotalIngresos, setMensaje) {
  // Obtener credenciales
  const { id, token } = obtenerCredenciales();

  if (!token || !id) {
    setMensaje("Debe registrarse.");
    return;
  }

  try {
    const peticion = await axios.get(`${urlReportes}/GetIngresos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setTotalIngresos(peticion.data.data);
    } else {
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 1000);
    }
  } catch (error) {
    setMensaje(
      "Ocurrió un error obteniendo el total de clientes: " + error.message
    );
  }
}
