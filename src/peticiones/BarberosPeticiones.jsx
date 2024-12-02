import axios from "axios";
import { urlBarbero } from "../endpoints/Endpoints";
import { ValidacionesRegistroBarbero } from "../util/validaciones/ValidacionesRegistros";
import { obtenerCredenciales } from "./CitasPeticiones";

// Obtener lista de barberos - Apartado de busquedad y para agregar citas.
export async function obtenerBarberosByBarberiaIdCliente(setBarberos) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse.");
    return;
  }

  const id = localStorage.getItem("barberiaId");

  try {
    const peticion = await axios.get(
      `${urlBarbero}/BarberosByClienteBarberiaId/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (peticion.data.success) {
      setBarberos(peticion.data.data);
    }
  } catch (error) {
    console.error("Error al obtener los barberos:", error);
  }
}

//Obtener Barbero por el ClienteBarberiaId
export async function obtenerBarberosByClienteBarberiaId(setBarberos, setRespuesta) {
  const { token } = obtenerCredenciales();

  const id = localStorage.getItem("barberiaId");

  if (!token) {
    setMensaje("Debe Registrarse.");
    return;
  }

  try {
    const peticion = await axios.get(
      `${urlBarbero}/BarberosByClienteBarberiaId/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (peticion.data.success) {
      setBarberos(peticion.data.data);
    } else {
      setRespuesta(peticion.data.message);
    }
  } catch (error) {
    console.error("Ha ocurrido un error: " + error);
  }
}

//Obtener Barberos de su Barberia - Admin
export async function obtenerBarberosByBarberiaId(setBarberos, setRespuesta) {
  const { id, token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe estar Registrado.");
    return;
  }

  try {
    const peticion = await axios.get(
      `${urlBarbero}/BarberosByBarberiaId/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (peticion.data.success) {
      setBarberos(peticion.data.data);
    } else {
      setRespuesta(peticion.data.message);
      setTimeout(() => setRespuesta(""), 1000);
    }
  } catch (error) {
    console.error("Ha ocurrido un error: " + error);
  }
}

//Obtener Barbero por su Id
export async function obtenerBarberoId(setBarberos, setRespuesta, id) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse.");
    return;
  }

  try {
    const peticion = await axios.get(`${urlBarbero}/BarberoById/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setBarberos(peticion.data.data);
    } else {
      setRespuesta(peticion.data.message);
    }
  } catch (error) {
    console.error("Ha ocurrido un error: " + error);
  }
}

//Obtener Barbero por el Admin Id
export async function obtenerBarberosByAdminId(setBarberos, setRespuesta) {
  const { token } = obtenerCredenciales();

  const id = localStorage.getItem("id");

  if (!token) {
    setMensaje("Debe Registrarse.");
    return;
  }

  try {
    const peticion = await axios.get(
      `${urlBarbero}/BarberosByBarberiaId/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (peticion.data.success) {
      setBarberos(peticion.data.data);
    } else {
      setRespuesta(peticion.data.message);
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
    setMensaje("Debe Registrarse.");
    return;
  }

  const barberoDto = {
    barberoId: 0,
    barberiaId: id,
    nombre: nombre,
    telefono: telefono,
    email: email,
    password: password,
    imgbarbero: imgbarbero,
    changeDate: new Date(),
    changeUser: id,
  };

  try {
    const peticion = await axios.post(`${urlBarbero}/save`, barberoDto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setMensaje("Barbero Agregado Correctamente");
      setTimeout(() => {
        setMensaje("");
        window.location.reload();
      }, 1500);
    } else {
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 1000);
    }
  } catch (error) {
    console.log("Ha ocurrido un error" + error);
  }
}

//Eliminar un Barbero
export async function eliminarBarbero(idBarbero, setMensajeBarbero) {
  const { id, token } = obtenerCredenciales();

  if (!token) {
    setMensajeBarbero("Debe Registrarse");
    return;
  }

  const DeleteBarberoDto = {
    barberoId: idBarbero,
    barberiaId: 0,
    creationDate: "",
    creationUser: id
  };

  try {
    const peticion = await axios.delete(
      `${urlBarbero}/DeleteByAdmin/${idBarbero}/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        data: DeleteBarberoDto,
      }
    );

    if (peticion.data.success) {
      setMensajeBarbero(peticion.data.message);
      setTimeout(() => {
        setMensajeBarbero("");
        window.location.reload();
      }, 1000);
    } else {
      setMensajeBarbero(peticion.data.message);
      setTimeout(() => setMensajeBarbero(""), 1000);
    }
  } catch (error) {
    setMensajeBarbero("Ocurrió un error eliminando la citas del barbero" + error);
  }
}

//DEBO CREAR EL METODO DE ACTUALIZAR BARBERO