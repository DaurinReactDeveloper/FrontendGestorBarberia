import React from "react";
import { PiAddressBookBold } from "react-icons/pi";
import { CartasCortes } from "../../../util/cartas/CartasCortes";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";

export default function ListaCortesAdminCelular() {
  return (
    <>
      <TituloGenericos titulo={"LISTA DE CORTES"} icono={PiAddressBookBold} />
      <br />
      <div>
        <CartasCortes />
      </div>
    </>
  );
}
