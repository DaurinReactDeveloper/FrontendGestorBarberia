import React, { useState } from "react";
import Navbar from "../../../util/navbar/Navbar";
import Footer from "../../../util/footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { obtenerUsuario } from "../../../peticiones/AutenticacionPeticiones";
import { urlAdm, urlBarbero, urlCliente } from "../../../endpoints/Endpoints";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import "./../../../css/iniciarsesiongeneral.css";

export default function IniciarSesionGeneral() {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensajeNombre, setMensajeNombre] = useState("");
  const [mensajeContrasena, setMensajeContrasena] = useState("");

  let titulo, imagen, url, sesionId;

  switch (tipo) {
    case "cliente":
      titulo = "BIENVENIDO - CLIENTE";
      imagen = "/imagenRegistro.webp";
      url = `${urlCliente}/GetCliente/${nombre}/${contrasena}`;
      sesionId = "clienteId";
      break;
    case "barbero":
      titulo = "BIENVENIDO - BARBERO";
      imagen = "/imagenBarbero.webp";
      url = `${urlBarbero}/GetBarbero/${nombre}/${contrasena}`;
      sesionId = "barberoId";
      break;
    case "administrador":
      titulo = "BIENVENIDO - ADMIN";
      imagen = "/imagenAdmin.webp";
      url = `${urlAdm}/GetAdministrador/${nombre}/${contrasena}`;
      sesionId = "administradoresId";
      break;
    default:
      titulo = "INICIAR SESIÓN";
      imagen = null;
      url = null;
  }

  function cambiarNombre(e) {
    setNombre(e.target.value);
  }

  function cambiarContrasena(e) {
    setContrasena(e.target.value);
  }

  function manejarSubmit(e) {
    return obtenerUsuario(
      e,
      navigate,
      url,
      sesionId,
      tipo,
      nombre,
      contrasena,
      setMensajeNombre,
      setMensajeContrasena,
      setError,
      setLoading,
      setResultado
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <TituloGenericos
          titulo={titulo}
          clases="titulo-secciones"
          icono={FaUsers}
        />
        <section className="row row-sesiones">
          <article className="col-lg-4 col-imagen-sesiones">
            <div>
              <img
                src={imagen}
                alt="imagen"
                className="img-fluid img-iniciar-sesion-general"
              />
            </div>
          </article>
          <article className="col-lg-8 col-inputs-sesiones">
            <form onSubmit={manejarSubmit} className="form-sesiones">
              <div className="div-inputs-iniciarsesiongeneral">
                <p className="p-inputs-iniciarsesiongeneral">Nombre</p>

                <input
                  type="text"
                  placeholder="Inserte su nombre"
                  value={nombre}
                  onChange={cambiarNombre}
                  minLength={6}
                  maxLength={29}
                  required
                  className="inputs-iniciarsesiongeneral"
                />
                {mensajeNombre && (
                  <p className="error-message">{mensajeNombre}</p>
                )}
              </div>
              <div className="div-inputs-iniciarsesiongeneral">
                <p className="p-inputs-iniciarsesiongeneral">Contraseña</p>
                <input
                  type="password"
                  placeholder="Inserte su contraseña"
                  value={contrasena}
                  onChange={cambiarContrasena}
                  minLength={6}
                  maxLength={29}
                  required
                  className="inputs-iniciarsesiongeneral"
                />

                {mensajeContrasena && (
                  <p className="error-message">{mensajeContrasena}</p>
                )}
              </div>

              <div className="div-button-sesiones">
             
              {error && <p className="error-message">{error}</p>}
              {resultado && <p className="success-message">{resultado}</p>}
             
                <button
                  type="submit"
                  disabled={loading}
                  className="button-sesiones"
                >
                  {loading ? "Cargando..." : "INICIAR SESIÓN"}
                </button>


              </div>
            </form>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
