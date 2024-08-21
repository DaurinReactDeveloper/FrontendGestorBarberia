import { useState } from "react";
import {
  actualizarCitaBarbero,
  EliminarCita,
} from "../../peticiones/CitasPeticiones";
import "./../../css/citastelefonos.css";

// Función para formatear la fecha
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

//CartasCitasCelular
export function CartasCitasCelular({
  idCita,
  img,
  alt = "",
  nombre,
  descripcion,
  precio,
  estado,
  fecha,
  mostrarSoloRealizadas = false,
}) {
  if (mostrarSoloRealizadas && estado !== "Realizada") {
    return null;
  }

  const [mensaje, setMensaje] = useState("");

  let clase,
    deshabilitar = true,
    claseDeshabilitar;

  switch (estado) {
    case "En Proceso":
      clase = "estado-proceso";
      break;
    case "Aceptada":
      clase = "estado-aceptada";
      break;
    case "Rechazada":
      clase = "estado-rechazada";
      deshabilitar = false;
      claseDeshabilitar = "boton-eliminar-cita2";
      break;
    case "Realizada":
      clase = "estado-realizada";
      deshabilitar = false;
      claseDeshabilitar = "boton-eliminar-cita2";
      break;
    default:
      clase = "";
      claseDeshabilitar = "boton-eliminar-cita2";
      break;
  }

  // Formatear la fecha al formato dd/MM/yyyy
  const formattedFecha = formatDate(fecha);

  return (
    <div className="card card-cita" style={{ width: "21rem" }}>
      <p className={clase}>{estado}</p>
      <img src={img} className="card-img-top card-img-cita" alt={alt} />
      <div className="card-body card-body-citas">
        <div className="card-div-citas">
          <p className="card-title card-nombre-cita">{nombre}</p>
          <p className="card-text card-fecha-cita">{formattedFecha}</p>
        </div>
        <p className="card-text card-descripcion-cita">{descripcion}</p>
        <p className="card-text card-precio-cita">${precio}</p>
      </div>
      <div className="div-boton-eliminar">
        <button
          type="button"
          className={`boton-eliminar-cita ${claseDeshabilitar}`}
          disabled={deshabilitar}
          aria-disabled={deshabilitar}
          onClick={() => EliminarCita(setMensaje, idCita, estado)}
        >
          Eliminar
        </button>
      </div>
      {mensaje && <p className="p-mensaje-table-barbero-pc">{mensaje}</p>}
    </div>
  );
}

//CartasCitasCelularBarbero
export function CartasCitasCelularBarbero({
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
  citaId,
}) {
  //Variable para obtener el valor del select
  const [valor, setValor] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Maneja el cambio del valor seleccionado
  const obtenerValorSelect = (event) => {
    setValor(event.target.value);
  };

  //Filtro para solo Realizadas
  if (mostrarSoloRealizadas && estado !== "Realizada") {
    return null;
  }

  //Filtro para solo en proceso
  if (mostrarSoloEnProceso && estado !== "En Proceso") {
    return null;
  }

  let clase,
    deshabilitar = true,
    claseDeshabilitar;

  switch (estado) {
    case "En Proceso":
      clase = "estado-proceso";
      break;
    case "Aceptada":
      clase = "estado-aceptada";
      break;
    case "Rechazada":
      clase = "estado-rechazada";
      deshabilitar = false;
      claseDeshabilitar = "boton-eliminar-cita2";
      break;
    case "Realizada":
      clase = "estado-realizada";
      deshabilitar = false;
      claseDeshabilitar = "boton-eliminar-cita2";
      break;
    default:
      clase = "";
      claseDeshabilitar = "boton-eliminar-cita2";
      break;
  }

  // Formatear la fecha al formato dd/MM/yyyy
  const formattedFecha = formatDate(fecha);

  return (
    <div className="card card-cita" style={{ width: "21rem" }}>
      <p className={clase}>{estado}</p>
      <img src={img} className="card-img-top card-img-cita" alt={alt} />
      <div className="card-body card-body-citas">
        <div className="card-div-citas">
          <p className="card-title card-nombre-cita">{nombre}</p>
          <p className="card-text card-fecha-cita">{formattedFecha}</p>
          <p className="card-text card-fecha-cita">{hora}</p>
        </div>
        <p className="card-text card-descripcion-cita">{descripcion}</p>
        <p className="card-text card-precio-cita">${precio}</p>
      </div>

      {mostrarSoloEnProceso == false && (
        <div className="div-boton-eliminar">
          <button
            type="button"
            className={`boton-eliminar-cita ${claseDeshabilitar}`}
            disabled={deshabilitar}
            aria-disabled={deshabilitar}
          >
            Eliminar
          </button>
        </div>
      )}

      {mostrarSoloEnProceso === true && (
        <div className="div-select-button-cita-barbero">
          <div className="div-select-cita-barbero">
            <select
              name="estadoCita"
              id="estadoCita"
              className="select-cita-barbero"
              value={valor}
              onChange={obtenerValorSelect}
            >
              <option value="Rechazada">Rechazar</option>
              <option value="Aceptada">Aceptar</option>
            </select>
          </div>

          {mensaje && <p>{mensaje}</p>}

          <button
            type="button"
            className={`boton-aceptar-cita-barbero`}
            onClick={() => actualizarCitaBarbero(setMensaje, citaId, valor)}
          >
            ENVIAR
          </button>
        </div>
      )}
    </div>
  );
}
