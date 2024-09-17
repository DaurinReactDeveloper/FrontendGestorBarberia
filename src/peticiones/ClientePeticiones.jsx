import axios from "axios";
import { urlCliente } from "../endpoints/Endpoints";
import { obtenerCredenciales } from "./CitasPeticiones";

export async function obtenerClientes(setCliente, setMensaje) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debes estar registrado para poder ver los clientes");
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
    }
  } catch (error) {
    console.log("Ha ocurrido un error" + error);
  }
}

export async function obtenerClientesId(id, setCliente, setMensaje) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debes estar registrado para poder ver el cliente");
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
      }
  } catch (error) {
    console.log("Ha ocurrido un error" + error);
  }
}

