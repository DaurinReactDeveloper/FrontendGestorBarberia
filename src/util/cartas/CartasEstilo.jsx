import React, { useEffect, useState } from "react";
import { obtenerEstilosBusqueda } from "../../peticiones/EstilosPeticiones";
import AOS from "aos";
import "aos/dist/aos.css";
import "./../../css/estiloscorte.css";

export function CartasEstilo() {
    const [data, setData] = useState([]);
    const [respuesta, setRespuesta] = useState(null);
    const [cargando, setCargando] = useState(true); // Estado para controlar la carga
  
    useEffect(() => {
      obtenerEstilosBusqueda(setData, setRespuesta).finally(() => {
        setCargando(false); // Cambiar a false cuando se complete la carga
      });
      AOS.init();
    }, []);
  
    return (
      <>
        <section className="row section-carta">
          {cargando ? ( // Mostrar cargador si está cargando
            <p className="p-mensaje-carga-cartas">Cargando...</p>
          ) : (
            <>
              {respuesta && <p>{respuesta}</p>}
              {data.length === 0 && <p>No hay estilos disponibles.</p>}
              {data.map((item) => (
                <div
                  key={item.estiloId}
                  className="col-auto card card-estilo"
                  data-aos="fade-up-right"
                >
                  <img
                    src={item.imgestilo}
                    className="card-img-top img-card"
                    alt="Estilo"
                  />
                  <div className="card-body">
                    <h5 className="card-title cardtitule">{item.nombre}</h5>
                    <p className="card-text cardtext">{item.descripcion}</p>
                    <p className="card-text card-precio-estilo">${item.precio}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </section>
      </>
    );
  }
  
export function CartasEstiloCitas({ imagen, nombre, precio }) {

    useEffect(() => {
      AOS.init();
    }, []);
  
    return (
      <div className="col-auto card card-estilo card-estilo-citas" data-aos="fade-up-right">
        <img
          src={imagen}
          className="card-img-top img-card"
          alt={nombre}
        />
        <div className="card-body">
          <h5 className="card-title cardtitule">{nombre}</h5>
          <p className="card-text card-precio-estilo">${precio}</p>
        </div>
      </div>
    );
}