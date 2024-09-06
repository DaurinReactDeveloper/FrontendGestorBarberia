import React from "react";
import { Paginacion } from "../../../util/paginacion/Paginacion";
import { LuScissorsSquareDashedBottom } from "react-icons/lu";
import { CartasCitas } from "../../../util/cartas/CartasCitas";
import { obtenerCitasBarbero } from "../../../peticiones/CitasPeticiones";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";

export default function CitasRealizadasBarberoPc() {

  const renderCita = (citasCliente) =>(
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
    idCita={citasCliente.citaId}
    mostrarSoloRealizadas={true}
  />
  );
  
  return (
    <>
      <TituloGenericos
        titulo={"CITAS REALIZADAS"}
        icono={LuScissorsSquareDashedBottom}
        clase="name-cita-pc"
        clase2="h1-pc-white"
      />

      <Paginacion
        obtenerDatos={obtenerCitasBarbero}
        renderItem={renderCita}
        elementosPorPagina={3}
        estado={"Realizada"}
      />
    </>
  );
}
