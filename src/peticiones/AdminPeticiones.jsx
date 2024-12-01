import axios from "axios";
import { urlAdm } from "../endpoints/Endpoints";
import { ValidacionesAdmin } from "../util/validaciones/ValidacionesRegistros";
import { obtenerCredenciales } from "../peticiones/CitasPeticiones";

// Añadir Admin
export async function anadirAdmin(
  nombre,
  email,
  telefono,
  password,
  setNombreMensaje,
  setEmailMensaje,
  setTelefonoMensaje,
  setPasswordMensaje,
  setMensaje,
  setCargando
) {
  // Iniciar cargando
  setCargando(true);

  // Validación de los campos
  const validacionExitosa = ValidacionesAdmin(
    nombre,
    email,
    telefono,
    password,
    setNombreMensaje,
    setEmailMensaje,
    setTelefonoMensaje,
    setPasswordMensaje
  );

  if (!validacionExitosa) {
    setCargando(false);
    return;
  }

  const { id, token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse.");
    setCargando(false);
    return;
  }

  const adminDto = {
    administradoresId: 0,
    nombre:nombre,
    email:email,
    telefono:telefono,
    tipo: "PropietarioBarberia",
    password:password,
    changeDate: new Date(),
    changeUser: id,
  };

  try {
    const peticion = await axios.post(`${urlAdm}/save`, adminDto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 1000);
    } else {
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 1000);
    }
  } catch (error) {
    setMensaje("Ocurrió un error al agregar al administrador." + error);
    setTimeout(() => setMensaje(""), 1000);
  } finally {
    setCargando(false);
  }
}

//Conseguir Admins
export async function obtenerAdmins(setAdmins, setMensaje) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse.");
    return;
  }

  try {
    const peticion = await axios.get(`${urlAdm}/GetAdministradores`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setAdmins(peticion.data.data);
    } else {
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 1000);
    }
  } catch (error) {
    setMensaje("Ha ocurrido un error obteniendo los administradores " + error);
    setTimeout(() => setMensaje(""), 1000);
  }
}

//Eliminar Admins
export async function eliminarAdmin(idAdmin, setMensajeAdmin) {
  const { id, token } = obtenerCredenciales();

  if (!token) {
    setMensajeBarbero("Debe Registrarse.");
    return;
  }

  const DeleteAdminDto = {
    administradoresId: idAdmin,
    nombre: "",
    telefono: "",
    email: "",
    password: "",
    tipo: "",
    changeDate: new Date(),
    changeUser: id,
  };

  try {
    const peticion = await axios.delete(`${urlAdm}/Delete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: DeleteAdminDto,
    });

    if (peticion.data.success) {
      setMensajeAdmin(peticion.data.message);
      setTimeout(() => {
        setMensajeAdmin("");
        window.location.reload();
      }, 1000);
    } else {
      setMensajeAdmin(peticion.data.message);
      setTimeout(() => setMensajeAdmin(""), 1000);
    }
  } catch (error) {
    setMensajeAdmin("Ocurrió un error eliminando el administrador " + error);
    setTimeout(() => setMensajeAdmin(""), 1000);
  }
}

//Actualizar Admins
export async function actualizarAdmin(
  adminId,
  nombre,
  email,
  telefono,
  password,
  setNombreMensaje,
  setEmailMensaje,
  setTelefonoMensaje,
  setPasswordMensaje,
  setMensaje,
  setCargando
) {
  // Iniciar cargando
  setCargando(true);

  // Validación de los campos
  const validacionExitosa = ValidacionesAdmin(
    nombre,
    email,
    telefono,
    password,
    setNombreMensaje,
    setEmailMensaje,
    setTelefonoMensaje,
    setPasswordMensaje
  );

  if (!validacionExitosa) {
    setCargando(false);
    return;
  }

  const { id, token } = obtenerCredenciales();
  
  if (!token) {
    setMensaje("Debe Registrarse.");
    setCargando(false);
    return;
  }

  const adminUpdateDto = {
    administradoresId: adminId,
    nombre: nombre,
    email: email,
    telefono: telefono,
    tipo: "PropietarioBarberia",
    password: password,
    changeDate: new Date(),
    changeUser: id,
  };

  try {
    const peticion = await axios.put(`${urlAdm}/Update`, adminUpdateDto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setMensaje(peticion.data.message);
      setTimeout(() => {
        setMensaje("");
        window.location.reload();
      }, 1300);
    } else {
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 1000);
    }
  } catch (error) {
    setMensaje("Ocurrió un error al actualizar el administrador." + error);
    setTimeout(() => setMensaje(""), 1000);
  } finally {
    setCargando(false);
  }
}
