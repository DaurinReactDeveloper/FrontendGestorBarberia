import React, { useEffect, useState } from "react";
import Navbar from "../../../util/navbar/Navbar";
import Footer from "../../../util/footer/Footer";
import { FaUserCircle } from "react-icons/fa";
import { storage } from "../../../util/firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { loginUser } from "../../../util/firebase/userFireBase";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { obtenerBarberias } from "../../../peticiones/BarberiasPeticiones";
import { anadirCliente } from "../../../peticiones/RegistroPeticiones";
import Aos from "aos";
import axios from "axios";
import "aos/dist/aos.css";
import "./../../../css/registro.css";


export default function Registro() {
  const [img, setImg] = useState(null);
  const [imgMensaje, setImgMensaje] = useState(null);
  const [nombre, setNombre] = useState("");
  const [nombreMensaje, setNombreMensaje] = useState(null);
  const [telefono, setTelefono] = useState("");
  const [telefonoMensaje, setTelefonoMensaje] = useState(null);
  const [email, setEmail] = useState("");
  const [emailMensaje, setEmailMensaje] = useState(null);
  const [contrasena, setContrasena] = useState("");
  const [contrasenaMensaje, setContrasenaMensaje] = useState(null);
  const [registroMensaje, setRegistroMensaje] = useState(null);
  const [registroErrorMensaje, setRegistroErrorMensaje] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [barberias, setBarberias] = useState([]);
  const [barberiaID, setBarberiaId] = useState("");
  const [mensajeBarberia, setMensajeBarberia] = useState("");

  useEffect(() => {
    obtenerBarberias(setBarberias, setMensajeBarberia);
    Aos.init();
  }, []);

  const extraerImg = (e) => {
    const imagen = e.target.files[0];
    if (imagen) {
      setImg(imagen);
    }
  };

  function extraerNombre(e) {
    const NuevoNombre = e.target.value;
    setNombre(NuevoNombre);
  }

  function extraerTelefono(e) {
    const NuevoTelefono = e.target.value;
    setTelefono(NuevoTelefono);
  }

  function extraerEmail(e) {
    const NuevoEmail = e.target.value;
    setEmail(NuevoEmail);
  }

  function extraerContrasena(e) {
    const NuevoContrasena = e.target.value;
    setContrasena(NuevoContrasena);
  }

  const manejarCambioBarberia = (e) => {
    const NuevaBarberia = e.target.value;
    setBarberiaId(NuevaBarberia);
  };

  async function enviarDatos(e) {
    e.preventDefault();
    anadirCliente(
      img,
      nombre,
      barberiaID,
      telefono,
      email,
      contrasena,
      setImgMensaje,
      setNombreMensaje,
      setTelefonoMensaje,
      setEmailMensaje,
      setContrasenaMensaje,
      setRegistroMensaje,
      setRegistroErrorMensaje,
      setCargando,
      setAuthError
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <TituloGenericos
          titulo={"REGISTRARME"}
          clases="titulo-secciones"
          icono={FaUserCircle}
        />

        <section className="row registro-container">
          <article className="col-lg-6 registro-imagen" data-aos="fade-right">
            <img
              src="/imagenRegistro.webp"
              alt="imagenregistro"
              className="img-fluid img-registro"
            />
          </article>

          <article className="col-lg-6 registro-formulario">
            <form onSubmit={enviarDatos}>
              {/* div 1: Nombre y Teléfono */}
              <div className="registro-articulo">
                <div className="div_articulo">
                  <p>Nombre</p>

                  <input
                    type="text"
                    className="registro-input"
                    placeholder="Ingrese su nombre"
                    value={nombre}
                    onChange={extraerNombre}
                    minLength={6}
                    maxLength={28}
                    required
                  />
                  {nombreMensaje && (
                    <p className="mensaje-error">{nombreMensaje}</p>
                  )}
                </div>

                <div className="div_articulo">
                  <p>Teléfono</p>
                  <input
                    type="text"
                    className="registro-input"
                    placeholder="Ingrese su numero de telefono sin guiones"
                    value={telefono}
                    onChange={extraerTelefono}
                    minLength={6}
                    maxLength={19}
                    required
                  />
                  {telefonoMensaje && (
                    <p className="mensaje-error">{telefonoMensaje}</p>
                  )}
                </div>
              </div>

              {/* div 2: email - contraseña */}
              <div className="registro-articulo">
                <div className="div_articulo">
                  <p>Email</p>
                  <input
                    type="email"
                    className="registro-input"
                    placeholder="Ingrese su email"
                    value={email}
                    onChange={extraerEmail}
                    minLength={6}
                    maxLength={48}
                    required
                  />
                  {emailMensaje && (
                    <p className="mensaje-error">{emailMensaje}</p>
                  )}
                </div>

                <div className="div_articulo">
                  <p>Contraseña</p>
                  <input
                    type="password"
                    className="registro-input input-contrasena"
                    placeholder="Ingrese su contraseña"
                    value={contrasena}
                    onChange={extraerContrasena}
                    minLength={6}
                    maxLength={15}
                    required
                  />
                  {contrasenaMensaje && (
                    <p className="mensaje-error">{contrasenaMensaje}</p>
                  )}
                </div>
              </div>

              {/* div 3: Imagen */}
              <div className="registro-articulo registro-articulo-pc">
                <div className="div_articulo">
                  <p>Imagen</p>
                  <input
                    type="file"
                    className="registro-input img-input"
                    onChange={extraerImg}
                    accept="image/png, image/jpeg, image/webp"
                    required
                  />
                  {imgMensaje && <p className="mensaje-error">{imgMensaje}</p>}
                </div>
              </div>

              {/* div 3: Barberia */}
              <div className="registro-articulo">
                <div className="div_articulo">
                  <p>Barberia</p>
                  <select
                    value={barberiaID}
                    onChange={manejarCambioBarberia}
                    className="registro-select-barberias"
                    required
                  >
                    <option>Selecciona su barberia</option>

                    {barberias.map((barberia,index) => (
                      <option
                        key={index}
                        value={barberia.barberiasId}
                      >
                        {barberia.nombreBarberia}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {mensajeBarberia && <p>{mensajeBarberia}</p>}

              {registroMensaje && (
                <p className="mensajeRegistroEnvio">{registroMensaje}</p>
              )}

              {registroErrorMensaje && (
                <p className="mensajeErrorRegistroEnvio">
                  {registroErrorMensaje}
                </p>
              )}

              {authError && <p>{authError}</p>}

              <div className="div-boton-registro">
                <button
                  type="submit"
                  className="registro-boton"
                  disabled={cargando}
                >
                  {cargando ? "Cargando..." : "Registrarme"}
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
