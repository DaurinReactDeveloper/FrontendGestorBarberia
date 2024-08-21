import React from 'react'
import { obtenerCitasBarbero } from '../../../peticiones/CitasPeticiones';
import { CartasCitasBarberoPc } from '../../../util/cartas/CartasCitasPc';
import { PiAddressBook } from 'react-icons/pi';
import { Paginacion } from '../../../util/paginacion/Paginacion';
import { TituloGenericos } from '../../../util/titulos/TituloGenericos';

export default function GestionCitasBarberoPc() {

const renderCita = (citasCliente) =>(
  <CartasCitasBarberoPc
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
);

  return (
    <>
      <TituloGenericos
        titulo={"GESTION CITAS"}
        icono={PiAddressBook}
        clase="name-cita-pc"
        clase2="h1-pc-white"
      />

      <Paginacion
        obtenerDatos={obtenerCitasBarbero}
        renderItem={renderCita}
        elementosPorPagina={3}
        estado={"En Proceso"}
      />
    </>
  );
}
