import React, { useEffect, useState } from "react";
import { FaImagePortrait } from "react-icons/fa6";
import { obtenerCitasBarberoById } from "../../../peticiones/CitasPeticiones";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { CartasCitas } from "../../../util/cartas/CartasCitas";

export default function GestionCitasCelularBarbero() {
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    obtenerCitasBarberoById(setCitas, setMensaje);
  }, []);

  return (
    <>
      <TituloGenericos titulo={"GESTION DE CITAS"} icono={FaImagePortrait} />

      <br />
      <br />

      <div>
        {citas.length > 0 ? (
          citas.map((citasCliente) => (
            <CartasCitas
              key={citasCliente.citaId}
              estado={citasCliente.estado}
              img={citasCliente.estilo.imgestilo}
              alt="Citas"
              fecha={citasCliente.fecha}
              hora={citasCliente.hora}
              nombre={citasCliente.estilo.nombre}
              descripcion={citasCliente.estilo.descripcion}
              precio={citasCliente.estilo.precio}
              citaId={citasCliente.citaId}
              mostrarSoloEnProceso={true}
              esBarbero={true}
              esCliente={false}
              clienteId={citasCliente.clienteId}
            />
          ))
        ) : (
          <p className="p-mensaje-table-barbero-pc">{mensaje}</p>
        )}
      </div>
    </>
  );
}
