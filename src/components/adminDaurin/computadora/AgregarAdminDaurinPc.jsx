import React, { useState } from "react";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { FaUserSecret } from "react-icons/fa6";
import { CgAdd } from "react-icons/cg";
import { anadirAdmin } from "../../../peticiones/AdminPeticiones";
import "./../../../css/agregaradmin.css"; // Usa el mismo que el celular - MediaQuery PC

export default function AgregarAdminDaurinPc() {
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
    <br />
      <TituloGenericos
        titulo={"AGREGAR ADMINS"}
        icono={FaUserSecret}
        clase="name-cita-pc"
        clase2="h1-pc-white"
        claseInformacion="section-principal-titulo-pc"
      />

      <section>
        <form className="form-agregar-admin-pc" onSubmit={llamarAddAdmin}>
          <article className="article-agregar-admin-pc">
            {/* INPUTS */}
            <article className="article-inputs-admin-pc">
              <div>
                <label>
                  <p className="p-label-agregar-admin-pc">Nombre</p>
                  <input
                    type="text"
                    placeholder="Ingrese el nombre del administrador"
                    className="input-agregar-admin-pc"
                    value={nombre}
                    onChange={obtenerNombre}
                    minLength={5}
                    maxLength={28}
                    required
                  />
                  {nombreMensaje && <p className="p-mensaje-agregar-admin-pc">{nombreMensaje}</p>}
                </label>
              </div>

              <div>
                <label>
                  <p className="p-label-agregar-admin-pc">Email</p>
                  <input
                    type="email"
                    placeholder="admin@gmail.com"
                    className="input-agregar-admin-pc"
                    value={email}
                    onChange={obtenerEmail}
                    minLength={5}
                    maxLength={48}
                    required
                  />
                  {emailMensaje && <p className="p-mensaje-agregar-admin-pc">{emailMensaje}</p>}
                </label>
              </div>

              <div>
                <label>
                  <p className="p-label-agregar-admin-pc">Telefono</p>
                  <input
                    type="text"
                    placeholder="8099187905"
                    className="input-agregar-admin-pc"
                    value={telefono}
                    onChange={obtenerTelefono}
                    minLength={5}
                    maxLength={19}
                    required
                  />
                  {telefonoMensaje && <p className="p-mensaje-agregar-admin-pc">{telefonoMensaje}</p>}
                </label>
              </div>

              <div>
                <label>
                  <p className="p-label-agregar-admin-pc">Contraseña</p>
                  <input
                    type="password"
                    placeholder="Ingrese su contraseña"
                    className="input-agregar-admin-pc"
                    value={password}
                    onChange={obtenerPassword}
                    minLength={5}
                    maxLength={9}
                    required
                  />
                  {passwordMensaje && <p className="p-mensaje-agregar-admin-pc">{passwordMensaje}</p>}
                </label>
              </div>

              {mensaje && <p className="p-mensaje-agregar-admin-pc">{mensaje}</p>}

              {/* BOTON */}
              <article className="article-boton-agrega-admin-pc">
                <button type="submit" className="boton-agregar-admin-pc" disabled={cargando}>
                  <CgAdd />
                  {cargando ? "Guardando..." : "Agregar"}
                </button>
              </article>
            </article>

            {/* IMAGEN */}
            <article className="article-img-admin-pc">
              <img
                src="/ImagenAdminAddPC.webp"
                alt=""
                className="img-fluid img-agregar-admin-pc"
              />
            </article>
          </article>
        </form>
      </section>
    </>
  );
}
