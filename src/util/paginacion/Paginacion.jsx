import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../css/paginacion.css";

export function Paginacion({
  obtenerDatos,
  renderItem,
  elementosPorPagina,
  estado = "",
}) {
  const [items, setItems] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      await obtenerDatos(setItems, setMensaje);
      setCargando(false);
    };
    cargarDatos();
  }, []);

  const itemsFiltrados = estado
    ? items.filter((item) => item.estado === estado)
    : items;

  const totalPaginas = Math.ceil(itemsFiltrados.length / elementosPorPagina);
  const indiceUltimaItem = paginaActual * elementosPorPagina;
  const indicePrimeraItem = indiceUltimaItem - elementosPorPagina;
  const itemsActuales = itemsFiltrados.slice(
    indicePrimeraItem,
    indiceUltimaItem
  );

  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <>
      {cargando ? (
        <p className="p-mensaje-carga-paginacion">Cargando...</p>
      ) : itemsFiltrados.length === 0 ? (
        <p className="p-mensaje-carga-paginacion">No hay citas en proceso</p>
      ) : (
        <div>
          <div className="row row-mis-citas-pc">
            {itemsActuales.map(renderItem)}
          </div>
          {totalPaginas > 1 && (
            <ul className="pagination-pc justify-content-center">
              <li
                className={`page-item-pagination-pc ${
                  paginaActual === 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link-paginacion-pc"
                  onClick={() => irAPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                >
                  Anterior
                </button>
              </li>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                .slice(0, 8)
                .map((numero) => (
                  <li
                    key={numero}
                    className={`page-item ${
                      paginaActual === numero ? "active" : ""
                    }`}
                  >
                    <button
                      className={`page-link page-link-paginacion-pc ${
                        paginaActual === numero ? "active" : ""
                      }`}
                      onClick={() => irAPagina(numero)}
                    >
                      {numero}
                    </button>
                  </li>
                ))}
              {totalPaginas > 8 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              <li
                className={`page-item-pagination-pc ${
                  paginaActual === totalPaginas ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link-paginacion-pc"
                  onClick={() => irAPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}

//Paginaciones del Administrador
export function PaginacionBarberos({ obtenerDatos, elementosPorPagina }) {
  const [barberos, setBarberos] = useState([]);
  const [respuesta, setRespuesta] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(false); // Estado de carga

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true); // Iniciar carga
      await obtenerDatos(setBarberos, setRespuesta);
      setCargando(false); // Finalizar carga
    };
    cargarDatos();
    Aos.init();
  }, []);

  const totalPaginas = Math.ceil(barberos.length / elementosPorPagina);
  const indiceUltimaItem = paginaActual * elementosPorPagina;
  const indicePrimeraItem = indiceUltimaItem - elementosPorPagina;
  const barberosActuales = barberos.slice(indicePrimeraItem, indiceUltimaItem);

  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const truncarEmail = (email) => {
    return email.length > 24 ? email.slice(0, 10) + "***" : email;
  };

  return (
    <>
      {cargando ? (
       <p className="p-mensaje-carga-paginacion">Cargando...</p> // Mensaje de carga
      ) : barberos.length === 0 ? (
        <p className="p-mensaje-carga-paginacion">{respuesta || "No hay barberos disponibles"}</p> // Mensaje si no hay barberos
      ) : (
        <div>
          <section className="section-principal-paginacion-barbero">
            {barberosActuales.map((item) => (
              <div
                key={item.barberoId}
                className="col-paginacion-barbero"
                data-aos="zoom-in-down"
              >
                <img
                  src={item.imgbarbero}
                  className="card-img-top img-paginacion-barbero"
                  alt="barbero"
                />
                <div className="card-body card-body-paginacion-barbero">
                  <p className="card-text card-text-datos-personales-paginacion-barbero">
                    <strong>DATOS PERSONALES</strong>
                  </p>
                  <p className="card-text">Nombre: {item.nombre}</p>
                  <p className="card-text">Email: {truncarEmail(item.email)}</p>
                  <p className="card-text">Teléfono: {item.telefono}</p>
                </div>
              </div>
            ))}
          </section>
          {totalPaginas > 1 && (
            <ul className="pagination-pc justify-content-center">
              <li
                className={`page-item-pagination-pc ${
                  paginaActual === 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link-paginacion-pc"
                  onClick={() => irAPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                >
                  Anterior
                </button>
              </li>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                (numero) => (
                  <li
                    key={numero}
                    className={`page-item ${
                      paginaActual === numero ? "active" : ""
                    }`}
                  >
                    <button
                      className={`page-link page-link-paginacion-pc ${
                        paginaActual === numero ? "active" : ""
                      }`}
                      onClick={() => irAPagina(numero)}
                    >
                      {numero}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item-pagination-pc ${
                  paginaActual === totalPaginas ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link-paginacion-pc"
                  onClick={() => irAPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export function PaginacionClientes({ obtenerDatos, elementosPorPagina }) {
  const [clientes, setCliente] = useState([]);
  const [respuesta, setRespuesta] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(false); // Estado de carga

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true); // Iniciar carga
      await obtenerDatos(setCliente, setRespuesta);
      setCargando(false); // Finalizar carga
    };
    cargarDatos();
    Aos.init();
  }, []);

  const totalPaginas = Math.ceil(clientes.length / elementosPorPagina);
  const indiceUltimaItem = paginaActual * elementosPorPagina;
  const indicePrimeraItem = indiceUltimaItem - elementosPorPagina;
  const clienteActual = clientes.slice(indicePrimeraItem, indiceUltimaItem);

  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const truncarEmail = (email) => {
    return email.length > 24 ? email.slice(0, 10) + "***" : email;
  };

  return (
    <>
      {cargando ? (
        <p className="p-mensaje-carga-paginacion">Cargando...</p> // Mensaje de carga
      ) : clientes.length === 0 ? (
        <p className="p-mensaje-carga-paginacion">{respuesta || "No hay Clientes disponibles"}</p> // Mensaje si no hay clientes
      ) : (
        <div>
          <section className="section-principal-paginacion-barbero">
            {clienteActual.map((item) => (
              <div
                key={item.clienteId}
                className="col-paginacion-barbero"
                data-aos="zoom-in-down"
              >
                <img
                  src={item.imgcliente}
                  className="card-img-top img-paginacion-barbero"
                  alt="cliente"
                />
                <div className="card-body card-body-paginacion-barbero">
                  <p className="card-text card-text-datos-personales-paginacion-barbero">
                    <strong>DATOS PERSONALES</strong>
                  </p>
                  <p className="card-text">Nombre: {item.nombre}</p>
                  <p className="card-text">Email: {truncarEmail(item.email)}</p>
                  <p className="card-text">Teléfono: {item.telefono}</p>
                </div>
              </div>
            ))}
          </section>
          {totalPaginas > 1 && (
            <ul className="pagination-pc justify-content-center">
              <li
                className={`page-item-pagination-pc ${
                  paginaActual === 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link-paginacion-pc"
                  onClick={() => irAPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                >
                  Anterior
                </button>
              </li>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                (numero) => (
                  <li
                    key={numero}
                    className={`page-item ${
                      paginaActual === numero ? "active" : ""
                    }`}
                  >
                    <button
                      className={`page-link page-link-paginacion-pc ${
                        paginaActual === numero ? "active" : ""
                      }`}
                      onClick={() => irAPagina(numero)}
                    >
                      {numero}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item-pagination-pc ${
                  paginaActual === totalPaginas ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link-paginacion-pc"
                  onClick={() => irAPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export function PaginacionCortes({ obtenerDatos, elementosPorPagina }) {
  const [cortes, setCortes] = useState([]);
  const [respuesta, setRespuesta] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(false); // Estado de carga

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true); // Iniciar carga
      await obtenerDatos(setCortes, setRespuesta);
      setCargando(false); // Finalizar carga
    };
    cargarDatos();
    Aos.init();
  }, []);

  const totalPaginas = Math.ceil(cortes.length / elementosPorPagina);
  const indiceUltimaItem = paginaActual * elementosPorPagina;
  const indicePrimeraItem = indiceUltimaItem - elementosPorPagina;
  const corteActual = cortes.slice(indicePrimeraItem, indiceUltimaItem);

  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <>
      {cargando ? (
        <p className="p-mensaje-carga-paginacion">Cargando...</p> // Mensaje de carga
      ) : cortes.length === 0 ? (
        <p className="p-mensaje-carga-paginacion">{respuesta || "No hay Cortes disponibles"}</p> // Mensaje si no hay cortes
      ) : (
        <div>
          <section className="section-principal-paginacion-barbero">
            {corteActual.map((item) => (
              <div
                key={item.estiloId}
                className="col-paginacion-barbero"
                data-aos="zoom-in-down"
              >
                <img
                  src={item.imgestilo}
                  className="card-img-top img-paginacion-barbero"
                  alt="corte"
                />
                <div className="card-body card-body-paginacion-barbero">
                  <p className="card-text">
                    <strong>{item.nombre}</strong>
                  </p>
                  <p className="card-text">{item.descripcion}</p>
                  <p className="card-text">
                    Precio: <strong>${item.precio}</strong>
                  </p>
                </div>
              </div>
            ))}
          </section>
          {totalPaginas > 1 && (
            <ul className="pagination-pc justify-content-center">
              <li
                className={`page-item-pagination-pc ${
                  paginaActual === 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link-paginacion-pc"
                  onClick={() => irAPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                >
                  Anterior
                </button>
              </li>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                (numero) => (
                  <li
                    key={numero}
                    className={`page-item ${
                      paginaActual === numero ? "active" : ""
                    }`}
                  >
                    <button
                      className={`page-link page-link-paginacion-pc ${
                        paginaActual === numero ? "active" : ""
                      }`}
                      onClick={() => irAPagina(numero)}
                    >
                      {numero}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item-pagination-pc ${
                  paginaActual === totalPaginas ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link-paginacion-pc"
                  onClick={() => irAPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}