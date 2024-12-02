import axios from "axios";
import { urlCita } from "../endpoints/Endpoints";
import {
  ValidacionesAdminCitasReportes,
  ValidacionesAgregarCitas,
} from "../util/validaciones/ValidacionesRegistros";

// Función para obtener el token y el id del localStorage
export function obtenerCredenciales() {
  return {
    id: localStorage.getItem("id"),
    token: localStorage.getItem("token"),
  };
}

// Añadir cita
export async function anadirCita(
  e,
  fecha,
  hora,
  barbero,
  estilo,
  setMensajeFecha,
  setMensajeHora,
  setMensajeBarbero,
  setMensajeEstilo,
  setMensaje
) {
  e.preventDefault();

  if (
    !ValidacionesAgregarCitas(
      fecha,
      hora,
      barbero,
      estilo,
      setMensajeFecha,
      setMensajeHora,
      setMensajeBarbero,
      setMensajeEstilo
    )
  ) {
    return;
  }

  const { id, token } = obtenerCredenciales();

  if (!token || !id) {
    setMensaje("Debe estar registrado");
    return;
  }

  const idbarberia = localStorage.getItem("barberiaId") 

  const citaDto = {
    citaId: 0,
    fecha: fecha,
    hora: `${hora}:00`,
    barberiaId: idbarberia,
    barberoId: barbero,
    clienteId: id,
    estiloId: estilo,
    estado: "En Proceso",
    changeDate: new Date(),
    changeUser: id,
  };


  try {
    const peticion = await axios.post(`${urlCita}/save`, citaDto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 2000);
    } else {
      setMensaje("Error: " + peticion.data.message);
      setTimeout(() => setMensaje(""), 2000);
    }
  } catch (error) {
    setMensaje("Ocurrió un error al agregar la cita" + error);
    setTimeout(() => setMensaje(""), 2000);
  }
}

// Obtener citas por cliente
export async function obtenerCitas(setCitas, setMensaje) {
  const { id, token } = obtenerCredenciales();

  if (!token || !id) {
    setMensaje("Debe registrarse.");
    return;
  }

  try {
    const peticion = await axios.get(`${urlCita}/GetCitasByCliente/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setCitas(peticion.data.data);
    } else {
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 1000);
    }
  } catch (error) {
    setMensaje("Ocurrió un error obteniendo las citas" + error);
  }
}

//Obtener Cita por el Id
export async function obtenerCitaById(citaId, setCitas, setMensajeCitas) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensajeCitas("Debe Registrarse.");
    return;
  }

  try {
    const peticion = await axios.get(`${urlCita}/GetCitasById/${citaId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setCitas(peticion.data.data);
    } else {
      setMensajeCitas(peticion.data.message);
      setTimeout(() => setMensaje(""), 1000);
    }
  } catch (error) {
    setMensajeCitas("Ocurrió un error obteniendo la cita" + error);
  }
}

//ObtenerCitasClientesById - Detalles
export async function obtenerCitasById(id, setCita, setMensajeCita) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensajeCita("Debe Registrarse.");
    return;
  }

  try {
    const peticion = await axios.get(`${urlCita}/GetCitasByCliente/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setCita(peticion.data.data);
    } else {
      setMensajeCita(peticion.data.message);
      setTimeout(() => setMensajeCita(""), 1000);
    }
  } catch (error) {
    setMensajeCita("Ocurrió un error obteniendo las citas" + error);
  }
}

// Obtener citas por obtenerCitasBarberoById
export async function obtenerCitasBarberoById(setCitas, setMensaje) {
  const { id, token } = obtenerCredenciales();

  if (!token || !id) {
    setMensaje("Debe registrarse.");
    return;
  }

  try {
    const peticion = await axios.get(`${urlCita}/GetCitasByBarbero/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      if (peticion.data.data.length > 0) {
        setCitas(peticion.data.data);
      } else {
        setMensaje(peticion.data.message);
        setTimeout(() => setMensaje(""), 2000);
      }
    } else {
      setCitas([]);
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 2000);
    }
  } catch (error) {
    setMensaje("Ocurrió un error obteniendo la citas del barbero." + error);
  }
}

// Actualizar estado de cita
export async function actualizarCitaBarbero(setMensaje, id, estado) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse.");
    return;
  }

  const idUser = localStorage.getItem("id");

  const updateData = {
    citaId: id,
    estado: estado,
    changeDate: new Date(),
    changeUser: idUser,
  };

  try {
    const peticion = await axios.put(`${urlCita}/UpdateEstado`, updateData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setMensaje(peticion.data.message);
      window.location.reload();
    } else {
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 1000);
    }
  } catch (error) {
    setMensaje("Ocurrió un error actualizando la cita del barbero." + error);
  }
}

// Eliminar cita
export async function EliminarCita(setMensaje, id, estado = "") {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse.");
    return;
  }

  const idUser = localStorage.getItem("id");
  console.log();

  const DeleteData = {
    citaId: id,
    fecha: "2024-08-12T02:15:42.503Z",
    hora: "00:00:00",
    barberoId: 0,
    clienteId: 0,
    estiloId: 0,
    estado: estado,
    creationDate: "",
    changeUser: idUser,
  };

  try {
    const peticion = await axios.delete(`${urlCita}/Delete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: DeleteData,
    });

    if (peticion.data.success) {
      setMensaje(peticion.data.message);
      window.location.reload();
    } else {
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 1000);
    }
  } catch (error) {
    setMensaje("Ocurrió un error eliminando la citas del barbero" + error);
  }
}

//Fecha Actual
export function obtenerFechaActual() {
  const fechaActual = new Date();
  const anio = fechaActual.getFullYear();
  const mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexados
  const dia = String(fechaActual.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}
