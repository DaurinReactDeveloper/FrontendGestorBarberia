import React, { useState, useEffect } from "react";
import Navbar from "../../util/navbar/Navbar";
import Footer from "../../util/footer/Footer";
import { RiScissors2Fill } from "react-icons/ri";
import { obtenerEstilosBusqueda } from "../../peticiones/EstilosPeticiones";
import { TituloGenericos } from "../../util/titulos/TituloGenericos";
import AOS from "aos";
import "aos/dist/aos.css";
import "./../../css/estiloscorte.css";

export default function Estilos() {
  return (
    <>
      <Navbar />
      <main>
        <TituloGenericos titulo={"ESTILOS DE CORTES"} icono={RiScissors2Fill} />
        <CartasEstilo />
      </main>
      <Footer />
    </>
  );
}

function CartasEstilo() {
  const [data, setData] = useState([]);
  const [respuesta, setRespuesta] = useState(null);

  useEffect(() => {
    obtenerEstilosBusqueda(setData, setRespuesta);
    AOS.init();
  }, []);

  return (
    <>
      <section className="row section-carta">
        {respuesta && <p>{respuesta}</p>}
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
      </section>
    </>
  );
}
