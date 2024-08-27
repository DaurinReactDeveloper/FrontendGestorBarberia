import React from "react";
import Navbar from "../../util/navbar/Navbar";
import Footer from "../../util/footer/Footer";
import { RiScissors2Fill } from "react-icons/ri";
import { TituloGenericos } from "../../util/titulos/TituloGenericos";
import { CartasEstilo } from "../../util/cartas/CartasEstilo";

export default function Estilos() {
  return (
    <>
      <Navbar />
      <main>
        <TituloGenericos titulo={"ESTILOS DE CORTES"} icono={RiScissors2Fill} />
        <CartasEstilo />
      </main>
      <Footer />
    </>
  );
}


