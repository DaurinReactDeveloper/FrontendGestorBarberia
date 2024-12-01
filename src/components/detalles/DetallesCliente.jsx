import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerClientesId } from "../../peticiones/ClientePeticiones";
import { obtenerCitasById } from "../../peticiones/CitasPeticiones";
import { obtenerComentariosClientes } from "../../peticiones/ComentariosPeticiones";
import calcularComentarios from "../../util/calculadoras/calcularComentarios";
import calcularCantidadCitas from "../../util/calculadoras/calcularCantidadCitas";
import ErrorCliente from "../Messages/ErrorCliente";
import Footer from "../../util/footer/Footer";
import Navbar from "../../util/navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../css/detallescliente.css";

export default function DetallesCliente() {
  const { id } = useParams();
  const [clientes, setClientes] = useState(null);
  const [citas, setCitas] = useState(null);
  const [comentarios, setComentarios] = useState(null);
  const [mensajeCitas, setMensajeCitas] = useState(null);
  const [mensajeCliente, setMensajeCliente] = useState(null);
  const [mensajeComentario, setMensajeComentario] = useState(null);
  const [cantidadComentarios, setCantidadComentarios] = useState(0);
  const [cantidadRealizada, setCantidadRealizada] = useState(0);
  const [cantidadCancelada, setCantidadCancelada] = useState(0);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    obtenerClientesId(id, setClientes, setMensajeCliente);
    obtenerCitasById(id, setCitas, setMensajeCitas);
    obtenerComentariosClientes(setComentarios, setMensajeComentario, id);
  }, [id]);

  useEffect(() => {
    if (citas) {
      calcularCantidadCitas(citas, setCantidadRealizada, setCantidadCancelada);
    }
  }, [citas]);

  useEffect(() => {
    if (comentarios) {
      calcularComentarios(comentarios, setCantidadComentarios);
    }
  }, [comentarios]);

  return (
    <>
      <Navbar />
      {mensajeCliente ? (
        <div>
          <ErrorCliente mensaje={mensajeCliente} />
        </div>
      ) : clientes ? (
        <>
          <section>
            <img
              src="/framedetallescliente.webp"
              alt="framedetallesbarbero"
              className="img-fluid"
            />
          </section>

          <section
            className="row row-section-detalle-cliente"
            data-aos="fade-right"
            data-aos-duration="3000"
          >
            <article className="col-lg-3 article-img-detalle-cliente">
              <div className="div-article-img-detalle-cliente">
                <img
                  src={clientes.imgcliente}
                  alt={`${clientes.nombre}`}
                  className="img-fluid img-detalle-cliente"
                />
              </div>
            </article>

            <article className="col-lg-5 article-inf-detalle-cliente">
              <div>
                <div className="div-h1-h2-detalle-cliente">
                  <h1 className="h1-hola-detalle-cliente">HOLA</h1>
                  <h2 className="h2-hola-detalle-cliente">
                    NOMBRE:{" "}
                    <span className="h2-span-detalle-cliente">
                      {clientes.nombre}
                    </span>
                  </h2>
                </div>
                <hr className="hr-detalle-cliente" />
                <p className="p-span-info-detalle">
                  <span className="span-info-detalle-cliente">Rol:</span>{" "}
                  <span className="span-info-cliente">Cliente</span>
                </p>
                <p className="p-span-info-detalle">
                  <span className="span-info-detalle-cliente">Email:</span>{" "}
                  <span className="span-info-email">{clientes.email}</span>
                </p>
                <p className="p-span-info-detalle">
                  <span className="span-info-detalle-cliente">Teléfono:</span>{" "}
                  <span className="span-info-telefono">
                    {clientes.telefono}
                  </span>
                </p>
              </div>
            </article>
          </section>

          <section>
            {/* TEMA */}
            {cantidadRealizada > 0 ||
            cantidadComentarios > 0 ||
            cantidadCancelada > 0 ? (
              <div className="div-h2-analisis-detalle-cliente">
                <h2 className="h2-analisis-detalle-cliente">
                  ANÁLISIS DEL CLIENTE
                </h2>
              </div>
            ) : null}

            {cantidadRealizada > 0 ||
            cantidadComentarios > 0 ||
            cantidadCancelada > 0 ? (
              <article className="article-analisis-detalle-cliente">
                {/* Citas Realizadas */}
                {cantidadRealizada > 0 && (
                  <div className="div-cantidad-citas-realizadas">
                    <div className="cantidad-citas-realizadas">
                      <p className="p-cantidad-citas-realizadas">
                        {cantidadRealizada}
                      </p>
                    </div>
                    <p>Citas Realizadas</p>
                  </div>
                )}

                {/* Cantidad Comentarios */}
                {cantidadComentarios > 0 && (
                  <div className="div-cantidad-comentarios-realizados">
                    <div className="cantidad-comentarios-realizados">
                      <p className="p-cantidad-comentarios-realizados">
                        {cantidadComentarios}
                      </p>
                    </div>
                    <p>Comentarios Realizados</p>
                  </div>
                )}

                {/* Cantidad Citas Canceladas*/}
                {cantidadCancelada > 0 && (
                  <div className="div-cantidad-cita-cancelada">
                    <div className="cantidad-cita-cancelada">
                      <p className="p-cantidad-cita-cancelada">
                        {cantidadCancelada}
                      </p>
                    </div>
                    <p>Citas Canceladas</p>
                  </div>
                )}
              </article>
            ) : null}
          </section>
        </>
      ) : (
        <ErrorCliente mensaje={mensajeCliente} />
      )}
      <Footer />
    </>
  );
}

