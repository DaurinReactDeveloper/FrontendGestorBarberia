import React, { useEffect, useState } from "react";
import Navbar from "../../util/navbar/Navbar";
import Footer from "../../util/footer/Footer";
import { useParams } from "react-router-dom";
import { obtenerBarberoId } from "../../peticiones/BarberosPeticiones";
import { obtenerComentariosBarbero } from "../../peticiones/ComentariosPeticiones";
import TablaBarbero from "../../util/tablas/TablaBarbero";
import ErrorBarbero from "../Messages/ErrorBarbero";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../css/detallesbarbero.css";

export default function DetallesBarbero() {
  const { id } = useParams();
  const [respuesta, setRespuesta] = useState("");
  const [barbero, setBarbero] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [mensajeComentarios, setMensajeComentarios] = useState();

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    obtenerBarberoId(setBarbero, setRespuesta, id);
    obtenerComentariosBarbero(setComentarios, setMensajeComentarios, id);
  }, [id]);

  return (
    <>
      <Navbar />

      {barbero ? (
        <>
          <section>
            <div>
              <div className="div-img-detalles-barbero">
                <img
                  src="/framedetalles.webp"
                  alt="imagenDetalles"
                  className="img-fluid img-detalles-barbero"
                />
              </div>

              <div
                className="div-img-barbero"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <img
                  src={barbero.imgbarbero}
                  alt={barbero.nombre}
                  className="img-barbero-detalle"
                />
              </div>
            </div>

            <div
              className="info-barbero-detalles"
              data-aos="fade-right"
              data-aos-duration="2000"
            >
              <h3 className="h3-titulos-informacion-barbero">
                INFORMACIÓN SOBRE EL BARBERO
              </h3>
              <p>Nombre: {barbero.nombre}</p>
              <p>Rol: Barbero</p>
              <p>Email: {barbero.email}</p>
              <p>Teléfono: {barbero.telefono}</p>
            </div>
          </section>

          <section data-aos="fade-right" data-aos-duration="2000">
            <h3 className="h3-titulos-comentarios-barbero">
              COMENTARIOS SOBRE EL BARBERO
            </h3>

            {comentarios.length > 0 ? (
              <TablaBarbero comentarios={comentarios} />
            ) : (
              <p className="mensaje-tabla-barbero">{mensajeComentarios}</p>
            )}
          </section>
        </>
      ) : (
        <ErrorBarbero mensaje={respuesta} />
      )}

      <Footer />
    </>
  );
}
