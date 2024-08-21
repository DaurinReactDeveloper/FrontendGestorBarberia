import React, { useEffect, useState } from "react";
import Navbar from "../../../util/navbar/Navbar";
import Footer from "../../../util/footer/Footer";
import { FaUserCircle } from "react-icons/fa";
import { ValidacionesRegistro } from "../../../util/validaciones/ValidacionesRegistros";
import { urlCliente } from "../../../endpoints/Endpoints";
import { storage } from "../../../util/firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { loginUser } from "../../../util/firebase/userFireBase";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Aos.init();
  }, []);

  const extraerImg = (e) => {
    const imagen = e.target.files[0];
    if (imagen) {
      setImg(imagen);
    }
  };

  function extraerNombre(e) {
    setNombre(e.target.value);
  }

  function extraerTelefono(e) {
    setTelefono(e.target.value);
  }

  function extraerEmail(e) {
    setEmail(e.target.value);
  }

  function extraerContrasena(e) {
    setContrasena(e.target.value);
  }

  async function enviarDatos(e) {
    e.preventDefault();

    // Validaciones
    const esValido = ValidacionesRegistro(
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
    );

    if (esValido) {
      setIsLoading(true);

      // Autenticación del usuario - FireBase
      const isAuthenticated = await loginUser(
        "dauringonzales7@gmail.com",
        "Daurin16"
      );

      if (isAuthenticated) {
        if (img && nombre && telefono && email && contrasena) {
          try {
            const imageRef = ref(storage, `clientes/${nombre}.jpg`);
            await uploadBytes(imageRef, img);
            const imageUrl = await getDownloadURL(imageRef);

            const clienteData = {
              //ClienteDto
              Imgcliente: imageUrl,
              Nombre: nombre,
              Telefono: telefono,
              Email: email,
              Password: contrasena,
            };

            const peticion = await axios.post(
              `${urlCliente}/save`,
              clienteData
            );

            if (peticion.data.success) {
              setTimeout(() => {
                setRegistroMensaje("Cliente registrado exitosamente");
                window.location.href = "/iniciarsesion";
              }, 1000);
            } else {
              setRegistroErrorMensaje(peticion.data.message);

              setTimeout(() => {
                setRegistroErrorMensaje(null);
              }, 2000);
            }
          } catch (error) {
            console.error(
              "Error subiendo la imagen o enviando los datos",
              error.message
            );
          }
        }
      } else {
        setAuthError("No se pudo autenticar al usuario.");
      }

      setIsLoading(false);
    } else {
      setRegistroErrorMensaje("Por favor complete todos los campos.");
    }
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
                    placeholder="Ingrese su numero sin guiones"
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
                    accept="image/png, image/jpeg"
                    required
                  />
                  {imgMensaje && <p className="mensaje-error">{imgMensaje}</p>}
                </div>
              </div>

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
                  disabled={isLoading}
                >
                  {isLoading ? "Cargando..." : "Registrarme"}
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
