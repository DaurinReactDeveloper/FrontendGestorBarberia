import { useEffect, useState } from "react";
import {
  eliminarBarbero,obtenerBarberosByClienteBarberiaId
} from "../../peticiones/BarberosPeticiones";
import {
  eliminarCliente,
  obtenerClientesByAdminId,
} from "../../peticiones/ClientePeticiones";
import { TiUserDelete } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "./../../css/cartabarberobusqueda.css";

export function CartasBarbero({busqueda = true,claseBusqueda}) {
  const [barberos, setBarberos] = useState([]);
  const [respuesta, setRespuesta] = useState(null);
  const [cargando, setCargando] = useState(true); // Estado para controlar la carga
  const [mensajeBarbero, setMensajeBarbero] = useState(""); // Estado de carga

  useEffect(() => {
    obtenerBarberosByClienteBarberiaId(setBarberos, setRespuesta).finally(() => {
      setCargando(false); // Cambiar a false cuando se complete la carga
    });
    Aos.init();
  }, []);

  const truncarEmail = (email) => {
    return email.length >= 21 ? email.slice(0, 10) + "***" : email;
  };

  function llamarEliminarBarbero(idBarbero) {
    eliminarBarbero(idBarbero, setMensajeBarbero);
  }

  return (
    <>
      <section className="row section-carta-barbero">
        {cargando ? ( // Mostrar cargador si está cargando
          <p className="p-mensaje-carga-cartas">Cargando...</p>
        ) : (
          <>
            {respuesta && <p>{respuesta}</p>}
            {barberos.length === 0 && (
              <p className="p-mensaje-baberos">No hay barberos disponibles.</p>
            )}

            {barberos.map((item) => (
              <div
                key={item.barberoId}
                className="col-auto card card-estilo-barbero"
                data-aos="zoom-in-down"
              >
                {busqueda &&  
                <div className="div-delete-barbero">
                  <button
                    type="button"
                    className="button-delete-barbero"
                    onClick={() => llamarEliminarBarbero(item.barberoId)}
                  >
                    <MdDelete
                      className="icon-delete-barbero"
                      title="Eliminar"
                    />
                  </button>
                </div>}
               
                <img
                  src={item.imgbarbero}
                  className={`card-img-top img-card-barbero ${claseBusqueda}`}
                  alt="barbero"
                />
                <div className="card-body card-body-barbero">
                  <p className="card-text card-datos-barbero datos-personales-card">
                    DATOS PERSONALES
                  </p>
                  <p className="card-text card-nombre-barbero">
                    Nombre: {item.nombre}
                  </p>
                  <p className="card-text card-nombre-barbero">
                    Email: {truncarEmail(item.email)}
                  </p>
                  <p className="card-text card-telefono-barbero">
                    Teléfono: {item.telefono}
                  </p>
                </div>
                
                {mensajeBarbero && <p className="carta-mensaje">{mensajeBarbero}</p>}

                {/* Boton ver detalles */}
                <div className="div-button-cartas-busqueda-barbero">
                  <Link
                    type="button"
                    className="button-cartas-busqueda-barbero"
                    to={`/DetallesBarbero/${item.barberoId}`}
                  >
                    VER DETALLES
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </section>
    </>
  );
}

export function CartasCliente() {
  const [clientes, setClientes] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(true); // Estado para controlar la carga
  const [mensajeCliente, setMensajeCliente] = useState(""); // Estado de carga

  useEffect(() => {
    obtenerClientesByAdminId(setClientes, setMensaje).finally(() => {
      setCargando(false); // Cambiar a false cuando se complete la carga
    });
    Aos.init();
  }, []);

  function llamarEliminarCliente(idCliente) {
    eliminarCliente(idCliente,setMensajeCliente);
  }

  return (
    <>
      <section className="row section-carta-barbero">
        {cargando ? ( // Mostrar cargador si está cargando
          <p className="p-mensaje-carga-cartas">Cargando...</p>
        ) : (
          <>
            {mensaje && <p>{mensaje}</p>}
            {clientes.length === 0 && <p>No hay clientes disponibles.</p>}
            {clientes.map((item) => (
              <div
                key={item.clienteId}
                className="col-12 card card-estilo-barbero"
                data-aos="zoom-in-down"
              >
                <div className="div-delete-cliente">
                  <button type="button" className="button-delete-cliente" onClick={() => llamarEliminarCliente(item.clienteId)}>
                    <TiUserDelete
                      className="icon-delete-cliente"
                      title="Eliminar"
                    />
                  </button>
                </div>
                <img
                  src={item.imgcliente}
                  className="card-img-top img-card-barbero"
                  alt="cliente"
                />
                <div className="card-body card-body-barbero">
                  <p className="card-text card-datos-barbero">
                    <strong>DATOS PERSONALES</strong>
                  </p>
                  <p className="card-text card-nombre-barbero">
                    Nombre: {item.nombre}
                  </p>
                  <p className="card-text card-nombre-barbero">
                    Email: {item.email}
                  </p>
                  <p className="card-text card-telefono-barbero">
                    Teléfono: {item.telefono}
                  </p>
                </div>

                {mensajeCliente && <p className="carta-mensaje">{mensajeCliente}</p>}

                {/* Boton ver detalles */}
                <div className="div-button-cartas-busqueda-barbero">
                  <Link
                    type="button"
                    className="button-cartas-busqueda-barbero"
                    to={`/DetallesCliente/${item.clienteId}`}
                  >
                    VER DETALLES
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </section>
    </>
  );
}
