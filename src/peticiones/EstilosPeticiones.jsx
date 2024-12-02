import axios from "axios";
import { urlEstilos } from "../endpoints/Endpoints";
import { obtenerCredenciales } from "./CitasPeticiones";
import { ValidacionesRegistroEstilos } from "../util/validaciones/ValidacionesRegistros";

//Agregar estilo
export async function agregarEstilos(
  nombre,
  descripcion,
  precio,
  imagen,
  setMensaje,
  setMensajeNombre,
  setMensajeDescripcion,
  setMensajePrecio,
  setMensajeImagen
) {
  const { id, token } = obtenerCredenciales();

  if (!token || !id) {
    setMensaje("Debe Registrarse.");
    return;
  }
 

    const idUser = localStorage.getItem("id");
    

    //Llamar a la funcion que busque 

  //Validaciones
  if (
    !ValidacionesRegistroEstilos(
      nombre,
      descripcion,
      precio,
      imagen,
      setMensajeNombre,
      setMensajeDescripcion,
      setMensajePrecio,
      setMensajeImagen
    )
  ) {
    return;
  }



  const EstiloDto = {
    estiloId: 0,
    barberiaId: id,
    nombre: nombre,
    descripcion: descripcion,
    precio: precio,
    imgestilo: imagen,
    changeDate: new Date(),
    changeUser: idUser,
  };

  try {
    const peticion = await axios.post(`${urlEstilos}/Save`, EstiloDto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setMensaje("Estilo Agregado Correctamente");
      setTimeout(() => {
        setMensaje("");
        window.location.reload();
      }, 1500);
    } else {
      setMensaje(peticion.data.message);
      setTimeout(() => setMensaje(""), 1000);
    }
  } catch (error) {
    setMensaje("Ha ocurrido un error agregando el estilo: " + error);
    console.log(error);
    setTimeout(() => setMensaje(""), 1000);
  }
}

// Obtener estilos - Admin
export async function obtenerEstilosByAdminId(setData, setRespuesta) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse.");
    return;
  }

  const id = localStorage.getItem("id");

  try {
    const peticion = await axios.get(`${urlEstilos}/EstilosByBarberiaId/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setData(peticion.data.data);
    } else {
      setRespuesta(peticion.data.message);
      setTimeout(() => setRespuesta(""), 1000);
    }
  } catch (error) {
    setRespuesta("Ha ocurrido un error obteniendo el estilo de corte: " + error);
    setTimeout(() => setRespuesta(""), 1000);
  }
}

export async function obtenerEstilosByBarberiaId(setData, setRespuesta) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse.");
    return;
  }

  const id = localStorage.getItem("barberiaId");

  try {
    const peticion = await axios.get(`${urlEstilos}/EstilosByBarberiaId/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setData(peticion.data.data);
    } else {
      setRespuesta(peticion.data.message);
      setTimeout(() => setRespuesta(""), 1000);
    }
  } catch (error) {
    setRespuesta("Ha ocurrido un error obteniendo el estilo: " + error);
    setTimeout(() => setRespuesta(""), 1000);
  }
}

// Obtener estilos - Busqueda NAVBAR
export async function obtenerEstilosByClienteBarberiaId(setData, setRespuesta) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse.");
    return;
  }

  const id = localStorage.getItem("barberiaId");

  try {
    const peticion = await axios.get(`${urlEstilos}/EstilosByClienteBarberiaId/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (peticion.data.success) {
      setData(peticion.data.data);
    } else {
      setRespuesta(peticion.data.message);
      setTimeout(() => setRespuesta(""), 1000);
    }
  } catch (error) {
    setRespuesta("Ha ocurrido un error obteniendo el estilo: " + error);
    setTimeout(() => setRespuesta(""), 1000);
  }
}

// Obtener estilos para cliente
export async function obtenerEstilosAddCita(setEstilos) {
  const { token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse.");
    return;
  }

  const id = localStorage.getItem("barberiaId");

  try {
   
    const peticion = await axios.get(`${urlEstilos}/EstilosByClienteBarberiaId/${id}`,{ 
      headers: {Authorization: `Bearer ${token}`}
    });

    if (peticion.data.success) {
      setEstilos(peticion.data.data);
    }
    else{
      setEstilos(peticion.data.message);
      setTimeout(() => setEstilos(""), 1000);
    }
  } catch (error) {
    setEstilos("Ha ocurrido un error obteniendo los estilos:", error);
    setTimeout(() => setEstilos(""), 1000);
  }
}

//Eliminar Estilo Admin
export async function EliminarEstiloByBarberiaId(idEstilo,setMensajeCortes) {
  const { id, token } = obtenerCredenciales();

  if (!token) {
    setMensaje("Debe Registrarse.");
    return;
  }

  const DeleteEstilosDto = {
    estiloId: idEstilo,
    barberiaId: 0,
    changeDate: new Date(),
    changeUser: id,
  };

  try {
    const peticion = await axios.delete(`${urlEstilos}/DeleteByAdmin/${idEstilo}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: DeleteEstilosDto,
    });

    if (peticion.data.success) {
      setMensajeCortes(peticion.data.message);
      setTimeout(() => {
        setMensajeCortes("");
        window.location.reload();
      }, 1000);
    } else {
      setMensajeCortes(peticion.data.message);
      setTimeout(() => setMensajeCortes(""), 1000);
    }
  } catch (error) {
      setMensajeCortes("Ocurrió un error eliminando el estilo.");   
      setTimeout(() => setMensajeCortes(""), 1000); 
  }
}

//Debo crear el metodo para actualizar un estilo