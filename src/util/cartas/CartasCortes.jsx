import React, { useEffect, useState } from "react";
import { obtenerEstilosBusqueda } from "../../peticiones/EstilosPeticiones";
import Aos from "aos";
import "aos/dist/aos.css";

export function CartasCortes() {
  const [estilosCortes, setEstilosCortes] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    obtenerEstilosBusqueda(setEstilosCortes, setMensaje);
    Aos.init();
  }, []);

  return (
    <>
      <section className="row section-carta-barbero">
        {mensaje && <p>{mensaje}</p>}
        {estilosCortes.map((item) => (
          <div
            key={item.estiloId}
            className="col-auto card card-estilo-barbero"
            data-aos="zoom-in-down"
          >
            <img
              src={item.imgestilo}
              className="card-img-top img-card-barbero"
              alt="barbero"
            />
            <div className="card-body card-body-barbero">
              <p className="card-text card-nombre-barbero">
                <strong>{item.nombre}</strong>
              </p>
              <p className="card-text card-nombre-barbero">
                {item.descripcion}
              </p>
              <p className="card-text card-telefono-barbero">
                Precio:<strong> ${item.precio} </strong>
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
