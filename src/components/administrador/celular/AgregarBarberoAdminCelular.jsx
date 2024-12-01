import React, { useState } from "react";
import { anadirBarbero } from "../../../peticiones/BarberosPeticiones";
import { loginUser } from "../../../util/firebase/userFireBase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../util/firebase/firebaseConfig";
import { BsPersonAdd } from "react-icons/bs";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import "./../../../css/agregarbarberoadmincelular.css";

export default function AgregarBarberoAdminCelular() {
  // Variables
  const [imagen, setImagen] = useState(null);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  // Mensajes
  const [mensajeImagen, setMensajeImagen] = useState("");
  const [mensajeNombre, setMensajeNombre] = useState("");
  const [mensajeTelefono, setMensajeTelefono] = useState("");
  const [mensajeEmail, setMensajeEmail] = useState("");
  const [mensajeContrasena, setMensajeContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Estado de carga
  const [cargando, setCargando] = useState(false);

  // Funciones
  function extraerImagen(e) {
    const nuevaImagen = e.target.files[0];
    setImagen(nuevaImagen);
  }

  function extraerNombre(e) {
    const nuevoNombre = e.target.value;
    setNombre(nuevoNombre);
  }

  function extraerTelefono(e) {
    const nuevoTelefono = e.target.value;
    setTelefono(nuevoTelefono);
  }

  function extraerEmail(e) {
    const nuevoEmail = e.target.value;
    setEmail(nuevoEmail);
  }

  function extraerContrasena(e) {
    const nuevaContrasena = e.target.value;
    setContrasena(nuevaContrasena);
  }

  // Función Peticion Barbero
  async function PeticionBarbero(e) {
    e.preventDefault();
    setCargando(true); // Inicia el estado de carga

    // Autenticación del usuario - FireBase
    const isAuthenticated = await loginUser(
      "dauringonzales7@gmail.com",
      "Daurin16"
    );

    if (isAuthenticated) {
      // si el usuario está bien...
      if (imagen && nombre && telefono && email && contrasena) {
        try {
          const imageRef = ref(storage, `barberos/${nombre}.jpg`);
          await uploadBytes(imageRef, imagen);
          const imageUrl = await getDownloadURL(imageRef);

          // Llamar el método para agregar barberos
          anadirBarbero(
            nombre,
            telefono,
            email,
            contrasena,
            imageUrl,
            setMensajeNombre,
            setMensajeTelefono,
            setMensajeEmail,
            setMensajeImagen,
            setMensajeContrasena,
            setMensaje
          );
        } catch (error) {
          console.log("Ha ocurrido un error guardando el barbero: " + error);
          setMensaje("Error al guardar el barbero.");
        }
      } else {
        setMensaje("Por favor complete todos los campos.");
      }
    } else {
      console.log("No se pudo autenticar al usuario.");
      setMensaje("Autenticación fallida.");
    }

    setCargando(false); // Finaliza el estado de carga
  }

  return (
    <>
      <section>
        <TituloGenericos titulo={"AGREGAR BARBERO"} icono={BsPersonAdd} />

        <br />

        <form onSubmit={PeticionBarbero}>
          {/* DIV - IMAGEN - NOMBRE */}

          <div>
            <label>
              <p className="p-label-agregar-barbero-admin">Imagen Barbero</p>
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                required
                className="input-agregar-barbero-admin img-input-agregar-barbero-admin"
                onChange={extraerImagen}
              />
              {mensajeImagen && <p>{mensajeImagen}</p>}
            </label>

            <label>
              <p className="p-label-agregar-barbero-admin">Nombre</p>
              <input
                type="text"
                maxLength={28}
                minLength={6}
                required
                className="input-agregar-barbero-admin"
                onChange={extraerNombre}
              />
              {mensajeNombre && <p>{mensajeNombre}</p>}
            </label>
          </div>

          {/* DIV - TELEFONO - EMAIL */}
          <div>
            <label>
              <p className="p-label-agregar-barbero-admin">Teléfono</p>
              <input
                type="text"
                maxLength={19}
                minLength={6}
                required
                className="input-agregar-barbero-admin"
                onChange={extraerTelefono}
              />
              {mensajeTelefono && <p>{mensajeTelefono}</p>}
            </label>

            <label>
              <p className="p-label-agregar-barbero-admin">Email</p>
              <input
                type="email"
                maxLength={48}
                minLength={6}
                required
                className="input-agregar-barbero-admin"
                onChange={extraerEmail}
              />
              {mensajeEmail && <p>{mensajeEmail}</p>}
            </label>
          </div>

          {/* DIV - CONTRASEÑA */}
          <div>
            <label>
              <p className="p-label-agregar-barbero-admin">Contraseña</p>
              <input
                type="password"
                maxLength={98}
                minLength={6}
                required
                className="input-agregar-barbero-admin"
                onChange={extraerContrasena}
              />
              {mensajeContrasena && <p>{mensajeContrasena}</p>}
            </label>
          </div>

          {mensaje && <p className="mensaje-agregar-barbero">{mensaje}</p>}

          {/* DIV - BUTTON */}
          <div className="div-boton-submit-agregar-admin">
            <button
              type="submit"
              className="boton-submit-agregar-admin"
              disabled={cargando} // Desactivar el botón mientras carga
            >
              {cargando ? "Agregando..." : "Agregar Barbero"}
            </button>
          </div>
        </form>

      </section>
    </>
  );
}
