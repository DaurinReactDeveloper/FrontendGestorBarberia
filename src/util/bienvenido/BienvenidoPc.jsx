import React from "react";
import "../../css/bienvenidoclientepc.css";

export default function BienvenidoClientePc({ nombre }) {
  return (
    <>
      <div className="div-cliente-bienvenido-pc">
        <p className="h1-cliente-bienvenido-pc">BIENVENIDO</p>
        <p className="p-cliente-bienvenido-pc">
          <strong>{nombre}</strong>
        </p>
      </div>
    </>
  );
}
