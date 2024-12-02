import React, { useState, useEffect } from "react";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import {
  obtenerReportes,
  obtenerTotalClientes,
  obtenerTotalBarberos,
  obtenerTotalIngresos,
} from "../../../peticiones/ReportesPeticiones";
import "../../../css/reporteriaadmin.css";
import { Cuadros } from "../celular/ReporteIngresosCelular";

export default function ReporteIngresosPc() {
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
    <br />
    
      <TituloGenericos
        titulo={"REPORTERIA"}
        icono={LiaFileInvoiceDollarSolid}
        clase="name-cita-pc"
        clase2="h1-pc-white"
      />

      <br />

      <section className="row section-row-ingresos-pc">
        {/* Sección principal izquierda */}
        <article className="col-8">
          {/* BUSCADOR */}
          <div className="div-principal-buscador-ingreso-pc">
            <p className="p-fecha-ingreso-pc"> Fecha </p>
            <div className="div-ingresos-fechas-pc">
              <div>
                <span className="span-de-ingreso-pc"> De </span>

                <input
                  className="input-date-ingreso-pc"
                  type="date"
                  value={fechaInicio}
                  onChange={obtenerFechaInicio}
                />

                <span className="span-hasta-ingreso-pc"> Hasta </span>

                <input
                  className="input-date-ingreso-pc"
                  type="date"
                  value={fechaFin}
                  onChange={obtenerFechaFin}
                />
              </div>

              <div>
                <button
                  className="button-ingreso-pc"
                  type="button"
                  onClick={llamarReportes}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>

          <br />

          {/* TABLA */}
          <div className="tabla-reportes-pc">
            {citas.length > 0 ? (
              <div className="tabla-container">
                <table className="table-pc">
                  <thead>
                    <tr>
                      <th className="th-tabla-reporteria-pc">#</th>
                      <th className="th-tabla-reporteria-pc">Fecha</th>
                      <th className="th-tabla-reporteria-pc">Cita Realizada</th>
                      <th className="th-tabla-reporteria-pc">
                        Ingreso Cita Realizada
                      </th>
                      <th className="th-tabla-reporteria-pc">Barbero</th>
                      <th className="th-tabla-reporteria-pc">
                        Cortes Realizados
                      </th>
                      <th className="th-tabla-reporteria-pc">
                        Ingresos del Barbero
                      </th>
                      <th className="th-tabla-reporteria-pc">Comisión</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citas.map((cita, index) => (
                      <tr key={index}>
                        <td className="td-tabla-reporteria-pc">{index + 1}</td>
                        <td className="td-tabla-reporteria-pc">{cita.fecha}</td>
                        <td className="td-tabla-reporteria-pc">{cita.citasRealizadas}</td>
                        <td className="td-tabla-reporteria-pc">{cita.ingresoCitaRealizada}</td>
                        <td className="td-tabla-reporteria-pc">{cita.barbero}</td>
                        <td className="td-tabla-reporteria-pc">{cita.cortesRealizados}</td>
                        <td className="td-tabla-reporteria-pc">{cita.ingresosDelBarbero}</td>
                        <td className="td-tabla-reporteria-pc">{cita.comision}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>{mensaje && <p className="mensaje-error">{mensaje}</p>}</div>
            )}
          </div>
        </article>

        {/* Sección lateral derecha */}
        <article className="col-3 article-cuadros-registros-pc">
          <Cuadros nombre={"Total de Ingresos"} precio={`$${totalIngresos}`} />
          <Cuadros nombre={"Total de Clientes"} precio={totalClientes} />
          <Cuadros nombre={"Total de Barberos"} precio={totalBarberos} />
        </article>
      </section>
    </>
  );
}
