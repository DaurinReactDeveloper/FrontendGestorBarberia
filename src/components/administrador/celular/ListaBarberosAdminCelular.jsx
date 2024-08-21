import React from "react";
import { PiAddressBookBold } from "react-icons/pi";
import { CartasBarbero } from "../../../util/cartas/CartasBarberoCliente";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";

export default function ListaBarberosAdminCelular() {
  return (
    <>
      <TituloGenericos titulo={"LISTA DE BARBEROS"} icono={PiAddressBookBold} />
     
      <br />

      <div>
      <CartasBarbero />
      </div>
    </>
  );
}
