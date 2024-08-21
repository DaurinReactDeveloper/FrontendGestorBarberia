import Footer from "../../util/footer/Footer";
import Navbar from "../../util/navbar/Navbar";
import { RiScissors2Fill } from "react-icons/ri";
import { CartasBarbero } from "../../util/cartas/CartasBarberoCliente";
import { TituloGenericos } from "../../util/titulos/TituloGenericos";

export default function BarberoBusqueda() {
  return (
    <>
      <Navbar />
      <main>
        <TituloGenericos titulo={"BARBEROS"} icono={RiScissors2Fill} />

<br />

        <CartasBarbero />
      </main>
      <Footer />
    </>
  );
}