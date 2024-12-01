import React, { useState } from "react";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { FaUserSecret } from "react-icons/fa6";
import { CgAdd } from "react-icons/cg";
import { anadirAdmin } from "../../../peticiones/AdminPeticiones";
import "./../../../css/agregaradmin.css";

export default function AgregarAdminDaurin() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");

  // Mensajes
  const [nombreMensaje, setNombreMensaje] = useState("");
  const [emailMensaje, setEmailMensaje] = useState("");
  const [telefonoMensaje, setTelefonoMensaje] = useState("");
  const [passwordMensaje, setPasswordMensaje] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Estado de carga
  const [cargando, setCargando] = useState(false);

  // Funciones para obtener valores de los inputs
  function obtenerNombre(e) {
    setNombre(e.target.value);
  }

  function obtenerEmail(e) {
    setEmail(e.target.value);
  }

  function obtenerTelefono(e) {
    setTelefono(e.target.value);
  }

  function obtenerPassword(e) {
    setPassword(e.target.value);
  }

  // Función para llamar a anadirAdmin
  function llamarAddAdmin(e) {
    e.preventDefault();
    setMensaje("");
    setCargando(true);

    anadirAdmin(
      nombre,
      email,
      telefono,
      password,
      setNombreMensaje,
      setEmailMensaje,
      setTelefonoMensaje,
      setPasswordMensaje,
      setMensaje,
      setCargando
    );

    setCargando(false);
  }

  return (
    <>
      <TituloGenericos titulo={"AGREGAR ADMINS"} icono={FaUserSecret} />

      <section>
        <form className="form-agregar-admin" onSubmit={llamarAddAdmin}>
          <article>
            <div>
              <label className="label-agregar-admin">
                <p className="p-label-agregar-admin">Nombre</p>
                <input
                  type="text"
                  className="input-agregar-admin"
                  placeholder="Ingrese el nombre del administrador"
                  value={nombre}
                  onChange={obtenerNombre}
                  minLength={5}
                  maxLength={28}
                  required
                />
                {nombreMensaje && (
                  <p className="p-mensaje-agregar-admin">{nombreMensaje}</p>
                )}
              </label>

              <label className="label-agregar-admin">
                <p className="p-label-agregar-admin">Email</p>
                <input
                  type="email"
                  className="input-agregar-admin"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={obtenerEmail}
                  minLength={5}
                  maxLength={48}
                  required
                />
                {emailMensaje && (
                  <p className="p-mensaje-agregar-admin">{emailMensaje}</p>
                )}
              </label>
            </div>

            <div>
              <label className="label-agregar-admin">
                <p className="p-label-agregar-admin">Telefono</p>
                <input
                  type="text"
                  className="input-agregar-admin"
                  placeholder="8099187905"
                  value={telefono}
                  onChange={obtenerTelefono}
                  minLength={5}
                  maxLength={19}
                  required
                />
                {telefonoMensaje && (
                  <p className="p-mensaje-agregar-admin">{telefonoMensaje}</p>
                )}
              </label>

              <label className="label-agregar-admin">
                <p className="p-label-agregar-admin">Contraseña</p>
                <input
                  type="password"
                  className="input-agregar-admin"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={obtenerPassword}
                  minLength={5}
                  maxLength={9}
                  required
                />
                {passwordMensaje && (
                  <p className="p-mensaje-agregar-admin">{passwordMensaje}</p>
                )}
              </label>
            </div>
          </article>
          <br />
          {mensaje && (
            <p className="p-mensaje-agregar-admin-general">{mensaje}</p>
          )}
     
          <article className="article-agregar-admin-button">
            <button
              type="submit"
              className="button-agregar-admin"
              disabled={cargando}
            >
              <CgAdd />
              {cargando ? "Cargando..." : "Agregar"}
            </button>
          </article>
        </form>
      </section>
    </>
  );
}
