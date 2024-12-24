import axios from "axios";
import { urlBarberia } from "../endpoints/Endpoints";
import { obtenerCredenciales } from "./CitasPeticiones";
import {
  ValidacionesActualizarbarberia,
  ValidacionesAgregarbarberia,
} from "../util/validaciones/ValidacionesRegistros";

// Obtener barberias para el registro
export async function obtenerBarberias(setBarberias, setMensajeBarberia) {
  try {
    const peticion = await axios.get(`${urlBarberia}/GetBarberias/`);

    if (peticion.data.success) {
      setBarberias(peticion.data.data);
    } else {
      setMensajeBarberia(peticion.data.message);
      setTimeout(() => setMensajeBarberia(""), 1000);
    }
  } catch (error) {
    setMensajeBarberia("Ocurrió un error obteniendo las barberias" + error);
    console.log("Ocurrió un error obteniendo las barberias" + error);
    setTimeout(() => setMensajeBarberia(""), 1000);
  }
}

// Obtener AgregarBarberia
export async function agregarBarberia(
  nombreBarberia,
  adminId,
  setMensajeBarberia,
  setMensajeNombre,
  setMensajeAdmin
) {
  // validaciones
  if (
    !ValidacionesAgregarbarberia(
      nombreBarberia,
      adminId,
      setMensajeNombre,
      setMensajeAdmin
    )
  ) {
    return;
  }

  //Obtener Credenciales
  const { id, token } = obtenerCredenciales();

  if (!token || !id) {
    setMensajeBarberia("Debe Registrarse.");
    return;
  }

  const barberiaDto = {
    barberiasId: 0,
    NombreBarberia: nombreBarberia,
    Admin: adminId,
    NombreAdministrador: "",
    changeDate: new Date(),
    changeUser: id,
  };

  try {
    const peticion = await axios.post(`${urlBarberia}/save`, barberiaDto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setMensajeBarberia(peticion.data.message);
      setTimeout(() => {
        setMensajeBarberia("");
        window.location.reload();
      }, 3000);
    } else {
      setMensajeBarberia(peticion.data.message);
      setTimeout(() => setMensajeBarberia(""), 3000);
    }
  } catch (error) {
    console.log("Ha ocurrido un error agregando la barberia" + error);
  }
}

//Eliminar Admin
export async function eliminarBarberia(idBarberia, setMensajeBarberia) {
  const { id, token } = obtenerCredenciales();

  if (!token) {
    setMensajeBarberia("Debe Registrarse.");
    return;
  }

  const DeleteBarberia = {
    barberiasId: idBarberia,
    NombreAdministrador: "",
    changeDate: new Date(),
    changeUser: id,
  };

  try {
    const peticion = await axios.delete(`${urlBarberia}/Delete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: DeleteBarberia,
    });

    if (peticion.data.success) {
      setMensajeBarberia(peticion.data.message);
      setTimeout(() => {
        setMensajeBarberia("");
        window.location.reload();
      }, 1000);
    } else {
      setMensajeBarberia(peticion.data.message);
      setTimeout(() => setMensajeBarberia(""), 1000);
    }
  } catch (error) {
    setMensajeBarberia("Ocurrió un error eliminando el administrador " + error);
    setTimeout(() => setMensajeBarberia(""), 1000);
  }
}

//Actualizar Barberia
export async function actualizarBarberia(
  idBarberia,
  nombreBarberia,
  adminId,
  setMensajeBarberia,
  setMensajeNombre,
  setMensajeAdmin,
  navigate
) {
  // validaciones
  if (
    !ValidacionesActualizarbarberia(
      nombreBarberia,
      adminId,
      setMensajeNombre,
      setMensajeAdmin
    )
  ) {
    return;
  }

  //Obtener Credenciales
  const { id, token } = obtenerCredenciales();

  if (!token || !id) {
    setMensajeBarberia("Debe Registrarse.");
    return;
  }

  const barberiaDto = {
    barberiasId: idBarberia,
    NombreBarberia: nombreBarberia,
    Admin: adminId,
    NombreAdministrador: "",
    changeDate: new Date(),
    changeUser: id,
  };

  try {
    const peticion = await axios.put(`${urlBarberia}/update`, barberiaDto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setMensajeBarberia(peticion.data.message);
      setTimeout(() => {
        setMensajeBarberia("");
        navigate("/Daurin");
      }, 3000);
    } else {
      setMensajeBarberia(peticion.data.message);
      setTimeout(() => setMensajeBarberia(""), 3000);
    }
  } catch (error) {
    console.log("Ha ocurrido un error actualizando la barberia" + error);
  }
}
