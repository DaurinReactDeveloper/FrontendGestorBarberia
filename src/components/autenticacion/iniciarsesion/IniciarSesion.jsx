import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../util/navbar/Navbar";
import Footer from "../../../util/footer/Footer";
import { FaUserCircle } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa"; //Barbero
import { FaUsers } from "react-icons/fa"; //Cliente
import { RiAdminFill } from "react-icons/ri"; //Admin
import "aos/dist/aos.css";
import Aos from "aos";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import "./../../../css/iniciarsesion.css";

export default function IniciarSesion() {
  return (
    <>
      <Navbar />
      <main>
        <TituloGenericos
          titulo={"INICIAR SESIÓN"}
          icono={FaUserCircle}
          clases="titulo-secciones"
        />

        <section className="row row-iniciarsesion">
          <Secciones
            titulo={"SOY UN CLIENTE"}
            imagen={"/imagenRegistro.webp"}
            icono={FaUsers}
            clase="button-cliente-secciones"
            enlace={"iniciarsesiongeneral/cliente"}
          />
          <Secciones
            titulo={"SOY UN BARBERO"}
            imagen={"/imagenBarbero.webp"}
            icono={FaUserTie}
            clase="button-barbero-secciones"
            enlace={"iniciarsesiongeneral/barbero"}
          />
          <Secciones
            titulo={"SOY UN ADMINISTRADOR"}
            imagen={"/imagenAdmin.webp"}
            icono={RiAdminFill}
            clase="button-admin-secciones"
            enlace={"iniciarsesiongeneral/administrador"}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

function Secciones({ titulo, icono: Icono, imagen, clase = "", enlace = "" }) {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <article className="col-lg-auto columna-secciones">
        <div
          className="div_img_secciones"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <img src={imagen} alt={imagen} className="img-fluid img_secciones" />
        </div>

        <div className="div_button_secciones">
          <Link to={`/${enlace}`} className={`button_secciones ${clase}`}>
            <Icono />
            {titulo}
          </Link>
        </div>
      </article>
    </>
  );
}
