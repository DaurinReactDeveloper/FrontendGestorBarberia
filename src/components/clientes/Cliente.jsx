import React, { useEffect, useState } from "react";
import Navbar from "../../util/navbar/Navbar";
import Footer from "../../util/footer/Footer";
import { MainClientePc } from "./computadora/MainClientePc";
import { MainClienteCelular } from "./celular/MainClienteCelular";
import "./../../css/cliente.css";

export default function Cliente() {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    ocultarNombre(setNombre);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section className="section-main-cliente-celular">
          <MainClienteCelular nombre={nombre} />
        </section>
        <section className="section-main-cliente-pc">
          <MainClientePc nombre={nombre} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export function ocultarNombre(setNombre) {
  const nombreData = localStorage.getItem("nombre");
  if (nombreData && nombreData.length > 6) {
    const nuevoNombre = `${nombreData.substring(0, 6)}***`;
    setNombre(nuevoNombre);
  } else {
    setNombre(nombreData || "");
  }
}
