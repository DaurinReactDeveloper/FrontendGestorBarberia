import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { loginUser } from "../../../util/firebase/userFireBase";
import { agregarEstilos } from "../../../peticiones/EstilosPeticiones";
import { storage } from "../../../util/firebase/firebaseConfig";
import { RiScissors2Fill } from "react-icons/ri";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { IoMdAddCircleOutline } from "react-icons/io";
import "./../../../css/agregarestiloadmincelular.css";

export default function AgregarEstiloAdminPc() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState([]);
  
  // Mensajes
  const [mensajeNombre, setMensajeNombre] = useState("");
  const [mensajeDescripcion, setMensajeDescripcion] = useState("");
  const [mensajePrecio, setMensajePrecio] = useState("");
  const [mensajeImagen, setMensajeImagen] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Estado para controlar el botón de "Cargando"
  const [cargando, setCargando] = useState(false);

  function extraerNombre(e) {
    const nuevoNombre = e.target.value;
    setNombre(nuevoNombre);
  }

  function extraerDescripcion(e) {
    const nuevaDescripcion = e.target.value;
    setDescripcion(nuevaDescripcion);
  }

  function extraerPrecio(e) {
    const nuevoPrecio = e.target.value;
    setPrecio(nuevoPrecio);
  }

  function extraerImagen(e) {
    const imagenNueva = e.target.files[0];
    setImagen(imagenNueva);
  }

  // Función para agregar estilos
  async function PeticionEstilos(e) {
    e.preventDefault();

    // Activa el estado "cargando"
    setCargando(true);

    const isAuthenticated = await loginUser(
      "dauringonzales7@gmail.com",
      "Daurin16"
    );

    if (isAuthenticated) {
      if (imagen && nombre && precio && descripcion) {
        try {
          const imageRef = ref(storage, `estilosdecorte/${nombre}.jpg`);
          await uploadBytes(imageRef, imagen);
          const imageUrl = await getDownloadURL(imageRef);

          // Llamar el método para agregar el estilo
          agregarEstilos(
            nombre,
            descripcion,
            precio,
            imageUrl,
            setMensaje,
            setMensajeNombre,
            setMensajeDescripcion,
            setMensajePrecio,
            setMensajeImagen
          );
        } catch (error) {
          console.log("Ha ocurrido un error guardando el estilo " + error);
        }
      }
    } else {
      console.log("No se pudo autenticar al usuario.");
    }

    // Desactiva el estado "cargando" después de completar la solicitud
    setCargando(false);
  }

  return (
    <>
      <section>
        <TituloGenericos
          titulo={"AGREGAR ESTILOS"}
          icono={RiScissors2Fill}
          clase="name-cita-pc"
          clase2="h1-pc-white"
        />

        <br />

        <form onSubmit={PeticionEstilos}>
          <article className="article-inputs-estilos-pc">
            <div className="div-labels-nombre-descripcion-pc">
              <label className="label-nombre-pc">
                <p className="p-label-estilos-pc">Nombre</p>
                <input
                  type="text"
                  placeholder="Inserte el nombre del corte"
                  required
                  minLength={6}
                  maxLength={29}
                  onChange={extraerNombre}
                  className="input-agregar-estilos-admin-pc"
                />
                {mensajeNombre && <p>{mensajeNombre}</p>}
              </label>

              <label className="label-descripcion-pc">
                <p className="p-label-estilos-pc">Descripción</p>
                <textarea
                  required
                  onChange={extraerDescripcion}
                  placeholder="¿De qué trata el corte?"
                  minLength={45}
                  maxLength={53}
                  className="input-agregar-estilos-admin-pc text-area-agregar-estilos-pc"
                ></textarea>
                {mensajeDescripcion && <p>{mensajeDescripcion}</p>}
              </label>
            </div>

            <div className="div-labels-precio-imagen-pc">
              <label className="label-precio-pc">
                <p className="p-label-estilos-pc">Precio</p>
                <input
                  type="number"
                  placeholder="Inserte el precio del corte"
                  required
                  onChange={extraerPrecio}
                  min={0}
                  max={999}
                  className="input-agregar-estilos-admin-pc"
                />
                {mensajePrecio && <p>{mensajePrecio}</p>}
              </label>

              <label className="label-imagen-pc">
                <p className="p-label-estilos-pc">Imagen</p>
                <input
                  type="file"
                  required
                  className="input-agregar-estilos-admin-pc img-input-agregar-estilos-admin-pc"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={extraerImagen}
                />
                {mensajeImagen && <p>{mensajeImagen}</p>}
              </label>
            </div>
          </article>

          {mensaje && <p className="mensaje-agregar-estilo-pc">{mensaje}</p>}

          <div className="div-boton-submit-estilos-admin-pc">
            <button
              type="submit"
              className="boton-submit-estilos-admin-pc"
              disabled={cargando}
            >
              <IoMdAddCircleOutline />
              {cargando ? "Guardando..." : "Agregar Estilo"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
