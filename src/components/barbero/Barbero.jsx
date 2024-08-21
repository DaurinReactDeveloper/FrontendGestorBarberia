import { useEffect, useState } from "react";
import Navbar from "../../util/navbar/Navbar";
import Footer from "../../util/footer/Footer";
import { ocultarNombre } from "../clientes/Cliente";
import { MainBarberoCelular } from "./celular/MainBarberoCelular";
import { MainBarberoPc } from "./computadora/MainBarberoPc";

export default function Barbero() {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    ocultarNombre(setNombre);
  }, []);

  return (
    <>
      <Navbar />
      <main>

        <section className="section-main-cliente-celular">
          <MainBarberoCelular nombre={nombre} />
        </section>

         <section className="section-main-cliente-pc">
            <MainBarberoPc nombre={nombre} />
          </section> 

      </main>
      <Footer />
    </>
  );
}

