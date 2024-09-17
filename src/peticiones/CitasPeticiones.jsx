import axios from "axios";
import { urlCita } from "../endpoints/Endpoints";
import { ValidacionesAgregarCitas } from "../util/validaciones/ValidacionesRegistros";

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
    setMensaje("Token o ID no disponible");
    return;
  }

  const citaDto = {
    citaId: 0,
    fecha: fecha,
    hora: `${hora}:00`,
    barberoId: barbero,
    clienteId: id,
    estiloId: estilo,
    estado: "En Proceso",
  };

  try {
    const peticion = await axios.post(`${urlCita}/save`, citaDto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setMensaje(peticion.data.message);

      setTimeout(() => {
        setMensaje("");
      }, 1000);
    } else {
      setMensaje("Error: " + peticion.data.message);
    }
  } catch (error) {
    const mensajeError =
      error.response?.data.message || "Ocurrió un error al agregar la cita.";
    setMensaje(mensajeError);
  }
}

// Obtener citas por cliente
export async function obtenerCitas(setCitas, setMensaje) {
  const { id, token } = obtenerCredenciales();

  if (!token || !id) {
    setMensaje("Token o ID no disponible");
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
    }
  } catch (error) {
    const mensajeError =
      error.response?.data.message || "Ocurrió un error obteniendo las citas";
    setMensaje(mensajeError);    
  }
}

//Obtener Cita por el Id
export async function obtenerCitaById(citaId,setCitas, setMensajeCitas) {
  const {token } = obtenerCredenciales();

  if (!token) {
    setMensajeCitas("Debe Registrarse");
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
    }
  } catch (error) {
    const mensajeError =
      error.response?.data.message || "Ocurrió un error obteniendo la cita";
      setMensajeCitas(mensajeError);    
  }
}

//ObtenerCitasClientesById - Detalles
export async function obtenerCitasById(id,setCita, setMensajeCita) {
  const {token } = obtenerCredenciales();

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
    }
  } catch (error) {
    const mensajeError =
      error.response?.data.message || "Ocurrió un error obteniendo las citas";
      setMensajeCita(mensajeError);    
  }
}

// Obtener citas por obtenerCitasBarberoById
export async function obtenerCitasBarberoById(setCitas, setMensaje) {
  const { id, token } = obtenerCredenciales();

  if (!token || !id) {
    setMensaje("Token o ID no disponible");
    return;
  }

  try {
    const { data } = await axios.get(`${urlCita}/GetCitasByBarbero/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      if (data.data.length > 0) {
        setCitas(data.data);
      } else {
        setMensaje("No Tiene Citas");
      }
    } else {
      setCitas([]);
      setMensaje("No se pudieron obtener las citas");
    }
  } catch (error) {
    const mensajeError =
      error.response?.data.message || "Ocurrió un error obteniendo la citas del barbero";
    setMensaje(mensajeError);  
  }
}

// Actualizar estado de cita
export async function actualizarCitaBarbero(setMensaje, id, estado) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse");
    return;
  }

  const updateData = {
    citaId: id,
    estado: estado,
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
      setTimeout(() => {
        setMensaje("");
      }, 1000);
    }
  } catch (error) {
    const mensajeError = error.response?.data.message || "Ocurrió un error actualizando la cita del barbero";
    setMensaje(mensajeError);   
   }
}

// Eliminar cita
export async function EliminarCita(setMensaje, id, estado = "") {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse");
    return;
  }

  const DeleteData = {
    citaId: id,
    fecha: "2024-08-12T02:15:42.503Z",
    hora: "00:00:00",
    barberoId: 0,
    clienteId: 0,
    estiloId: 0,
    estado: estado,
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
      setTimeout(() => {
        setMensaje("");
      }, 1000);
    }
  } catch (error) {
    const mensajeError =
      error.response?.data.message || "Ocurrió un error eliminando la citas del barbero";
    setMensaje(mensajeError);    
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
