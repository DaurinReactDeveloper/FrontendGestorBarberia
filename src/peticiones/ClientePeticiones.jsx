import axios from "axios";
import { urlCliente } from "../endpoints/Endpoints";
import { obtenerCredenciales } from "./CitasPeticiones";

//Admin Daurin
export async function obtenerClientes(setCliente, setMensaje) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debes Registrase.");
    return;
  }

  try {
    const peticion = await axios.get(`${urlCliente}/GetClientes`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      if (peticion.data.data.length > 0) {
        setCliente(peticion.data.data);
      } else {
        setMensaje("No hay clientes");
      }
    } else {
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 1000);
    }
  } catch (error) {
    setMensaje("Ha ocurrido un error obteniendo el cliente" + error);
    setTimeout(() => setMensaje(""), 1000);
  }
}

export async function obtenerClientesId(id, setCliente, setMensaje) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse.");
    return;
  }

  try {
    const peticion = await axios.get(`${urlCliente}/ClienteById/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
        setCliente(peticion.data.data);
      } else {
        setMensaje(peticion.data.message);
        setTimeout(() => setMensaje(""), 1000);
      }
  } catch (error) {
    setMensaje("Ha ocurrido un error obteniendo el cliente" + error);
    setTimeout(() => setMensaje(""), 1000);
  }
}

//Admin Normal
export async function obtenerClientesByAdminId(setCliente, setMensaje) {
  const { id, token } = obtenerCredenciales();

  //IDADMIN
  if (!token) {
    setMensaje("Debe Registrarse.");
    return;
  }

  try {
    const peticion = await axios.get(`${urlCliente}/ClienteByBarberiaId/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
        setCliente(peticion.data.data);
      } else {
        setMensaje(peticion.data.message);
        setTimeout(() => setMensaje(""), 1000);
      }
  } catch (error) {
    setMensaje("Ha ocurrido un error obteniendo los clientes" + error);
    setTimeout(() => setMensaje(""), 1000);
  }
}

//Eliminar un Barbero
export async function eliminarCliente(idCliente,setMensajeCliente) {
  const { id, token } = obtenerCredenciales();

  if (!token) {
    setMensajeCliente("Debe Registrarse.");
    return;
  }


  const DeleteClienteDto = {
    clienteId: idCliente,
    barberiaId: 0,
    changeDate: new Date(),
    changeUser: id,
  };

  try {
    const peticion = await axios.delete(`${urlCliente}/DeleteByAdmin/${idCliente}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: DeleteClienteDto,
    });

    if (peticion.data.success) {
      setMensajeCliente(peticion.data.message);
      setTimeout(() => {
        setMensajeCliente("");
        window.location.reload();
      }, 1000);
    } else {
      setMensajeCliente(peticion.data.message);
      setTimeout(() => setMensajeCliente(""), 1000);
    }
  } catch (error) {
      setMensajeCliente("Ocurrió un error eliminando el cliente" + error);  
      setTimeout(() => setMensajeCliente(""), 1000);
  }
}

//DEBO CREAR EL METODO PARA ACTUALIZAR UN CLIENTE