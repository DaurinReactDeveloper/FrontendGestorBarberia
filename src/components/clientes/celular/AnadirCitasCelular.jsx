import React, { useEffect, useState } from "react";
import { CgAddR } from "react-icons/cg";
import {
  anadirCita,
  obtenerFechaActual,
} from "../../../peticiones/CitasPeticiones";
import { obtenerBarberosByBarberiaIdCliente } from "../../../peticiones/BarberosPeticiones";
import { obtenerEstilosAddCita } from "../../../peticiones/EstilosPeticiones";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { CartasEstiloCitas } from "../../../util/cartas/CartasEstilo";
import { IoMdAddCircleOutline } from "react-icons/io";
import "../../../css/agregarcitaspc.css";

export function AnadirCitaCelular() {
  // Variables - Arrays para guardar los datos
  const [barberos, setBarberos] = useState([]);
  const [estilos, setEstilos] = useState([]);

  // Variables - Inputs
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

  // Estado para la imagen, nombre y precio del estilo seleccionado
  const [imagen, setImagen] = useState("./agregarcita.webp");
  const [nombreEstilo, setNombreEstilo] = useState("");
  const [precioEstilo, setPrecioEstilo] = useState("");

  useEffect(() => {
    obtenerEstilosAddCita(setEstilos);
    obtenerBarberosByBarberiaIdCliente(setBarberos);
  }, []);

  const manejarCambioFecha = (e) => {
    setFecha(e.target.value);
  };

  const manejarCambioHora = (e) => {
    setHora(e.target.value);
  };

  const manejarCambioEstilo = (e) => {
    const estiloSeleccionado = estilos.find(
      (est) => est.estiloId === parseInt(e.target.value)
    );
    setEstilo(e.target.value);

    if (estiloSeleccionado) {
      setImagen(estiloSeleccionado.imgestilo || "./agregarcita.webp");
      setNombreEstilo(estiloSeleccionado.nombre || "");
      setPrecioEstilo(estiloSeleccionado.precio || "");
    } else {
      setImagen("./agregarcita.webp");
      setNombreEstilo("");
      setPrecioEstilo("");
    }
  };

  const manejarCambioBarbero = (e) => {
    setBarbero(e.target.value);
  };

  function manejarSubmit(e) {
    e.preventDefault();
    setCargando(true);
    anadirCita(
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
    setCargando(false);
    setImagen("./agregarcita.webp");
    setFecha("");
    setHora("");
    setBarbero("");
    setEstilo("");
  }

  return (
    <div>
      <TituloGenericos titulo={"AÑADIR CITA"} icono={CgAddR} />

      <br />
      <br />

      <section className="section-citas">
        <div className="col-cartas-estilo col-cartas-estilo">
          <CartasEstiloCitas
            imagen={imagen}
            nombre={nombreEstilo}
            precio={precioEstilo}
          />
        </div>

        <form onSubmit={manejarSubmit} className="form-citas">
          <div className="div-inputs-cita">
            <p>Fecha</p>
            <input
              type="date"
              value={fecha}
              onChange={manejarCambioFecha}
              min={obtenerFechaActual()}
              required
            />
            {mensajeFecha && <p>{mensajeFecha}</p>}
          </div>
          <div className="div-inputs-cita">
            <p>Hora</p>
            <input
              type="time"
              value={hora}
              onChange={manejarCambioHora}
              min="09:00"
              max="18:00"
              required
            />
            {mensajeHora && <p>{mensajeHora}</p>}
          </div>
          <div className="div-inputs-cita">
            <p>Estilo</p>
            <select
              value={estilo}
              onChange={manejarCambioEstilo}
              className="select-estilos"
              required
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
          <div className="div-inputs-cita">
            <p>Nombre del Barbero</p>
            <select
              value={barbero}
              onChange={manejarCambioBarbero}
              className="select-barberos"
              required
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
          {mensaje && <p className="mensaje-agregar-cita">{mensaje}</p>}
          <div className="div-agregar-cita">
            <button
              type="submit"
              className="btn-agregar-cita"
              disabled={cargando}
            >
              <IoMdAddCircleOutline/>
              {cargando ? "Guardando..." : "Agregar"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
