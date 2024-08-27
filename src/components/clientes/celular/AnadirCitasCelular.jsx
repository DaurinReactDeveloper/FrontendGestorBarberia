import { useEffect, useState } from "react";
import { CgAddR } from "react-icons/cg";
import { anadirCita } from "../../../peticiones/CitasPeticiones";
import { obtenerBarberos } from "../../../peticiones/BarberosPeticiones";
import { obtenerEstilos } from "../../../peticiones/EstilosPeticiones";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";

// Agregar Citas
export function AnadirCitaCelular() {
  // Variables - Arrays para guardar los datos
  const [barberos, setBarberos] = useState([]);
  const [estilos, setEstilos] = useState([]);

  // Variables - de los Inputs
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estilo, setEstilo] = useState("");
  const [barbero, setBarbero] = useState("");

  // Variables - Mensaje
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
    <div>
      <TituloGenericos titulo={"AÑADIR CITA"} icono={CgAddR} />
      <br />
      <form onSubmit={manejarSubmit}>
        <div className="div-inputs-cita">
          <p>Fecha</p>
          <input type="date" value={fecha} onChange={manejarCambioFecha} />
          {mensajeFecha && <p>{mensajeFecha}</p>}
        </div>
        <div className="div-inputs-cita">
          <p>Hora</p>
          <input type="time" value={hora} onChange={manejarCambioHora} />
          {mensajeHora && <p>{mensajeHora}</p>}
        </div>
        <div className="div-inputs-cita">
          <p>Estilo</p>
          <select
            value={estilo}
            onChange={manejarCambioEstilo}
            className="select-estilos"
          >
            <option>Selecciona un estilo</option>
            {estilos.map((estilo) => (
              <option key={estilo.estiloId} value={estilo.estiloId}>
                {estilo.nombre}
              </option>
            ))}
          </select>
          {mensajeEstilo && <p>{mensajeEstilo}</p>}
        </div>
        <div className="div-inputs-cita">
          <p>Nombre del Barbero</p>
          <select
            value={barbero}
            onChange={manejarCambioBarbero}
            className="select-barberos"
          >
            <option>Selecciona un barbero</option>
            {barberos.map((barbero) => (
              <option key={barbero.barberoId} value={barbero.barberoId}>
                {barbero.nombre}
              </option>
            ))}
          </select>
          {mensajeBarbero && <p>{mensajeBarbero}</p>}
        </div>
        {mensaje && <p>{mensaje}</p>}
        <div className="div-agregar-cita">
          <button
            type="submit"
            className="btn-agregar-cita"
            disabled={cargando}
          >
            {cargando ? "Cargando..." : "Agregar"}
          </button>
        </div>
      </form>
    </div>
  );
}
