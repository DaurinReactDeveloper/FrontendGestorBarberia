import React, { useEffect, useState } from "react";
import {
  actualizarCitaBarbero,
  EliminarCita,
  obtenerCitasBarberoById,
} from "../../../peticiones/CitasPeticiones";
import { formatDate } from "../../../util/cartas/CartasCitas";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { FiScissors } from "react-icons/fi";
import "./../../../css/citasaceptadascelularbarbero.css";

export default function CitasAceptadasCelularBarbero() {
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true); // Estado para controlar la carga
  const [mostrarMensaje, setMostrarMensaje] = useState(false); // Estado para mostrar mensaje

  useEffect(() => {
    obtenerCitasBarberoById(setCitas, setMensaje).finally(() => {
      setCargando(false);
      setMostrarMensaje(citas.length > 0);
    });
  }, []);

  return (
    <>
      <section>
        <TituloGenericos titulo={"CITAS ACEPTADAS"} icono={FiScissors} />
      </section>
      <br />
      <section>
        {cargando ? (
          <p>Cargando...</p>
        ) : (
          <CitaTablaBarbero
            citas={citas}
            estado={"Aceptada"}
            botonFinalizar={true}
          />
        )}
      </section>
      {mostrarMensaje && mensaje && (
        <p className="p-mensaje-table-barbero-pc">{mensaje}</p>
      )}
    </>
  );
}
export function CitaTablaBarbero({
  citas,
  estado,
  botonFinalizar = false,
  botonEliminar = false,
}) {
  const citasAceptadas = citas.filter((cita) => cita.estado === estado);
  const [mensaje, setMensaje] = useState("");
  const [cargandoCitaId, setCargandoCitaId] = useState(null); // Estado para manejar carga por cita

  if (citasAceptadas.length === 0) {
    return <p className="p-mensaje-table-barbero-pc">No hay citas aceptadas</p>;
  }

  async function actualizarCita(citaId) {
    setCargandoCitaId(citaId);
    await actualizarCitaBarbero(setMensaje, citaId, "Realizada");
    setCargandoCitaId(null);
  }

  const isScrollable = citasAceptadas.length > 7;

  return (
    <>
      <section className="section-contenedor-table-barbero">
        <div
          className={`div-contenedor-cita-aceptada-barbero ${
            isScrollable ? "scrollable" : ""
          }`}
        >
          <table className="table table-barbero-pc">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cliente</th>
                <th scope="col">Estilo</th>
                <th scope="col">Precio</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                {botonFinalizar && <th scope="col">¿Finalizada?</th>}
                {botonEliminar && <th scope="col">¿Eliminar?</th>}
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {citasAceptadas.map((citaBarbero, index) => (
                <tr key={citaBarbero.citaId}>
                  <th scope="row">{index + 1}</th>
                  <td>{citaBarbero.cliente.nombre}</td>
                  <td>{citaBarbero.estilo.nombre}</td>
                  <td>{citaBarbero.estilo.precio}</td>
                  <td>{formatDate(citaBarbero.fecha)}</td>
                  <td>{citaBarbero.hora}</td>
                  <td>
                    {botonFinalizar && (
                      <button
                        type="button"
                        className="button-finalizar-aceptada"
                        onClick={() => actualizarCita(citaBarbero.citaId)}
                        disabled={cargandoCitaId === citaBarbero.citaId} // Deshabilitar si está cargando
                      >
                        {cargandoCitaId === citaBarbero.citaId
                          ? "Cargando..."
                          : "Finalizar"}
                      </button>
                    )}
                    {botonEliminar && (
                      <button
                        type="button"
                        className="button-finalizar-aceptada"
                        onClick={() =>
                          EliminarCita(
                            setMensaje,
                            citaBarbero.citaId,
                            citaBarbero.estado
                          )
                        }
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {mensaje && <p className="p-mensaje-table-barbero-pc">{mensaje}</p>}
    </>
  );
}
