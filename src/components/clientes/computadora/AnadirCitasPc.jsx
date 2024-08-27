import React, { useEffect, useState } from "react";
import { CgAddR } from "react-icons/cg";
import { anadirCita } from "../../../peticiones/CitasPeticiones";
import { obtenerBarberos } from "../../../peticiones/BarberosPeticiones";
import { obtenerEstilos } from "../../../peticiones/EstilosPeticiones";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import "../../../css/citascomputadora.css";

export function AnadirCitasPc() {
  // Variables - Arrays para guardar los datos
  const [barberos, setBarberos] = useState([]);
  const [estilos, setEstilos] = useState([]);

  // Variables - Horas
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estilo, setEstilo] = useState("");
  const [barbero, setBarbero] = useState("");

  // Variables - Mensajes
  const [mensaje, setMensaje] = useState("");
  const [mensajeFecha, setMensajeFecha] = useState("");
  const [mensajeHora, setMensajeHora] = useState("");
  const [mensajeBarbero, setMensajeBarbero] = useState("");
  const [mensajeEstilo, setMensajeEstilo] = useState("");

  // Estado de carga
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    obtenerEstilos(setEstilos);
    obtenerBarberos(setBarberos);
  }, []);

  // Funciones para obtener los datos de los inputs
  const manejarCambioFecha = (e) => {
    setFecha(e.target.value);
  };
  const manejarCambioHora = (e) => {
    setHora(e.target.value);
  };
  const manejarCambioEstilo = (e) => {
    setEstilo(e.target.value);
  };
  const manejarCambioBarbero = (e) => {
    setBarbero(e.target.value);
  };

  // Función para llamar a la función de guardar las citas.
  async function manejarSubmit(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setCargando(true); // Iniciar carga
    await anadirCita(
      e,
      fecha,
      hora,
      barbero,
      estilo,
      setMensajeFecha,
      setMensajeHora,
      setMensajeBarbero,
      setMensajeEstilo,
      setMensaje
    );
    setCargando(false); // Finalizar carga
  }

  return (
    <>
      <TituloGenericos
        titulo={"AÑADIR CITA"}
        icono={CgAddR}
        clase="name-cita-pc"
        clase2="h1-pc-white"
      />
      <section className="section-citas-pc">
        <form onSubmit={manejarSubmit} className="form-citas-pc col-lg-7">
          <div className="div-inputs-cita-pc">
            <p>Fecha</p>
            <input type="date" value={fecha} onChange={manejarCambioFecha} />
            {mensajeFecha && <p>{mensajeFecha}</p>}
          </div>
          <div className="div-inputs-cita-pc">
            <p>Hora</p>
            <input type="time" value={hora} onChange={manejarCambioHora} />
            {mensajeHora && <p>{mensajeHora}</p>}
          </div>
          <div className="div-inputs-cita-pc">
            <p>Estilo</p>
            <select
              value={estilo}
              onChange={manejarCambioEstilo}
              className="select-estilos-pc"
            >
              <option value="">Selecciona un estilo</option>
              {estilos.map((estilo) => (
                <option key={estilo.estiloId} value={estilo.estiloId}>
                  {estilo.nombre}
                </option>
              ))}
            </select>
            {mensajeEstilo && <p>{mensajeEstilo}</p>}
          </div>
          <div className="div-inputs-cita-pc">
            <p>Nombre del Barbero</p>
            <select
              value={barbero}
              onChange={manejarCambioBarbero}
              className="select-barberos-pc"
            >
              <option value="">Selecciona un barbero</option>
              {barberos.map((barbero) => (
                <option key={barbero.barberoId} value={barbero.barberoId}>
                  {barbero.nombre}
                </option>
              ))}
            </select>
            {mensajeBarbero && <p>{mensajeBarbero}</p>}
          </div>
          {mensaje && <p>{mensaje}</p>}
          <div className="div-agregar-cita-pc">
            <button
              type="submit"
              className="btn-agregar-cita-pc"
              disabled={cargando}
            >
              {cargando ? "Cargando..." : "Agregar"}
            </button>
          </div>
        </form>
        <div className="col-lg-5">
          <img
            src="./agregarcita.webp"
            alt="agregarcita"
            className="img-fluid img-citas-pc"
          />
        </div>
      </section>
    </>
  );
}
