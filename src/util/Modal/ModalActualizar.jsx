import { useState } from "react";
import { LiaCommentSolid } from "react-icons/lia";
import "./../../css/modal.css";
import { actualizarComentario } from "../../peticiones/ComentariosPeticiones";

export function ModalActualizar({ id }) {
  const [calificacion, setCalificacion] = useState("");
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajeCalificacion, setMensajeCalificacion] = useState("");
  const [mensajeComentario, setMensajeComentario] = useState("");

  function obtenerCalificacion(e) {
    const nuevaCalificacion = e.target.value;
    setCalificacion(nuevaCalificacion);
  }

  function obtenerComentario(e) {
    const nuevoComentario = e.target.value;
    setComentario(nuevoComentario);
  }

  function llamarActualizarComentario() {
    
    actualizarComentario(
      id,
      calificacion,
      comentario,
      setMensaje,
      setMensajeCalificacion,
      setMensajeComentario
    );
    
  }

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content modal-div-contendedor">
            <div className="modal-header modal-header-contenedor">
              <h1
                className="modal-title fs-5 titulo-modal"
                id="exampleModalLabel"
              >
                <LiaCommentSolid /> Actualizar Comentario
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="div-input-calificacion-modal">
                <p className="p-text-modal">Calificación</p>
                <input
                  type="number"
                  min={1}
                  max={5}
                  placeholder="Inserta un número de 1 al 5"
                  className="input-number-modal"
                  onChange={obtenerCalificacion}
                />
                {mensajeCalificacion && <p>{mensajeCalificacion}</p>}
              </div>

              <div>
                <p className="p-text-modal">Comentario</p>
                <textarea
                  type="text"
                  minLength={11}
                  maxLength={43}
                  placeholder="Inserte su opinión sobre el corte realizado"
                  className="input-textarea-modal"
                  onChange={obtenerComentario}
                />
                {mensajeComentario && <p>{mensajeComentario}</p>}
              </div>

              {/* Mensaje */}
              {mensaje && <p>{mensaje}</p>}
            </div>

            <div className="modal-footer modal-footer-contenedor">
              <button
                type="submit"
                className="btn-cerrar-comentario"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-enviar-comentario"
                onClick={llamarActualizarComentario} // Llamamos la función al hacer click
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
