export function ValidacionesRegistro(
  img,
  nombre,
  telefono,
  email,
  contrasena,
  setImgMensaje,
  setNombreMensaje,
  setTelefonoMensaje,
  setEmailMensaje,
  setContrasenaMensaje
) {
  let esValido = true;

  // Validar imagen
  if (!img) {
    setImgMensaje("Debe completar este campo.");
    esValido = false;
  } else {
    setImgMensaje(null);
  }

  // Validar nombre
  if (nombre.trim() === "") {
    setNombreMensaje("Debe completar este campo.");
    esValido = false;
  } else {
    setNombreMensaje(null);
  }

  // Validar teléfono
  const regexTelefono = /^\d+$/; // Asumiendo un formato de teléfono de 10 dígitos -
  if (!regexTelefono.test(telefono)) {
    setTelefonoMensaje("Debe ingresar un número de teléfono válido.");
    esValido = false;
  } else {
    setTelefonoMensaje(null);
  }

  // Validar email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular simple para validar emails
  if (!regexEmail.test(email)) {
    setEmailMensaje("Debe ingresar un email válido.");
    esValido = false;
  } else {
    setEmailMensaje(null);
  }

  // Validar contraseña
  if (contrasena.length < 6) {
    // Ejemplo: contraseña debe tener al menos 6 caracteres
    setContrasenaMensaje("La contraseña debe tener al menos 6 caracteres.");
    esValido = false;
  } else {
    setContrasenaMensaje(null);
  }

  return esValido;
}

export function ValidacionesIniciarSesion(
  nombre,
  contrasena,
  setMensajeNombre,
  setMensajeContrasena
) {
  let esValido = true;

  // Validaciones del Nombre
  if (nombre.length < 6) {
    setMensajeNombre("El Nombre debe tener más de 5 caracteres.");
    esValido = false;
  } else if (nombre.length > 29) {
    setMensajeNombre("El Nombre debe tener menos de 30 caracteres.");
    esValido = false;
  } else {
    setMensajeNombre("");
  }

  // Validaciones de la contraseña
  if (contrasena.length < 6) {
    setMensajeContrasena("La Contraseña debe tener más de 5 caracteres.");
    esValido = false;
  } else if (contrasena.length > 29) {
    setMensajeContrasena("La Contraseña debe tener menos de 30 caracteres.");
    esValido = false;
  } else {
    setMensajeContrasena("");
  }

  return esValido;
}

export function ValidacionesAgregarCitas(
  fecha,
  hora,
  barbero,
  estilo,
  setMensajeFecha,
  setMensajeHora,
  setMensajeBarbero,
  setMensajeEstilo
) {
  let esValido = true;

  // Validación de la fecha
  if (fecha === "") {
    setMensajeFecha("Debe seleccionar la Fecha.");
    esValido = false;

    setTimeout(() => {
      setMensajeFecha("");
    }, 1000);
  } else {
    const fechaSeleccionada = new Date(fecha);
    const fechaActual = new Date();

    // Ajustar las horas a 00:00 para comparar solo la fecha
    fechaActual.setHours(0, 0, 0, 0);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < fechaActual) {
      setMensajeFecha("Debe seleccionar una fecha posterior.");
      esValido = false;

      setTimeout(() => {
        setMensajeFecha("");
      }, 1000);
    } else {
      setMensajeFecha("");
    }
  }

  // Validación de la hora
  if (hora === "") {
    setMensajeHora("Debe seleccionar la Hora");
    esValido = false;
    setTimeout(() => setMensajeHora(""), 1000);
  } else {
    const [horaSeleccionada, minutoSeleccionado] = hora.split(":").map(Number);
    const horaMinima = 9;
    const horaMaxima = 18;

    if (horaSeleccionada < horaMinima || horaSeleccionada >= horaMaxima) {
      setMensajeHora("Debe seleccionar una hora entre 09:00 y 18:00");
      esValido = false;
      setTimeout(() => setMensajeHora(""), 1000);
    } else {
      setMensajeHora("");
    }
  }

  // Validación del barbero
  if (barbero === "") {
    setMensajeBarbero("Debe seleccionar un Barbero");
    esValido = false;
    setTimeout(() => {
      setMensajeBarbero("");
    }, 1000);
  } else {
    setMensajeBarbero("");
  }

  //Validación del estilo
  if (estilo === "") {
    setMensajeEstilo("Debe seleccionar un Estilo");
    esValido = false;
    setTimeout(() => {
      setMensajeEstilo("");
    }, 1000);
  } else {
    setMensajeEstilo("");
  }

  return esValido;
}

export function ValidacionesRegistroEstilos(
  nombre,
  descripcion,
  precio,
  imagen,
  setMensajeNombre,
  setMensajeDescripcion,
  setMensajePrecio,
  setMensajeImagen
) {
  let esValido = true;

  // Validación de la nombre
  if (nombre === "") {
    setMensajeNombre("Debe completar este campo.");
    esValido = false;

    setTimeout(() => {
      setMensajeNombre("");
    }, 1000);
  } else {
    setMensajeNombre("");
  }

  // Validación de la Descripcion
  if (descripcion === "") {
    setMensajeDescripcion("Debe completar este campo.");
    esValido = false;

    setTimeout(() => {
      setMensajeDescripcion("");
    }, 1000);
  } else {
    setMensajeDescripcion("");
  }

  // Validación del barbero
  if (precio === "") {
    setMensajePrecio("Debe completar este campo.");
    esValido = false;
    setTimeout(() => {
      setMensajePrecio("");
    }, 1000);
  } else {
    setMensajePrecio("");
  }

  //Validación del estilo
  if (imagen === "") {
    setMensajeImagen("Debe completar este campo.");
    esValido = false;
    setTimeout(() => {
      setMensajeImagen("");
    }, 1000);
  } else {
    setMensajeImagen("");
  }

  return esValido;
}

export function ValidacionesRegistroBarbero(
  nombre,
  telefono,
  email,
  imgbarbero,
  password,
  setMensajeNombre,
  setMensajeTelefono,
  setMensajeEmail,
  setMensajeImagen,
  setMensajePassword
) {
  let esValido = true;

  // Validación de la nombre
  if (nombre === "") {
    setMensajeNombre("Debe completar este campo.");
    esValido = false;

    setTimeout(() => {
      setMensajeNombre("");
    }, 1000);
  } else {
    setMensajeNombre("");
  }

  // Validación del telefono
  if (telefono === "") {
    setMensajeTelefono("Debe completar este campo.");
    esValido = false;

    setTimeout(() => {
      setMensajeTelefono("");
    }, 1000);
  } else {
    setMensajeTelefono("");
  }

  // Validación del email
  if (email === "") {
    setMensajeEmail("Debe completar este campo.");
    esValido = false;
    setTimeout(() => {
      setMensajeEmail("");
    }, 1000);
  } else {
    setMensajeEmail("");
  }

  //Validación de la imagen
  if (imgbarbero === "") {
    setMensajeImagen("Debe completar este campo.");
    esValido = false;
    setTimeout(() => {
      setMensajeImagen("");
    }, 1000);
  } else {
    setMensajeImagen("");
  }

  //Validación del Password
  if (password === "") {
    setMensajePassword("Debe completar este campo.");
    esValido = false;
    setTimeout(() => {
      setMensajePassword("");
    }, 1000);
  } else {
    setMensajePassword("");
  }

  return esValido;
}

//Comentario Validaciones
export function ValidacionesAddComentario(
  id,
  idCita,
  idCliente,
  calificacion,
  comentario,
  setMensajeCalificacion,
  setMensajeComentario,
  setMensajeId,
  setMensajeCitaId
) {
  let esValido = true;


//Validación del id
if (idCliente != id) {
  setMensajeId("El servicio que intenta comentar no corresponde a su historial.");
  esValido = false;

  setTimeout(() => {
    setMensajeId("");
  }, 1000);
} else {
  setMensajeId("");
}

  // Validación de la Calificación (debe estar entre 1 y 5)
  if (calificacion < 1 || calificacion > 5) {
    setMensajeCalificacion("Solo se permite un número del 1 al 5.");
    esValido = false;

    setTimeout(() => {
      setMensajeCalificacion("");
    }, 1000);
  } else {
    setMensajeCalificacion("");
  }

    // Validación idCita
    if (idCita <= 0) {
      setMensajeCitaId("No se pudo obtener el id de la cita.");
      esValido = false;
  
      setTimeout(() => {
        setMensajeCitaId("");
      }, 1000);
    } else {
      setMensajeCitaId("");
    }
  

  // Validación del Comentario
  if (!comentario || comentario.trim().length === 0) {
    setMensajeComentario("El comentario es obligatorio");
    esValido = false;

    setTimeout(() => {
      setMensajeComentario("");
    }, 1000);
  } else if (comentario.length >= 44) {
    setMensajeComentario("El comentario debe ser más corto.");
    esValido = false;

    setTimeout(() => {
      setMensajeComentario("");
    }, 1000);
  } else if (comentario.length <= 10) {
    setMensajeComentario("El comentario debe tener al menos 15 caracteres.");
    esValido = false;

    setTimeout(() => {
      setMensajeComentario("");
    }, 1000);
  } else {
    setMensajeComentario("");
  }

  return esValido;
}

export function ValidacionesUpdateComentario(
  calificacion,
  comentario,
  setMensajeCalificacion,
  setMensajeComentario,
) {

  let esValido = true;

  // Validación de la Calificación (debe estar entre 1 y 5)
  if (calificacion < 1 || calificacion > 5) {
    setMensajeCalificacion("Solo se permite un número del 1 al 5.");
    esValido = false;

    setTimeout(() => {
      setMensajeCalificacion("");
    }, 1000);
  } else {
    setMensajeCalificacion("");
  }

  // Validación del Comentario
  if (!comentario || comentario.trim().length === 0) {
    setMensajeComentario("El comentario es obligatorio");
    esValido = false;

    setTimeout(() => {
      setMensajeComentario("");
    }, 1000);
  } else if (comentario.length >= 44) {
    setMensajeComentario("El comentario debe ser más corto.");
    esValido = false;

    setTimeout(() => {
      setMensajeComentario("");
    }, 1000);
  } else if (comentario.length <= 10) {
    setMensajeComentario("El comentario debe tener al menos 15 caracteres.");
    esValido = false;

    setTimeout(() => {
      setMensajeComentario("");
    }, 1000);
  } else {
    setMensajeComentario("");
  }

  return esValido;
}
