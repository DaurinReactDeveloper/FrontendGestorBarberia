import axios from "axios";
import { urlCita } from "../endpoints/Endpoints";

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
    fecha,
    hora: {
      ticks: hora.getTime() * 10000,
    },
    barberoId: barbero,
    clienteId: id,
    estiloId: estilo,
    estado: "En Proceso",
  };

  try {
    const { data } = await axios.post(`${urlCita}/save`, citaDto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setMensaje("Cita Agregada Correctamente");
    } else {
      setMensaje(data.message);
    }
  } catch (error) {
    manejarError(error, setMensaje);
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
    const { data } = await axios.get(`${urlCita}/GetCitasByCliente/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setCitas(data.data);
    } else {
      setCitas([]);
      setMensaje("No se pudieron obtener las citas");
    }
  } catch (error) {
    manejarError(error, setMensaje);
  }
}

// Obtener citas por barbero
export async function obtenerCitasBarbero(setCitas, setMensaje) {
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
    manejarError(error, setMensaje);
  }
}

// Actualizar estado de cita
export async function actualizarCitaBarbero(setMensaje, id, estado) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Token no disponible");
    return;
  }

  const updateData = {
    citaId: id,
    estado,
  };

  try {
    const { data } = await axios.put(`${urlCita}/UpdateEstado`, updateData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setMensaje("Cita Actualizada Correctamente");
      window.location.reload();
    } else {
      setMensaje("No se pudo actualizar la cita");
    }
  } catch (error) {
    manejarError(error, setMensaje);
  }
}

// Eliminar cita
export async function EliminarCita(setMensaje, id, estado = "") {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Token no disponible");
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

  console.log(estado);

  try {
    const peticion = await axios.delete(`${urlCita}/Delete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: DeleteData,
    });

    console.log(peticion.data.message);

    if (peticion.data.success) {
      setMensaje("Cita Eliminada Correctamente");
      window.location.reload();
    } else {
      setMensaje("No se pudo eliminar la cita");
    }
  } catch (error) {
    manejarError(error, setMensaje);
  }
}
