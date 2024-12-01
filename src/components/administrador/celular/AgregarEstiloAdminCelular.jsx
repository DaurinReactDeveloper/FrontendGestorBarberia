import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { loginUser } from "../../../util/firebase/userFireBase";
import { agregarEstilos } from "../../../peticiones/EstilosPeticiones";
import { storage } from "../../../util/firebase/firebaseConfig";
import { RiScissors2Fill } from "react-icons/ri";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import "./../../../css/agregarestiloadmincelular.css";

export default function AgregarEstiloAdminCelular() {
  // Definición de los estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState([]);
  
  // Estados para manejar los mensajes de validación
  const [mensajeNombre, setMensajeNombre] = useState("");
  const [mensajeDescripcion, setMensajeDescripcion] = useState("");
  const [mensajePrecio, setMensajePrecio] = useState("");
  const [mensajeImagen, setMensajeImagen] = useState("");
  const [mensaje, setMensaje] = useState("");
  
  // Estado para manejar el estado de carga del botón
  const [cargando, setCargando] = useState(false);

  // Función para manejar el cambio en los campos del formulario
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

  // Función para manejar la solicitud de agregar un estilo
  async function PeticionEstilos(e) {
    e.preventDefault();

    // Iniciar estado de carga
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
          console.log("Ha ocurrido un error guardando la cita " + error);
        }
      }
    } else {
      console.log("No se pudo autenticar al usuario.");
    }

    // Finalizar estado de carga
    setCargando(false);
  }

  // Renderizar el formulario con el botón en estado de carga
  return (
    <>
      <section>
        <TituloGenericos titulo={"AGREGAR ESTILOS"} icono={RiScissors2Fill} />
        <br />

        <form onSubmit={PeticionEstilos}>
          <div className="div-labels-nombre-descripcion-celular">
            <label className="label-nombre-celular">
              <p className="p-label-celular">Nombre</p>
              <input
                type="text"
                placeholder="Inserte el nombre del corte"
                required
                minLength={6}
                maxLength={29}
                onChange={extraerNombre}
                className="input-agregar-estilos-admin"
              />
              {mensajeNombre && <p>{mensajeNombre}</p>}
            </label>

            <label className="label-descripcion-celular">
              <p className="p-label-celular">Descripcion</p>
              <textarea
                required
                onChange={extraerDescripcion}
                placeholder="¿De qué trata el corte?"
                minLength={6}
                maxLength={53}
                className="input-agregar-estilos-admin"
              ></textarea>
              {mensajeDescripcion && <p>{mensajeDescripcion}</p>}
            </label>
          </div>

          <div className="div-labels-precio-imagen-celular">
            <label className="label-precio-celular">
              <p className="p-label-celular">Precio</p>
              <input
                type="number"
                placeholder="Inserte el precio del corte"
                required
                onChange={extraerPrecio}
                min={0}
                max={999}
                className="input-agregar-estilos-admin"
              />
              {mensajePrecio && <p>{mensajePrecio}</p>}
            </label>

            <label className="label-imagen-celular">
              <p className="p-label-celular">Imagen</p>
              <input
                type="file"
                accept="image/png, image/jpeg"
                required
                className="input-agregar-estilos-admin img-input-agregar-estilos-admin"
                onChange={extraerImagen}
              />
              {mensajeImagen && <p>{mensajeImagen}</p>}
            </label>
          </div>

          {mensaje && <p className="mensaje-agregar-estilo">{mensaje}</p>}

          <div className="div-boton-submit-estilos-admin">
            <button
              type="submit"
              className="boton-submit-estilos-admin"
              disabled={cargando}
            >
              {cargando ? "Cargando..." : "Agregar Estilo"}
            </button>
          </div>
        </form>

      </section>
    </>
  );
}
