import React from "react";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { PiAddressBookBold } from "react-icons/pi";
import { PaginacionBarberos } from "../../../util/paginacion/Paginacion";
import { obtenerBarberos } from "../../../peticiones/BarberosPeticiones";

export default function ListaBarberosAdminPc() {
  return (
    <>
      <TituloGenericos
        titulo={"LISTA DE BARBEROS"}
        icono={PiAddressBookBold}
        clase="name-cita-pc"
        clase2="h1-pc-white"
      />

      <br />

      <PaginacionBarberos
        obtenerDatos={obtenerBarberos} 
        elementosPorPagina={3}
      />
    </>
  );
}
