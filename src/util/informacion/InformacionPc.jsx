import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { TituloGenericos } from "../titulos/TituloGenericos";
import "../../css/informaciontelefono.css";

export default function InformacionPc({ children }) {
  return (
    <>
      <br />
      <TituloGenericos
        titulo={"INFORMACIÓN"}
        icono={AiOutlineInfoCircle}
        clase="name-cita-pc-informacion"
        clase2="h1-pc-white"
        claseInformacion="section-principal-titulo-pc"
      />

      <br />

      <div>{children}</div>

    </>
  );
}
