import React from 'react'
import { TituloGenericos } from '../../../util/titulos/TituloGenericos'
import { PiAddressBookBold } from 'react-icons/pi'
import { obtenerEstilosBusqueda } from '../../../peticiones/EstilosPeticiones'
import { PaginacionCortes } from '../../../util/paginacion/Paginacion'

export default function ListaCortesAdminPc() {
  return (
    <>
    <TituloGenericos
      titulo={"LISTA DE CORTES"}
      icono={PiAddressBookBold}
      clase="name-cita-pc"
      clase2="h1-pc-white"
    />

    <br />

    <PaginacionCortes
      obtenerDatos={obtenerEstilosBusqueda} 
      elementosPorPagina={3}
    />
  </>
  )
}
