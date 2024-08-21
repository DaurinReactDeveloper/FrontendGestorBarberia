import React from 'react'
import { TituloGenericos } from '../../../util/titulos/TituloGenericos'
import { PiAddressBookBold } from 'react-icons/pi'
import { obtenerClientes } from '../../../peticiones/ClientePeticiones'
import { PaginacionClientes } from '../../../util/paginacion/Paginacion'

export default function ListaClienteAdminPc() {
  return (
    <>
    <TituloGenericos
      titulo={"LISTA DE CLIENTES"}
      icono={PiAddressBookBold}
      clase="name-cita-pc"
      clase2="h1-pc-white"
    />

    <br />

    <PaginacionClientes
      obtenerDatos={obtenerClientes} 
      elementosPorPagina={3}
    />
  </>
  )
}
