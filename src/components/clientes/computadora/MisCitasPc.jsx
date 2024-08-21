import React from "react";
import { PiAddressBook } from "react-icons/pi";
import { Paginacion } from "../../../util/paginacion/Paginacion";
import { CartasCitasPc } from "../../../util/cartas/CartasCitasPc";
import { obtenerCitas } from "../../../peticiones/CitasPeticiones";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import "../../../css/miscitaspc.css";

export default function MisCitasPc() {
  const renderCita = (citasCliente) => (
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
    />
  );

  return (
    <>
      <TituloGenericos
        titulo={"MIS CITAS"}
        icono={PiAddressBook}
        clase="name-cita-pc"
        clase2="h1-pc-white"
      />

      <Paginacion
        obtenerDatos={obtenerCitas}
        renderItem={renderCita}
        elementosPorPagina={3}
      />
    </>
  );
}
