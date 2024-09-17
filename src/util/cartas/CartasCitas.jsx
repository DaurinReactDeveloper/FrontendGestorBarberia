import { useState } from "react";
import {
  actualizarCitaBarbero,
  EliminarCita,
} from "../../peticiones/CitasPeticiones";
import { LiaCommentMedicalSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import "./../../css/citascartas.css";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export function CartasCitas({
  idCita,
  img,
  alt = "",
  nombre,
  descripcion,
  precio,
  estado,
  fecha,
  hora,
  mostrarSoloRealizadas = false,
  mostrarSoloEnProceso = false,
  esBarbero = false,
  esCliente = true,
  citaId,
  clienteId,
}) {
  const [valor, setValor] = useState("Rechazada");
  const [mensaje, setMensaje] = useState("");
  const [mensajeBarbero, setMensajeBarbero] = useState("");
  const [cargando, setCargando] = useState(false); // Estado de carga
  const [cargandoBarbero, setCargandoBarbero] = useState(false); // Estado de carga para el barbero

  if (mostrarSoloRealizadas && estado !== "Realizada") return null;
  if (mostrarSoloEnProceso && estado !== "En Proceso") return null;

  let clase,
    nombreBoton = "Eliminar",
    deshabilitar = true,
    claseBoton;

  switch (estado) {
    case "En Proceso":
      clase = "estado-proceso-cita";
      claseBoton = "boton-proceso-cita";
      nombreBoton = esBarbero ? null : "Cancelar";
      break;
    case "Aceptada":
      clase = "estado-aceptada-cita";
      break;
    case "Rechazada":
      clase = "estado-rechazada-cita";
      deshabilitar = false;
      claseBoton = "boton-rechazar-cita";
      break;
    case "Realizada":
      clase = "estado-realizada-cita";
      deshabilitar = false;
      claseBoton = "boton-realizar-cita";
      break;
    case "Cancelada":
      clase = "estado-cancelada-cita";
      deshabilitar = false;
      claseBoton = "boton-cancelar-cita";
      break;
    default:
      clase = "";
      break;
  }

  const formattedFecha = formatDate(fecha);
  const cartaBodyClase = esBarbero
    ? "card-body-citas-Barbero"
    : "card-body-citas";

  const manejarActualizarCita = async () => {
    setCargando(true);
    try {
      await actualizarCitaBarbero(setMensaje, idCita, "Cancelada");
    } finally {
      setCargando(false);
    }
  };

  const manejarEliminarCita = async () => {
    setCargando(true);
    try {
      await EliminarCita(setMensaje, idCita, estado);
    } finally {
      setCargando(false);
    }
  };

  const manejarActualizarCitaBarbero = async () => {
    setCargandoBarbero(true);
    try {
      await actualizarCitaBarbero(setMensajeBarbero, citaId, valor);
    } finally {
      setCargandoBarbero(false);
    }
  };

  return (
    <div className="card card-cita">
      <div className="div-estado-cita">
        <p className={clase}>{estado}</p>
        {estado === "Realizada" && esCliente && (
          <Link to={`/comentario/${idCita}`} title="Comentar">
            <LiaCommentMedicalSolid className="icon-comentar-citas-realizadas" />
          </Link>
        )}
        {estado === "En Proceso" && esBarbero && (
          <Link to={`/DetallesCliente/${clienteId}`} title="Ver Cliente">
            <IoPersonCircle className="icon-comentar-citas-realizadas" />
          </Link>
        )}
      </div>
      <img src={img} className="card-img-top card-img-cita" alt={alt} />

      <div className={`card-body ${cartaBodyClase}`}>
        <div className="card-div-citas">
          <p className="card-title card-nombre-cita">{nombre}</p>
          <p className="card-text card-fecha-cita">{formattedFecha}</p>
          <p className="card-text card-fecha-cita">{hora}</p>
        </div>
        {!esBarbero && (
          <p className="card-text card-descripcion-cita">{descripcion}</p>
        )}
        <p className="card-text card-precio-cita">${precio}</p>
        {mensaje && <p className="p-mensaje-barbero-cita">{mensaje}</p>}
      </div>

      {!esBarbero && (
        <div className="div-boton-eliminar">
          {estado === "En Proceso" ? (
            <button
              type="button"
              className={`boton-eliminar-cita ${claseBoton}`}
              onClick={manejarActualizarCita}
              disabled={cargando} // Deshabilita el botón mientras carga
            >
              {cargando ? "Cargando..." : nombreBoton}
            </button>
          ) : (
            <button
              type="button"
              className={`boton-eliminar-cita ${claseBoton}`}
              disabled={deshabilitar || cargando}
              aria-disabled={deshabilitar || cargando}
              onClick={manejarEliminarCita}
            >
              {cargando ? "Cargando..." : nombreBoton}
            </button>
          )}
        </div>
      )}

      {esBarbero && mostrarSoloEnProceso && (
        <div className="div-select-button-cita-barbero">
          <div className="div-select-cita-barbero">
            <select
              name="estadoCita"
              id="estadoCita"
              className="select-cita-barbero"
              value={valor}
              onChange={(event) => setValor(event.target.value)}
            >
              <option value="Rechazada">Rechazar</option>
              <option value="Aceptada">Aceptar</option>
            </select>
          </div>

          {mensajeBarbero && (
            <p className="p-mensaje-barbero-cita">{mensajeBarbero}</p>
          )}

          <div className="div-boton-aceptar-cita-barbero">
            <button
              type="button"
              className="boton-aceptar-cita-barbero"
              onClick={manejarActualizarCitaBarbero}
              disabled={cargandoBarbero} // Deshabilita el botón mientras carga
            >
              {cargandoBarbero ? "Cargando..." : "ENVIAR"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
