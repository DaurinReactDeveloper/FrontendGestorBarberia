import React, { useEffect, useState } from "react";
import Navbar from "../../util/navbar/Navbar";
import Footer from "../../util/footer/Footer";
import { ocultarNombre } from "../clientes/Cliente";
import MainAdminComputadoraDaurin from "./computadora/MainAdminComputadoraDaurin";
import MainAdminCelularDaurin from "./celular/MainAdminCelularDaurin";

export default function AdminDaurin() {
    const [nombre, setNombre] = useState("");

    useEffect(() => {
      ocultarNombre(setNombre);
    }, []);
  
    return (
      <>
        <Navbar />
        <main>
          <section className="section-main-cliente-celular">
             <MainAdminCelularDaurin nombre={nombre} />
          </section>
  
           <section className="section-main-cliente-pc">
           <MainAdminComputadoraDaurin nombre={nombre} />
           </section>
        </main>
        <Footer />
      </>
  );
}
