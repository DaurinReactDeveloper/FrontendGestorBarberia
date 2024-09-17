import React from 'react'
import { obtenerCitasBarberoById } from '../../../peticiones/CitasPeticiones';
import { PiAddressBook } from 'react-icons/pi';
import { Paginacion } from '../../../util/paginacion/Paginacion';
import { TituloGenericos } from '../../../util/titulos/TituloGenericos';
import { CartasCitas } from '../../../util/cartas/CartasCitas';

export default function GestionCitasBarberoPc() {

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
  citaId={citasCliente.citaId}
  mostrarSoloEnProceso={true}
  esBarbero={true}
  clienteId={citasCliente.clienteId}
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
        obtenerDatos={obtenerCitasBarberoById}
        renderItem={renderCita}
        elementosPorPagina={3}
        estado={"En Proceso"}
      />
    </>
  );
}
