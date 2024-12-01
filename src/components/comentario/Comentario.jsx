import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../util/navbar/Navbar";
import Footer from "../../util/footer/Footer";
import {
  obtenerCitaById,
  obtenerCredenciales,
} from "../../peticiones/CitasPeticiones";
import { TituloGenericos } from "../../util/titulos/TituloGenericos";
import { LiaCommentMedicalSolid } from "react-icons/lia";
import { anadirComentario } from "../../peticiones/ComentariosPeticiones";
import "../../css/comentario.css";

export default function Comentario() {
  const [mensajeCita, setMensajeCita] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cita, setCita] = useState(null);
  const [cargando, setCargando] = useState(false); // Estado para manejo de carga
  //Variables ComentarioDto
  const [idCliente, setIdCliente] = useState(0);
  const [idCorte, setIdCorte] = useState(0);
  const [idBarbero, setIdBarbero] = useState(0);
  const [calificacion, setCalificacion] = useState(null);
  const [comentario, setComentario] = useState("");
  //Mensajes
  const [mensajeCalificacion, setMensajeCalificacion] = useState(null);
  const [mensajeComentario, setMensajeComentario] = useState(null);
  const [mensajeId, setMensajeId] = useState(null);
  const [mensajeCitaId, setMensajeCitaId] = useState(null);
  // Obtenemos citaId de los parámetros de la URL
  const { citaId } = useParams();
  const { id } = obtenerCredenciales(); // Id del usuario registrado
  // Convertimos citaId a número
  const idCita = Number(citaId);

  useEffect(() => {
    if (idCita) {
      obtenerCitaById(idCita, setCita, setMensajeCita);
    }
  }, [idCita]);

  useEffect(() => {
    if (cita) {
      datosDto(cita, setIdCliente, setIdCorte, setIdBarbero);
    }
  }, [cita]);

  // Obtener datos de Comentario
  function pasarComentario(e) {
    const nuevoComentario = e.target.value;
    if (nuevoComentario !== null) {
      setComentario(nuevoComentario);
    }
  }

  // Obtener datos de Calificación
  function pasarCalificacion(e) {
    const nuevaCalificacion = e.target.value;
    if (nuevaCalificacion !== null) {
      setCalificacion(nuevaCalificacion);
    }
  }

  // Llamar a agregar comentario con manejo de estado de carga
  function llamarAgregarComentario(e) {
    e.preventDefault();
    setCargando(true); // Iniciar carga

    anadirComentario(
      id,
      idCita,
      idCliente,
      idCorte,
      idBarbero,
      calificacion,
      comentario,
      setMensaje,
      setMensajeCalificacion,
      setMensajeComentario,
      setMensajeId,
      setMensajeCitaId
    ).finally(() => {
      setCargando(false); // Finalizar carga
      setCalificacion(1); 
      setComentario(""); 
    });


  }

  return (
    <>
      <Navbar />

      <TituloGenericos
        titulo={"AGREGAR COMENTARIO"}
        icono={LiaCommentMedicalSolid}
        clase="titulo-comentario"
      />
      <section className="row section-row-comentario">
        <div className="col-img-comentario">
          <img
            src="/img-webp.webp"
            alt="comentarioImg"
            className="img-col-comentario"
          />
        </div>

        <div className="col-form-comentario">
          <form onSubmit={llamarAgregarComentario} className="form-comentario">
            {/* Calificación */}
            <div className="div-input-comentario div-input-calificacion-comentario">
              <label>
                <p className="p-calificacion-comentario">Calificación</p>
                <input
                  type="number"
                  min={1}
                  max={5}
                  className="input-number-comentario"
                  placeholder="Inserta un número de 1 al 5"
                  value={calificacion}
                  required
                  onChange={pasarCalificacion}
                />
              </label>
              {mensajeCalificacion && (
                <p className="mensaje-error">{mensajeCalificacion}</p>
              )}
            </div>

            {/* Comentario */}
            <div className="div-input-comentario">
              <label>
                <p className="p-comentario-comentario">Comentario</p>
                <textarea
                  minLength={11}
                  maxLength={43}
                  className="input-textarea-comentario"
                  placeholder="Inserte su opinión sobre el corte realizado"
                  value={comentario}
                  required
                  onChange={pasarComentario}
                />
              </label>
              {mensajeComentario && (
                <p className="mensaje-error">{mensajeComentario}</p>
              )}
            </div>

            {mensajeId && <p className="mensaje-error">{mensajeId}</p>}

            {/* Botón Enviar */}
            <div className="div-button-comentario">
              <button type="submit" className="button-comentario" disabled={cargando}>
                {cargando ? "cargando..." : "Enviar Comentario"}
              </button>
            </div>

            {mensajeCitaId && <p className="mensaje-error">{mensajeCitaId}</p>}

            {/* Mensaje general */}
            {mensaje && <p className="mensaje-general">{mensaje}</p>}
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

// Parar Datos a las variables dto
function datosDto(cita, setIdCliente, setIdCorte, setIdBarbero) {
  if (cita.clienteId) {
    setIdCliente(cita.clienteId);
  }

  if (cita.estiloId) {
    setIdCorte(cita.estiloId);
  }

  if (cita.barberoId) {
    setIdBarbero(cita.barberoId);
  }
}
