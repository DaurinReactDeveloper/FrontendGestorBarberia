import React from "react";
import { PiAddressBookBold } from "react-icons/pi";
import { CartasCliente } from "../../../util/cartas/CartasBarberoCliente";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";

export default function ListaClienteAdminCelular() {
  return (
    <>
      <TituloGenericos titulo={"LISTA DE CLIENTES"} icono={PiAddressBookBold} />

      <br />

      <div>
        <CartasCliente />
      </div>
    </>
  );
}
