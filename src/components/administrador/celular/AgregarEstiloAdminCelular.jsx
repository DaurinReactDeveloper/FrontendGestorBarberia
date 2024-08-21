import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { loginUser } from "../../../util/firebase/userFireBase";
import { agregarEstilos } from "../../../peticiones/EstilosPeticiones";
import { storage } from "../../../util/firebase/firebaseConfig";
import { RiScissors2Fill } from "react-icons/ri";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import "./../../../css/agregarestiloadmincelular.css";

// Componente funcional para agregar estilos de corte de cabello desde un dispositivo móvil
export default function AgregarEstiloAdminCelular() {
  // Definición de los estados para almacenar los valores de los campos del formulario
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

  // Función para manejar el cambio en el campo "Nombre"
  function extraerNombre(e) {
    const nuevoNombre = e.target.value;
    setNombre(nuevoNombre);
  }

  // Función para manejar el cambio en el campo "Descripción"
  function extraerDescripcion(e) {
    const nuevaDescripcion = e.target.value;
    setDescripcion(nuevaDescripcion);
  }

  // Función para manejar el cambio en el campo "Precio"
  function extraerPrecio(e) {
    const nuevoPrecio = e.target.value;
    setPrecio(nuevoPrecio);
  }

  // Función para manejar el cambio en el campo "Imagen"
  function extraerImagen(e) {
    const imagenNueva = e.target.files[0];
    setImagen(imagenNueva);
  }

  // Función para manejar la solicitud de agregar un estilo
  async function PeticionEstilos(e) {
    e.preventDefault();

    // Autenticación del usuario usando FireBase
    const isAuthenticated = await loginUser(
      "dauringonzales7@gmail.com",
      "Daurin16"
    );

    // Verifica si el usuario está autenticado
    if (isAuthenticated) {
      // Verifica si todos los campos necesarios están completos
      if (imagen && nombre && precio && descripcion) {
        try {
          // Referencia a la ubicación donde se almacenará la imagen en Firebase Storage
          const imageRef = ref(storage, `estilosdecorte/${nombre}.jpg`);
          
          // Sube la imagen a Firebase Storage
          await uploadBytes(imageRef, imagen);
          
          // Obtiene la URL de descarga de la imagen desde Firebase Storage
          const imageUrl = await getDownloadURL(imageRef);

          // Llama al método para agregar el estilo usando los valores capturados
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
  }

  // Renderiza el formulario y los elementos del UI
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
                accept="image/jpeg"
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

          <div className="div-boton-submit-estilos-admin">
            <button type="submit" className="boton-submit-estilos-admin">
              Agregar Estilo
            </button>
          </div>
        </form>

        {mensaje && <p>{mensaje}</p>}
      </section>
    </>
  );
}
