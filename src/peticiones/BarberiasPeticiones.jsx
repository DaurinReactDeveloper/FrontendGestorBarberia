import axios from "axios";
import { urlBarberia } from "../endpoints/Endpoints";

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
        setTimeout(() => setMensajeBarberia(""), 1000);
    }
  }
  