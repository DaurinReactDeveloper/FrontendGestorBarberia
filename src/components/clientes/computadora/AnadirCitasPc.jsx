import React, { useEffect, useState } from "react";
import { CgAddR } from "react-icons/cg";
import { anadirCita } from "../../../peticiones/CitasPeticiones";
import { obtenerBarberos } from "../../../peticiones/BarberosPeticiones";
import { obtenerEstilos } from "../../../peticiones/EstilosPeticiones";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import "../../../css/citascomputadora.css";

export function AnadirCitasPc() {
  const [barberos, setBarberos] = useState([]);
  const [estilos, setEstilos] = useState([]);
  const [fecha, setFecha] = useState("");
  9;
  const [estilo, setEstilo] = useState("");
  const [barbero, setBarbero] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajeFecha, setMensajeFecha] = useState("");
  const [mensajeBarbero, setMensajeBarbero] = useState("");
  const [mensajeEstilo, setMensajeEstilo] = useState("");

  useEffect(() => {
    obtenerEstilos(setEstilos);
    obtenerBarberos(setBarberos);
  }, []);

  const manejarCambioFecha = (e) => {
    setFecha(e.target.value);
  };

  const manejarCambioEstilo = (e) => {
    setEstilo(e.target.value);
  };

  const manejarCambioBarbero = (e) => {
    setBarbero(e.target.value);
  };

  function manejarSubmit(e) {
    return anadirCita(
      e,
      fecha,
      barbero,
      estilo,
      setMensajeFecha,
      setMensajeBarbero,
      setMensajeEstilo,
      setMensaje
    );
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
            <input
              type="datetime-local"
              value={fecha}
              onChange={manejarCambioFecha}
            />
            {mensajeFecha && <p>{mensajeFecha}</p>}
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
            <button type="submit" className="btn-agregar-cita-pc">
              Agregar
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
