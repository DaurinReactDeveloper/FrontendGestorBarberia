import { useEffect, useState } from "react";
import { obtenerBarberosData } from "../../peticiones/BarberosPeticiones";
import { obtenerClientes } from "../../peticiones/ClientePeticiones";
import Aos from "aos";
import "aos/dist/aos.css";
import "./../../css/cartabarberobusqueda.css";

export function CartasBarbero() {
  const [barberos, setBarberos] = useState([]);
  const [respuesta, setRespuesta] = useState(null);

  useEffect(() => {
    obtenerBarberosData(setBarberos, setRespuesta);
    Aos.init();
  }, []);

  const truncarEmail = (email) => {
    return email.length >= 24 ? email.slice(0, 10) + "***" : email;
  };

  return (
    <>
      <section className="row section-carta-barbero">
        {respuesta && <p>{respuesta}</p>}
        {barberos.map((item) => (
          <div
            key={item.barberoId}
            className="col-auto card card-estilo-barbero"
            data-aos="zoom-in-down"
          >
            <img
              src={item.imgbarbero}
              className="card-img-top img-card-barbero"
              alt="barbero"
            />
            <div className="card-body card-body-barbero">
              <p className="card-text card-datos-barbero">
                <strong>DATOS PERSONALES</strong>
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
          </div>
        ))}
      </section>
    </>
  );
}

export function CartasCliente() {
  const [clientes, setClientes] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    obtenerClientes(setClientes, setMensaje);
    Aos.init();
  }, []);

  return (
    <>
      <section className="row section-carta-barbero">
        {mensaje && <p>{mensaje}</p>}
        {clientes.map((item) => (
          <div
            key={item.clienteId}
            className="col-12 card card-estilo-barbero"
            data-aos="zoom-in-down"
          >
            <img
              src={item.imgcliente}
              className="card-img-top img-card-barbero"
              alt="barbero"
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
          </div>
        ))}
      </section>
    </>
  );
}
