import React, { useEffect, useState } from "react";
import Navbar from "../../util/navbar/Navbar";
import Footer from "../../util/footer/Footer";
import { ocultarNombre } from "../clientes/Cliente";
import MainAdminComputadora from "./computadora/MainAdminComputadora";
import MainAdminCelular from "./celular/MainAdminCelular";

export default function Admin() {
    const [nombre, setNombre] = useState("");

    useEffect(() => {
      ocultarNombre(setNombre);
    }, []);
  
    return (
      <>
        <Navbar />
        <main>
          <section className="section-main-cliente-celular">
             <MainAdminCelular nombre={nombre} />
          </section>
  
           <section className="section-main-cliente-pc">
           <MainAdminComputadora nombre={nombre} />
           </section>
        </main>
        <Footer />
      </>
  );
}
