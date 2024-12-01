import React, { useState, useEffect } from "react";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaFileInvoiceDollar } from "react-icons/fa";
import {
  obtenerReportes,
  obtenerTotalClientes,
  obtenerTotalBarberos,
  obtenerTotalIngresos,
} from "../../../peticiones/ReportesPeticiones";
import "../../../css/reporteriaadmin.css";

export default function ReporteIngresosCelular() {
  const [citas, setCitas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Totales
  const [totalClientes, setTotalClientes] = useState(0);
  const [totalBarberos, setTotalBarberos] = useState(0);
  const [totalIngresos, setTotalIngresos] = useState(0);

  // Mensajes
  const [mensaje, setMensaje] = useState("");
  const [fechaInicioMensaje, setFechaInicioMensaje] = useState("");
  const [fechaFinMensaje, setFechaFinMensaje] = useState("");

  // Funciones para manejo de fechas
  function obtenerFechaInicio(e) {
    setFechaInicio(e.target.value);
  }

  function obtenerFechaFin(e) {
    setFechaFin(e.target.value);
  }

  // Llamada para obtener reportes
  function llamarReportes() {
    if (!fechaInicio || !fechaFin) {
      setMensaje("Por favor, selecciona ambas fechas.");
      setTimeout(() => {
        setMensaje("");
      }, 1000);
      return;
    }
    obtenerReportes(
      setCitas,
      setMensaje,
      fechaInicio,
      fechaFin,
      setFechaInicioMensaje,
      setFechaFinMensaje
    );
  }

  // Efecto para obtener totales
  useEffect(() => {
    obtenerTotalClientes(setTotalClientes, setMensaje);
    obtenerTotalBarberos(setTotalBarberos, setMensaje);
    obtenerTotalIngresos(setTotalIngresos, setMensaje);
  }, []);

  return (
    <>
      <TituloGenericos
        titulo={"REPORTERIA"}
        icono={LiaFileInvoiceDollarSolid}
      />

      <section>
        <article className="article-fecha-tabla-reporteria">
          <div className="div-fechas-reporteria">
            <p className="p-fecha-reporteria">Fecha</p>
            <div className="div-inputs-fechas-reporteria">
              <span>De</span>
              <input
                type="date"
                className="input-date-reporteria"
                value={fechaInicio}
                onChange={obtenerFechaInicio}
              />
              <span>Hasta</span>
              <input
                type="date"
                className="input-date-reporteria"
                value={fechaFin}
                onChange={obtenerFechaFin}
              />
             
            </div>

            <div className="div-button-enviar-fecha-reporteria">
                <button
                  type="button"
                  className="button-enviar-fecha-reporteria"
                  onClick={llamarReportes}
                >
                  Enviar
                </button>
              </div>

          </div>
          <br />

          {/* Tabla */}
          <div className="tabla-citas-reporteria">
            {citas.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="th-tabla-reporteria">#</th>
                    <th className="th-tabla-reporteria">Fecha</th>
                    <th className="th-tabla-reporteria">Cita Realizada</th>
                    <th className="th-tabla-reporteria">
                      Ingreso Cita Realizada
                    </th>
                    <th className="th-tabla-reporteria">Barbero</th>
                    <th className="th-tabla-reporteria">Cortes Realizados</th>
                    <th className="th-tabla-reporteria">
                      Ingresos del Barbero
                    </th>
                    <th className="th-tabla-reporteria">Comisión</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((cita, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{cita.fecha}</td>
                      <td>{cita.citasRealizadas}</td>
                      <td>{cita.ingresoCitaRealizada}</td>
                      <td>{cita.barbero}</td>
                      <td>{cita.cortesRealizados}</td>
                      <td>{cita.ingresosDelBarbero}</td>
                      <td>{cita.comision}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>{mensaje && <p className="mensaje-error">{mensaje}</p>}</div>
            )}
          </div>
        </article>

        <article className="arcticle-cuadro-reporteria">
          {/* Cuadros con Totales */}
          <Cuadros nombre={"Total de Ingresos"} precio={`$${totalIngresos}`} />
          <Cuadros nombre={"Total de Clientes"} precio={totalClientes} />
          <Cuadros nombre={"Total de Barberos"} precio={totalBarberos} />
        </article>
      </section>
    </>
  );
}

export function Cuadros({ nombre, precio }) {
  return (
    <>
      <div className="div-padre-cuadro-reporteria">
        <div className="div-cuadro-reporteria">
          <FaFileInvoiceDollar />
          <p className="p-div-cuadro-reporteria">{nombre}</p>
        </div>
        <div className="div-cantidad-cuadro-reporteria">
          <p className="p-cantidad-div-cuadro-reporteria">{precio}</p>
        </div>
      </div>
    </>
  );
}
