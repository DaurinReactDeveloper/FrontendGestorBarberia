import React from "react";
import { Paginacion } from "../../../util/paginacion/Paginacion";
import { LuScissorsSquareDashedBottom } from "react-icons/lu";
import { CartasCitasPc } from "../../../util/cartas/CartasCitasPc";
import { obtenerCitasBarbero } from "../../../peticiones/CitasPeticiones";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";

export default function CitasRealizadasBarberoPc() {

  const renderCita = (citasCliente) =>(
    <CartasCitasPc
    key={citasCliente.citaId}
    estado={citasCliente.estado}
    img={citasCliente.estilo.imgestilo}
    alt="Citas"
    fecha={citasCliente.fecha}
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
