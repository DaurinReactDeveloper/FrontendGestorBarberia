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
    setImgMensaje("Debe completar este campo");
    esValido = false;
  } else {
    setImgMensaje(null);
  }

  // Validar nombre
  if (nombre.trim() === "") {
    setNombreMensaje("Debe completar este campo");
    esValido = false;
  } else {
    setNombreMensaje(null);
  }

  // Validar teléfono
  const regexTelefono = /^\d+$/; // Asumiendo un formato de teléfono de 10 dígitos -
  if (!regexTelefono.test(telefono)) {
    setTelefonoMensaje("Debe ingresar un número de teléfono válido");
    esValido = false;
  } else {
    setTelefonoMensaje(null);
  }

  // Validar email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular simple para validar emails
  if (!regexEmail.test(email)) {
    setEmailMensaje("Debe ingresar un email válido");
    esValido = false;
  } else {
    setEmailMensaje(null);
  }

  // Validar contraseña
  if (contrasena.length < 6) {
    // Ejemplo: contraseña debe tener al menos 6 caracteres
    setContrasenaMensaje("La contraseña debe tener al menos 6 caracteres");
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
    setMensajeNombre("El Nombre debe tener más de 5 caracteres");
    esValido = false;
  } else if (nombre.length > 29) {
    setMensajeNombre("El Nombre debe tener menos de 30 caracteres");
    esValido = false;
  } else {
    setMensajeNombre("");
  }

  // Validaciones de la contraseña
  if (contrasena.length < 6) {
    setMensajeContrasena("La Contraseña debe tener más de 5 caracteres");
    esValido = false;
  } else if (contrasena.length > 29) {
    setMensajeContrasena("La Contraseña debe tener menos de 30 caracteres");
    esValido = false;
  } else {
    setMensajeContrasena("");
  }

  return esValido;
}

export function ValidacionesAgregarCitas(
  fecha,
  barbero,
  estilo,
  hora,
  setMensajeFecha,
  setMensajeHora,
  setMensajeBarbero,
  setMensajeEstilo
) {
  let esValido = true;

  // Validación de la fecha
  if (fecha === "") {
    setMensajeFecha("Debe seleccionar la Fecha");
    esValido = false;

    setTimeout(() => {
      setMensajeFecha("");
    }, 1000);
  } else {
    setMensajeFecha("");
  }

  // Validación de la hora
  if (hora === "") {
    setMensajeHora("Debe seleccionar la Hora");
    esValido = false;

    setTimeout(() => {
      setMensajeHora("");
    }, 1000);
  } else {
    setMensajeHora("");
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
    setMensajeNombre("Debe completar este campo");
    esValido = false;

    setTimeout(() => {
      setMensajeNombre("");
    }, 1000);
  } else {
    setMensajeNombre("");
  }

  // Validación de la Descripcion
  if (descripcion === "") {
    setMensajeDescripcion("Debe completar este campo");
    esValido = false;

    setTimeout(() => {
      setMensajeDescripcion("");
    }, 1000);
  } else {
    setMensajeDescripcion("");
  }

  // Validación del barbero
  if (precio === "") {
    setMensajePrecio("Debe completar este campo");
    esValido = false;
    setTimeout(() => {
      setMensajePrecio("");
    }, 1000);
  } else {
    setMensajePrecio("");
  }

  //Validación del estilo
  if (imagen === "") {
    setMensajeImagen("Debe completar este campo");
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
    setMensajeNombre("Debe completar este campo");
    esValido = false;

    setTimeout(() => {
      setMensajeNombre("");
    }, 1000);
  } else {
    setMensajeNombre("");
  }

  // Validación del telefono
  if (telefono === "") {
    setMensajeTelefono("Debe completar este campo");
    esValido = false;

    setTimeout(() => {
      setMensajeTelefono("");
    }, 1000);
  } else {
    setMensajeTelefono("");
  }

  // Validación del email
  if (email === "") {
    setMensajeEmail("Debe completar este campo");
    esValido = false;
    setTimeout(() => {
      setMensajeEmail("");
    }, 1000);
  } else {
    setMensajeEmail("");
  }

  //Validación de la imagen
  if (imgbarbero === "") {
    setMensajeImagen("Debe completar este campo");
    esValido = false;
    setTimeout(() => {
      setMensajeImagen("");
    }, 1000);
  } else {
    setMensajeImagen("");
  }

  //Validación del Password
  if (password === "") {
    setMensajePassword("Debe completar este campo");
    esValido = false;
    setTimeout(() => {
      setMensajePassword("");
    }, 1000);
  } else {
    setMensajePassword("");
  }

  return esValido;
}
