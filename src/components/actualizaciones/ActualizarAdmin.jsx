import React, { useState } from "react";
import Navbar from "../../util/navbar/Navbar";
import Footer from "../../util/footer/Footer";
import { MdOutlineUpdate } from "react-icons/md";
import { actualizarAdmin } from "../../peticiones/AdminPeticiones";
import { IoIosSave } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/actualizaradmin.css";

export default function ActualizarAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  //Mensajes
  const [nombreMensaje, setNombreMensaje] = useState("");
  const [emailMensaje, setEmailMensaje] = useState("");
  const [mensajeTelefono, setTelefonoMensaje] = useState("");
  const [passwordMensaje, setPasswordMensaje] = useState("");
  const [mensaje, setMensaje] = useState("");

  //funciones Obtener
  function obtenerNombre(e) {
    const NuevoNombre = e.target.value;
    setNombre(NuevoNombre);
  }

  function obtenerEmail(e) {
    const NuevoEmail = e.target.value;
    setEmail(NuevoEmail);
  }

  function obtenerTelefono(e) {
    const NuevoTelefono = e.target.value;
    setTelefono(NuevoTelefono);
  }

  function obtenerPassword(e) {
    const NuevoPassword = e.target.value;
    setPassword(NuevoPassword);
  }

  function llamarActualizar(e) {
    e.preventDefault();

    setCargando(true);

    actualizarAdmin(
      id,
      nombre,
      email,
      telefono,
      password,
      setNombreMensaje,
      setEmailMensaje,
      setTelefonoMensaje,
      setPasswordMensaje,
      setMensaje,
      navigate
    ).finally(() => setCargando(false));
  }

  return (
    <>
      <Navbar />

      <h1 className="h1-actualizar-admin">
        <MdOutlineUpdate />
        ACTUALIZAR ADMIN
      </h1>

      <br />

      <section className="section-actualizar-admin">
        {/* Imagen */}
        <article className="article-actualizar-admin">
          <img
            src="/ActualizarAdmin.webp"
            alt="ActualizarAdmin"
            className="img-fluid img-actualizar-admin"
          />
        </article>

        <br />

        {/* Google Form */}
        <form className="form-actualizar-admin" onSubmit={llamarActualizar}>
          <div>
            <p className="p-actualizar-admin">Nombre de Usuario</p>
            <input
              type="text"
              className="input-actualizar-admin"
              value={nombre}
              minLength={5}
              maxLength={28}
              onChange={obtenerNombre}
              placeholder="Ingrese el nuevo nombre de usuario"
            />
            <span className="mensaje-error-actualizar-admin">
              {nombreMensaje}
            </span>
          </div>

          <div>
            <p className="p-actualizar-admin">Email</p>
            <input
              type="email"
              className="input-actualizar-admin"
              minLength={5}
              maxLength={48}
              value={email}
              onChange={obtenerEmail}
              placeholder="dauringonzales6@gmail.com"
            />
            <span className="mensaje-error-actualizar-admin">
              {emailMensaje}
            </span>
          </div>

          <div>
            <p className="p-actualizar-admin">Teléfono</p>
            <input
              type="text"
              className="input-actualizar-admin"
              value={telefono}
              minLength={5}
              maxLength={19}
              onChange={obtenerTelefono}
              placeholder="8099901234"
            />
            <span className="mensaje-error-actualizar-admin">
              {mensajeTelefono}
            </span>
          </div>

          <div>
            <p className="p-actualizar-admin">Contraseña</p>
            <input
              type="password"
              value={password}
              minLength={5}
              maxLength={9}
              className="input-actualizar-admin"
              onChange={obtenerPassword}
              placeholder="Ingrese la nueva contraseña"
            />
            <span className="mensaje-error-actualizar-admin">
              {passwordMensaje}
            </span>
          </div>

          {mensaje && <p className="mensaje-actualizar-admin">{mensaje}</p>}

          <div className="div-button-actualizar-admin">
            <button
              className="button-actualizar-admin"
              type="submit"
              disabled={cargando}
            >
              <IoIosSave />
              {cargando ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}
