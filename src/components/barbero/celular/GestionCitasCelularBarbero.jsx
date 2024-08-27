import React, { useEffect, useState } from "react";
import { FaImagePortrait } from "react-icons/fa6";
import { CartasCitasCelularBarbero } from "../../../util/cartas/CartasCitasCelular";
import { obtenerCitasBarbero } from "../../../peticiones/CitasPeticiones";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";

export default function GestionCitasCelularBarbero() {
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    obtenerCitasBarbero(setCitas, setMensaje);
  }, []);

  return (
    <>
      <TituloGenericos titulo={"GESTION DE CITAS"} icono={FaImagePortrait} />

      <br />
      <br />

      <div>
        {citas.length > 0 ? (
          citas.map((citasCliente) => (
            <CartasCitasCelularBarbero
              key={citasCliente.citaId}
              estado={citasCliente.estado}
              img={citasCliente.estilo.imgestilo}
              alt="Citas"
              fecha={citasCliente.fecha}
              hora={citasCliente.hora}
              nombre={citasCliente.estilo.nombre}
              descripcion={citasCliente.estilo.descripcion}
              precio={citasCliente.estilo.precio}
              mostrarSoloEnProceso={true}
              citaId={citasCliente.citaId}
            />
          ))
        ) : (
          <p className="p-mensaje-table-barbero-pc">{mensaje}</p>
        )}
      </div>
    </>
  );
}
