import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { TituloGenericos } from "../titulos/TituloGenericos";
import "../../css/informaciontelefono.css";

export function InformacionCelular({ children }) {
  return (
    <>
      <TituloGenericos titulo={"INFORMACIÓN"} icono={AiOutlineInfoCircle} />

      <br />

      <div>{children}</div>

      <br />
    </>
  );
}
