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
    const { data } = await axios.get(`${urlCliente}/GetClientes`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      if (data.data.length > 0) {
        setCliente(data.data);
      } else {
        setMensaje("No hay clientes");
      }
    } else {
      setCitas([]);
      setMensaje("No se pudieron obtener los clientes");
    }
  } catch (error) {
    console.log("Ha ocurrido un error" + error);
  }
}
