import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { obtenerCredenciales } from "../../peticiones/CitasPeticiones";
import { ModalActualizar } from "../Modal/ModalActualizar";
import { BiCommentEdit } from "react-icons/bi";
import { BiCommentX } from "react-icons/bi";
import { EliminarComentario } from "../../peticiones/ComentariosPeticiones";
import { isTokenExpired } from "../tokens/Roles";
import "../../css/tablas.css";

export default function TablaBarbero({ comentarios }) {
  const { id } = obtenerCredenciales();
  const [mensaje, setMensaje] = useState("");
  const [comentarioId, setComentarioId] = useState(null); // Estado para almacenar el id del comentario seleccionado
  
  const tokenNoExpirado = !isTokenExpired();

  return (
    <>
      <section className="section-tabla-barbero">
        <table className="tabla-barbero">
          <thead>
            <tr className="thead-tabla-barbero">
              <th scope="col">#</th>
              <th scope="col">Cliente</th>
              <th scope="col">Tipo de Corte</th>
              <th scope="col">Calificación</th>
              <th scope="col">Comentario</th>
              {tokenNoExpirado && <th scope="col">Editar Comentario</th>}
              {tokenNoExpirado && <th scope="col">Eliminar Comentario</th>}
            </tr>
          </thead>
          <tbody className="body-tabla-barbero">
            {comentarios.map((comentario, index) => (
              <tr className="tr-tabla-barbero" key={comentario.idComentarios}>
                <td>{index + 1}</td>
                <td>{comentario.idClienteNavigation.nombre}</td>
                <td>{comentario.idCorteNavigation.nombre}</td>
                <td>{generadorEstrellas(comentario.calificacion)}</td>
                <td>{comentario.comentario}</td>
               
                {tokenNoExpirado && (
                  <td>
                    {esClientePropietario(id, comentario.idCliente) && (
                      <button
                        type="button"
                        title="Editar"
                        className="botonAbrirModal-Barbero"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => setComentarioId(comentario.idComentarios)} // Actualizamos el estado con el ID del comentario
                      >
                        <BiCommentEdit />
                      </button>
                    )}
                  </td>
                )}
                
                {tokenNoExpirado && (
                  <td>
                    {esClientePropietario(id, comentario.idCliente) && (
                      <button
                        type="button"
                        title="Eliminar"
                        className="botonAbrirModal-Barbero botonEliminarComment-Barbero"
                        onClick={() =>
                          llamarEliminarComentario(
                            id,
                            comentario.idComentarios,
                            comentario.idCita,
                            setMensaje
                          )
                        }
                      >
                        <BiCommentX />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {mensaje && <p className="p-mensaje-eliminar-comentario-barberos">{mensaje}</p>}

      {/* Pasamos el comentarioId como propiedad al Modal */}
      <ModalActualizar id={comentarioId} />
    </>
  );
}

function generadorEstrellas(calificacion) {
  const estrellas = [];
  for (let i = 1; i <= calificacion; i++) {
    estrellas.push(<FaStar key={i} />);
  }
  return estrellas;
}

function esClientePropietario(id, comentarioIdCliente) {
  return id == comentarioIdCliente;
}

function llamarEliminarComentario(ClienteId,id,idCita,setMensaje) {
  EliminarComentario(ClienteId,id,idCita,setMensaje);
}