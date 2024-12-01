import React, { useState } from "react";
import { anadirBarbero } from "../../../peticiones/BarberosPeticiones";
import { loginUser } from "../../../util/firebase/userFireBase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../util/firebase/firebaseConfig";
import { BsPersonAdd } from "react-icons/bs";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import "./../../../css/agregarbarberoadmincelular.css";

export default function AgregarBarberoAdminPc() {
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
    setCargando(true);

    // Autenticación del usuario - FireBase
    const isAuthenticated = await loginUser(
      "dauringonzales7@gmail.com",
      "Daurin16"
    );

    if (isAuthenticated) {
      if (imagen && nombre && telefono && email && contrasena) {
        try {
          const imageRef = ref(storage, `barberos/${nombre}.jpg`);
          await uploadBytes(imageRef, imagen);
          const imageUrl = await getDownloadURL(imageRef);

          // Llamar el método para agregar barberos
          await anadirBarbero(
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
        }
      } else {
        setMensaje("Por favor complete todos los campos.");
      }
    } else {
      console.log("No se pudo autenticar al usuario.");
      setMensaje("Autenticación fallida.");
    }

    setCargando(false);
  }

  return (
    <>
      <section>
        <TituloGenericos
          titulo={"AGREGAR BARBERO"}
          icono={BsPersonAdd}
          clase="name-cita-pc"
          clase2="h1-pc-white"
        />

        <br />

        <section className="section-agregar-barbero-form-pc">
          <form onSubmit={PeticionBarbero}>
            <article className="article-div-inputs-agregar-barbero-form-pc">
              <div className="div-imagen-telefono-contrasena-agregar-barbero-form-pc">
                <label>
                  <p className="p-label-agregar-barbero-admin-pc">
                    Imagen Barbero
                  </p>
                  
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={extraerImagen}
                    className="input-agregar-barbero-admin-pc img-input-agregar-barbero-admin-pc"
                    required
                  />
                  
                  {mensajeImagen && (
                    <p className="p-label-agregar-barbero-admin-pc">
                      {mensajeImagen}
                    </p>
                  )}
                </label>

                <label>
                  <p className="p-label-agregar-barbero-admin-pc">Teléfono</p>
                  <input
                    type="text"
                    maxLength={19}
                    minLength={6}
                    onChange={extraerTelefono}
                    placeholder="+1 809 918 0908"
                    className="input-agregar-barbero-admin-pc"
                    required
                  />
                  {mensajeTelefono && (
                    <p className="p-label-agregar-barbero-admin-pc">
                      {mensajeTelefono}
                    </p>
                  )}
                </label>

                <label>
                  <p className="p-label-agregar-barbero-admin-pc">Contraseña</p>
                  <input
                    type="password"
                    maxLength={98}
                    minLength={6}
                    onChange={extraerContrasena}
                    className="input-agregar-barbero-admin-pc"
                    placeholder="Inserte su contraseña"
                    required
                  />
                  {mensajeContrasena && (
                    <p className="p-label-agregar-barbero-admin-pc">
                      {mensajeContrasena}
                    </p>
                  )}
                </label>
              </div>

              <div className="div-nombre-email-agregar-barbero-form-pc">
                <label>
                  <p className="p-label-agregar-barbero-admin-pc">Nombre</p>
                  <input
                    type="text"
                    maxLength={28}
                    minLength={6}
                    onChange={extraerNombre}
                    className="input-agregar-barbero-admin-pc"
                    placeholder="Inserte su nombre"
                    required
                  />
                  {mensajeNombre && (
                    <p className="p-label-agregar-barbero-admin-pc">
                      {mensajeNombre}
                    </p>
                  )}
                </label>

                <label>
                  <p className="p-label-agregar-barbero-admin-pc">Email</p>
                  <input
                    type="email"
                    maxLength={48}
                    minLength={6}
                    onChange={extraerEmail}
                    className="input-agregar-barbero-admin-pc"
                    placeholder="dauringonzales6@gmail.com"
                    required
                  />
                  {mensajeEmail && (
                    <p className="p-label-agregar-barbero-admin-pc">
                      {mensajeEmail}
                    </p>
                  )}
                </label>
              </div>
            </article>

            <div>
              {mensaje && (
                <p className="p-mensaje-agregar-barbero-admin-pc">{mensaje}</p>
              )}
            </div>

            <div className="div-button-agregar-barbero-pc">
              <button type="submit" className="button-agregar-barbero-pc" disabled={cargando}>
                {cargando ? "Agregando..." : "Agregar Barbero"}
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
}
