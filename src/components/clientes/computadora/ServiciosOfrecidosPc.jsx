import React from "react";
import { Paginacion } from "../../../util/paginacion/Paginacion";
import { obtenerCitas } from "../../../peticiones/CitasPeticiones";
import { LuScissorsSquareDashedBottom } from "react-icons/lu";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { CartasCitas } from "../../../util/cartas/CartasCitas";

export default function ServiciosOfrecidosPc() {
  const renderCita = (citasCliente) => (
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
      mostrarSoloRealizadas={true}
      idCita={citasCliente.citaId}
    />
  );

  return (
    <>
      <TituloGenericos
        titulo={"SERVICIOS OFRECIDOS"}
        icono={LuScissorsSquareDashedBottom}
        clase="name-cita-pc"
        clase2="h1-pc-white"
      />

      <Paginacion
        obtenerDatos={obtenerCitas}
        renderItem={renderCita}
        elementosPorPagina={3}
        estado={"Realizada"}
      />
    </>
  );
}
