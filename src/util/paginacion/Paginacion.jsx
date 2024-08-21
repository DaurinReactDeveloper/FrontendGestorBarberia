import { useEffect, useState } from "react";
import "../../css/paginacion.css";
import Aos from "aos";
import "aos/dist/aos.css";

export function Paginacion({
  obtenerDatos,
  renderItem,
  elementosPorPagina,
  estado = "",
}) {
  const [items, setItems] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    obtenerDatos(setItems, setMensaje);
  }, []);

  // Filtrar las citas según el estado, o mostrar todas si estado está vacío
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
      {itemsFiltrados.length === 0 ? (
        <p>No hay citas en proceso</p>
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

//Paginaciones del Administrador
export function PaginacionBarberos({ obtenerDatos, elementosPorPagina }) {
  const [barberos, setBarberos] = useState([]);
  const [respuesta, setRespuesta] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    obtenerDatos(setBarberos, setRespuesta);
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
      {barberos.length === 0 ? (
        <p>{respuesta || "No hay barberos disponibles"}</p>
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

  useEffect(() => {
    obtenerDatos(setCliente, setRespuesta);
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
      {clientes.length === 0 ? (
        <p>{respuesta || "No hay Clientes disponibles"}</p>
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

export function PaginacionCortes({ obtenerDatos, elementosPorPagina }) {
  const [cortes, setCortes] = useState([]);
  const [respuesta, setRespuesta] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    obtenerDatos(setCortes, setRespuesta);
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
      {cortes.length === 0 ? (
        <p>{respuesta || "No hay Cortes disponibles"}</p>
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
                  alt="barbero"
                />
                <div className="card-body card-body-paginacion-barbero">
                  <p className="card-text">
                    {" "}
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
