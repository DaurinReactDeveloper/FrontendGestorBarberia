import React from 'react'
import { Link } from 'react-router-dom';

export default function ErrorCliente({ mensaje }) {
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
            Lamentablemente, no hemos podido encontrar la información del cliente
            en nuestro sistema. Es posible que el cliente no exista o que se haya
            producido un error en la búsqueda. Por favor, verifique los datos
            proporcionados o póngase en contacto con el servicio de soporte para
            recibir asistencia adicional.
          </p>
          <div className="div-button-volver-al-inicio">
            <Link type="button" className="button-volver-al-inicio" to={"/"}>
              VOLVER AL INICIO
            </Link>
          </div>
        </section>
      </>
    );
  }