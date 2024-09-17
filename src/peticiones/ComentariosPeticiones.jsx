import axios from "axios";
import { urlComentarios } from "../endpoints/Endpoints";
import { obtenerCredenciales } from "./CitasPeticiones";
import {
  ValidacionesAddComentario,
  ValidacionesUpdateComentario,
} from "../util/validaciones/ValidacionesRegistros";

//Obtener Comentario del Barbero
export async function obtenerComentariosBarbero(
  setComentarios,
  setMensaje,
  id
) {
  try {
    const peticion = await axios.get(
      `${urlComentarios}/GetComentariosBarbero/${id}`
    );

    if (peticion.data.success) {
      setComentarios(peticion.data.data);
    } else {
      setMensaje(peticion.data.message);
    }
  } catch (error) {
    const mensajeError =
      error.response?.data.message || "Ocurrió un error obteniendo las citas.";
    setMensaje(mensajeError);
  }
}

//Obtener Comentario del Cliente
export async function obtenerComentariosClientes(
  setComentarios,
  setMensaje,
  id
) {
  try {
    const peticion = await axios.get(
      `${urlComentarios}/GetComentariosCliente/${id}`
    );

    if (peticion.data.success) {
      setComentarios(peticion.data.data);
    } else {
      setMensaje(peticion.data.message);
    }
  } catch (error) {
    const mensajeError =
      error.response?.data.message || "Ocurrió un error obteniendo las citas.";
    setMensaje(mensajeError);
  }
}

//Agregar un Comentario
export async function anadirComentario(
  id,
  idCita,
  idCliente,
  idCorte,
  idBarbero,
  calificacion,
  comentario,
  setMensaje,
  setMensajeCalificacion,
  setMensajeComentario,
  setMensajeId,
  setMensajeCitaId
) {
  if (
    !ValidacionesAddComentario(
      id, //id del cliente registrado
      idCita,
      idCliente,
      calificacion,
      comentario,
      setMensajeCalificacion,
      setMensajeComentario,
      setMensajeId,
      setMensajeCitaId
    )
  ) {
    return;
  }

  const { token } = obtenerCredenciales();

  if (!token || !id) {
    setMensaje("Debe estar Registrado.");
    return;
  }

  const comentarioDto = {
    idComentarios: 0,
    idCita: idCita,
    idCliente: id,
    idCorte: idCorte,
    idBarbero: idBarbero,
    calificacion: calificacion,
    comentario: comentario,
  };

  try {
    const peticion = await axios.post(`${urlComentarios}/save`, comentarioDto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setMensaje(peticion.data.message);


      setTimeout(() => {
        setMensaje("");
      }, 2000);
    } else {
      setMensaje("Error: " + peticion.data.message);
      setTimeout(() => {
        setMensaje("");
      }, 2000);
    }
  } catch (error) {
    const mensajeError =
      error.response?.data.message || "Ocurrió un error al agregar la cita.";
    setMensaje(mensajeError);

    setTimeout(() => {
      setMensaje("");
    }, 2000);
  }
}

//Actualizar
export async function actualizarComentario(
  id,
  calificacion,
  comentario,
  setMensaje,
  setMensajeCalificacion,
  setMensajeComentario
) {
  if (
    !ValidacionesUpdateComentario(
      calificacion,
      comentario,
      setMensajeCalificacion,
      setMensajeComentario
    )
  ) {
    return;
  }

  const { token } = obtenerCredenciales();

  if (!token || !id) {
    setMensaje("Debe estar Registrado.");
    return;
  }

  const comentarioDto = {
    idComentarios: id,
    idCita: 0,
    idCliente: 0,
    idCorte: 0,
    idBarbero: 0,
    calificacion: calificacion,
    comentario: comentario,
  };

  try {
    const peticion = await axios.put(
      `${urlComentarios}/update`,
      comentarioDto,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (peticion.data.success) {
      setMensaje(peticion.data.message);

      setTimeout(() => {
        setMensaje("");
      }, 2000);

      window.location.reload();
    } else {
      setMensaje("Error: " + peticion.data.message);
      setTimeout(() => {
        setMensaje("");
      }, 2000);
    }
  } catch (error) {
    const mensajeError =
      error.response?.data.message || "Ocurrió un error al agregar la cita.";
    setMensaje(mensajeError);

    setTimeout(() => {
      setMensaje("");
    }, 2000);
  }
}

//Eliminar Comentario
export async function EliminarComentario(ClienteId, id, idCita, setMensaje) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse");
    return;
  }

  const DeleteComentario = {
    idComentarios: id,
    idCita: idCita,
    idCliente: ClienteId,
    idCorte: 0,
    idBarbero: 0,
    calificacion: 0,
    comentario: "",
  };

  try {
    const peticion = await axios.delete(`${urlComentarios}/Remove`, {
      headers: { Authorization: `Bearer ${token}` },
      data: DeleteComentario,
    });

    if (peticion.data.success) {
      setMensaje(peticion.data.message);
      window.location.reload();
    } else {
      setMensaje(peticion.data.message);
      setTimeout(() => {
        setMensaje("");
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    const mensajeError =
      error.response?.data.message ||
      "Ocurrió un error eliminando la citas del barbero";
    setMensaje(mensajeError);
  }
}
