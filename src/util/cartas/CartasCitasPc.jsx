import { useState } from "react";
import { formatDate } from "./CartasCitasCelular";
import {
  actualizarCitaBarbero,
  EliminarCita,
} from "../../peticiones/CitasPeticiones";

//Cartas Cliente
export function CartasCitasPc({
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
      clase = "estado-proceso-pc";
      break;
    case "Aceptada":
      clase = "estado-aceptada-pc";
      break;
    case "Rechazada":
      clase = "estado-rechazada-pc";
      deshabilitar = false;
      claseDeshabilitar = "boton-eliminar-rechazada-cita-pc";
      break;
    case "Realizada":
      clase = "estado-realizada-pc";
      deshabilitar = false;
      claseDeshabilitar = "boton-eliminar-realizada-cita-pc";
      break;
    default:
      clase = "";
      claseDeshabilitar = "boton-eliminar-cita-pc";
      break;
  }

  // Formatear la fecha al formato dd/MM/yyyy
  const formattedFecha = formatDate(fecha);

  return (
    <div className="card card-cita-pc">
      <div className="div-estado-cita-pc">
        <p className={clase}>{estado}</p>
      </div>

      <img src={img} className="card-img-top card-img-cita-pc" alt={alt} />
      <div className="card-body card-body-citas-pc">
        <div className="card-div-citas">
          <p className="card-title card-nombre-cita-pc">{nombre}</p>
          <p className="card-text card-fecha-cita-pc">{formattedFecha}</p>
        </div>
        <p className="card-text card-descripcion-cita-pc">{descripcion}</p>
        <p className="card-text card-precio-cita-pc">${precio}</p>
      </div>

      <div className="div-boton-eliminar-pc">
        <button
          type="button"
          className={`boton-eliminar-cita-pc ${claseDeshabilitar}`}
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
export function CartasCitasBarberoPc({
  img,
  alt = "",
  nombre,
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
      clase = "estado-proceso-barbero-pc";
      break;
    case "Aceptada":
      clase = "estado-aceptada-barbero-pc";
      break;
    case "Realizada":
      clase = "estado-realizada-barbero-pc";
      deshabilitar = false;
      claseDeshabilitar = "boton-eliminar-cita-barbero-pc";
      break;
    default:
      clase = "";
      claseDeshabilitar = "boton-eliminar-cita-barbero-pc";
      break;
  }

  // Formatear la fecha al formato dd/MM/yyyy
  const formattedFecha = formatDate(fecha);

  return (
    <div className="card card-cita-barbero-pc">
      <p className={clase}>{estado}</p>
      <img
        src={img}
        className="card-img-top card-img-cita-barbero-pc"
        alt={alt}
      />
      <div className="card-body card-body-citas-barbero-pc">
        <div className="card-div-citas">
          <p className="card-title card-nombre-cita-barbero-pc">{nombre}</p>
          <p className="card-text card-fecha-cita-barbero-pc">
            {formattedFecha}
          </p>
          <p className="card-text card-hora-cita-barbero-pc">{hora}</p>
        </div>
        <p className="card-text card-precio-cita-barbero-pc">${precio}</p>
      </div>

      {mostrarSoloEnProceso == false && (
        <div className="div-boton-eliminar">
          <button
            type="button"
            className={`boton-eliminar-cita-barbero ${claseDeshabilitar}`}
            disabled={deshabilitar}
            aria-disabled={deshabilitar}
          >
            Eliminar
          </button>
        </div>
      )}

      {mostrarSoloEnProceso === true && (
        <div className="div-select-button-cita-barbero-pc">
          <div className="div-select-cita-barbero-pc">
            <select
              name="estadoCita"
              id="estadoCita"
              className="select-cita-barbero-pc"
              value={valor}
              onChange={obtenerValorSelect}
            >
              <option value="Rechazada">Rechazar</option>
              <option value="Aceptada">Aceptar</option>
            </select>
          </div>

          {mensaje && <p>{mensaje}</p>}

          <div className="div-boton-aceptar-cita-barbero-pc">
            <button
              type="button"
              className={`boton-aceptar-cita-barbero-pc`}
              onClick={() => actualizarCitaBarbero(setMensaje, citaId, valor)}
            >
              ENVIAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
