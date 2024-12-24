import React, { useEffect, useState } from "react";
import Navbar from "../../util/navbar/Navbar";
import Footer from "../../util/footer/Footer";
import { MdOutlineUpdate } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { actualizarComentario } from "../../peticiones/ComentariosPeticiones";
import "../../css/actualizarcomentario.css";

export default function ActualizarComentario() {
  const { id } = useParams();
  const [cargando, setCargando] = useState(false);
  const [calificacion, setCalificacion] = useState("");
  const [comentario, setComentario] = useState("");
  const navigate = useNavigate();

  //Mensajes
  const [mensaje, setMensaje] = useState("");
  const [mensajeCalificacion, setMensajeCalificacion] = useState("");
  const [mensajeComentario, setMensajeComentario] = useState("");

  // funciones Obtener
  function obtenerCalificacion(e) {
    const nuevaCalificacion = e.target.value;
    setCalificacion(nuevaCalificacion);
  }

  function obtenerComentario(e) {
    const nuevoComentario = e.target.value;
    setComentario(nuevoComentario);
  }

  function llamarActualizar(e) {
    e.preventDefault();

    setCargando(true);

    actualizarComentario(
      id,
      calificacion,
      comentario,
      setMensaje,
      setMensajeCalificacion,
      setMensajeComentario,
      navigate
    ).finally(() => setCargando(false));
  }

  return (
    <>
      <Navbar />

      <h1 className="h1-actualizar-comentario">
        <MdOutlineUpdate />
        ACTUALIZAR COMENTARIO
      </h1>

      <br />

      <section className="section-actualizar-comentario">
        {/* Imagen */}
        <article className="article-actualizar-comentario">
          <img
            src="/ActualizarComentario.webp"
            alt="ActualizarAdmin"
            className="img-fluid"
          />
        </article>

        <br />

        {/* Google Form */}
        <form
          className="form-actualizar-comentario"
          onSubmit={llamarActualizar}
        >
          <div>
            <p className="p-actualizar-comentario">Calificación</p>
            <input
              type="number"
              min={1}
              max={5}
              placeholder="Inserta un número de 1 al 5"
              className="input-number-actualizar-comentario"
              onChange={obtenerCalificacion}
            />
            {mensajeCalificacion && (
              <p className="p-mensaje-actualizar-comentario">
                {mensajeCalificacion}
              </p>
            )}
          </div>

          <div>
            <p className="p-actualizar-comentario">Comentarios</p>
            <textarea
              type="text"
              minLength={11}
              maxLength={43}
              placeholder="Inserte su opinión sobre el corte realizado"
              className="input-textarea-actualizar-comentario"
              onChange={obtenerComentario}
            />
            {mensajeComentario && (
              <p className="p-mensaje-actualizar-comentario">
                {mensajeComentario}
              </p>
            )}
          </div>

          {mensaje && (
            <p className="p-mensaje-actualizar-comentario-general">{mensaje}</p>
          )}

          <div className="div-button-actualizar-comentario">
            <button
              className="button-actualizar-comentario"
              type="submit"
              disabled={cargando}
            >
              <IoIosSave />
              {cargando ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </section>

      <br />

      <Footer />
    </>
  );
}
