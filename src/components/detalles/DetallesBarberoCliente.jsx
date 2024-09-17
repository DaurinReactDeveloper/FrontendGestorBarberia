import React, { useEffect, useState } from "react";
import Navbar from "../../util/navbar/Navbar";
import Footer from "../../util/footer/Footer";
import { Link, useParams } from "react-router-dom";
import { obtenerBarberoId } from "../../peticiones/BarberosPeticiones";
import {
  obtenerComentariosBarbero,
  obtenerComentariosClientes,
} from "../../peticiones/ComentariosPeticiones";
import TablaBarbero from "../../util/tablas/TablaBarbero";
import { obtenerClientesId } from "../../peticiones/ClientePeticiones";
import "../../css/detallesbarbero.css";
import { obtenerCitasById } from "../../peticiones/CitasPeticiones";

export function DetallesBarbero() {
  const { id } = useParams();
  const [respuesta, setRespuesta] = useState("");
  const [Barbero, setBarbero] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [mensajeComentarios, setMensajeComentarios] = useState();

  useEffect(() => {
    obtenerBarberoId(setBarbero, setRespuesta, id);
    obtenerComentariosBarbero(setComentarios, setMensajeComentarios, id);
  }, [id]);

  return (
    <>
      <Navbar />

      <section>
        {Barbero ? (
          <div>
            <div>
              <div className="div-img-detalles-barbero">
                <img
                  src="/framedetalles.webp"
                  alt="imagenDetalles"
                  className="img-fluid img-detalles-barbero"
                />
              </div>

              <div className="div-img-barbero">
                <img
                  src={Barbero.imgbarbero}
                  alt={`${Barbero.nombre}`}
                  className="img-barbero-detalle"
                />
              </div>
            </div>

            <div className="info-barbero-detalles">
              <h3 className="h3-titulos-informacion-barbero">
                INFORMACIÓN SOBRE EL BARBERO
              </h3>
              <p>Nombre: {Barbero.nombre}</p>
              <p>Rol: Barbero</p>
              <p>Email: {Barbero.email}</p>
              <p>Telefono: {Barbero.telefono}</p>
            </div>
          </div>
        ) : (
          <p>Cargando detalles...</p>
        )}
      </section>

      <section>
        <h3 className="h3-titulos-comentarios-barbero">
          COMENTARIOS SOBRE EL BARBERO
        </h3>

        {comentarios.length > 0 ? (
          <TablaBarbero comentarios={comentarios} />
        ) : (
          <p className="mensaje-tabla-barbero">{mensajeComentarios}</p>
        )}
      </section>

      <Footer />
    </>
  );
}

export function DetallesCliente() {
  const { id } = useParams();
  const [clientes, setClientes] = useState(null);
  const [citas, setCitas] = useState(null);
  const [comentarios, setComentarios] = useState(null);
  const [mensajeCitas, setMensajeCitas] = useState(null);
  const [mensajeCliente, setMensajeCliente] = useState(null); // Para manejar errores o cuando no hay cliente
  const [mensajeComentario, setMensajeComentario] = useState(null);
  const [cantidadComentarios, setCantidadComentarios] = useState(0);
  const [cantidadRealizada, setCantidadRealizada] = useState(0);
  const [cantidadCancelada, setCantidadCancelada] = useState(0);

  useEffect(() => {
    obtenerClientesId(id, setClientes, setMensajeCliente);
    obtenerCitasById(id,setCitas, setMensajeCitas);
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

      <section>
        {/* Si el cliente existe, mostramos los detalles. Si no existe o hay error, mostramos el mensaje correspondiente */}
        {clientes ? (
          <div>
            <div>
              <div className="div-img-detalles-barbero">
                <img
                  src="/framedetalles.webp"
                  alt="imagenDetalles"
                  className="img-fluid img-detalles-barbero"
                />
              </div>

              <div className="div-img-barbero">
                <img
                  src={clientes.imgcliente}
                  alt={`${clientes.nombre}`}
                  className="img-barbero-detalle"
                />
              </div>
            </div>

            <div className="info-barbero-detalles">
              <h3 className="h3-titulos-informacion-barbero">
                INFORMACIÓN SOBRE EL CLIENTE
              </h3>
              <p>Nombre: {clientes.nombre}</p>
              <p>Rol: Cliente</p>
              <p>Email: {clientes.email}</p>
              <p>Telefono: {clientes.telefono}</p>
            </div>

            <section>
              <h3 className="h3-titulos-comentarios-barbero">
                ANÁLISIS DEL CLIENTE
              </h3>

              <section className="section-clientes-detalles">
                {/* SERVICIOS OFRECIDOS*/}
                {cantidadRealizada > 0 && (
                  <div className="div-contenedor-cantidades-detalles">
                    <div className="div-cantidad-clientes-detalles">
                      <p>{cantidadRealizada}</p>
                    </div>
                    <p className="p-titulo-clientes-detalles">
                      Citas Realizadas
                    </p>
                  </div>
                )}

                {cantidadComentarios > 0 && (
                  <div className="div-contenedor-cantidades-detalles">
                    <div className="div-cantidad-clientes-detalles">
                      <p>{cantidadComentarios}</p>
                    </div>
                    <p className="p-titulo-clientes-detalles">
                      Comentarios Realizados
                    </p>
                  </div>
                )}

                {cantidadCancelada > 0 && (
                  <div className="div-contenedor-cantidades-detalles">
                    <div className="div-cantidad-clientes-detalles">
                      <p>{cantidadCancelada}</p>
                    </div>
                    <p className="p-titulo-clientes-detalles">
                      Citas Canceladas
                    </p>
                  </div>
                )}
              </section>
            </section>
          </div>
        ) : mensajeCliente ? ( // Si hay un mensaje de error o el cliente no existe
          <div>
            <ErrorCliente mensaje={mensajeCliente} />
          </div>
        ) : (
          <p>Cargando detalles...</p> // Si no hay error y aún se están cargando los datos
        )}
      </section>

      <Footer />
    </>
  );
}

function ErrorCliente({ mensaje }) {
  return (
    <>
      <section>
        <div className="div-img-Notfount-detalles">
          <img
            src="/NotFound.webp"
            alt="NotFound"
            className="img-fluid img-Notfount-detalles"
          />
        </div>
        <p className="p-mensaje-error-detalles-barbero">{mensaje}</p>
        <p className="text-mensaje-error-detalles-barbero">
          Lamentablemente, no hemos podido encontrar la
          información del cliente en nuestro sistema. Es posible que el cliente
          no exista o que se haya producido un error en la búsqueda. Por favor,
          verifique los datos proporcionados o póngase en contacto con el
          servicio de soporte para recibir asistencia adicional.
        </p>
        <div className="div-button-volver-al-inicio">
        <Link type="button" className="button-volver-al-inicio" to={"/"}>VOLVER AL INICIO</Link>
        </div>
      </section>
    </>
  );
}

function calcularCantidadCitas(
  citas,
  setCantidadRealizada,
  setCantidadCancelada
) {
  let contadorRealizadas = 0;
  let contadorCanceladas = 0;

  for (let i = 0; i < citas.length; i++) {
    if (citas[i].estado === "Realizada") {
      contadorRealizadas++;
    }

    if (citas[i].estado === "Cancelada") {
      contadorCanceladas++;
    }
  }
  setCantidadRealizada(contadorRealizadas);
  setCantidadCancelada(contadorCanceladas);
}

function calcularComentarios(comentario, setCantidadComentario) {
  let contadorComentarios = 0;

  for (let i = 0; i < comentario.length; i++) {
    contadorComentarios++;
  }

  setCantidadComentario(contadorComentarios);
}