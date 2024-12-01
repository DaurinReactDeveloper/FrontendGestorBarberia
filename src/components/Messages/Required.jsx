import React from "react";
import Navbar from "../../util/navbar/Navbar";
import Footer from "../../util/footer/Footer";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import "../../css/required.css";

export default function Required({rol}) {
  return (
    <>
      <Navbar />
      <section className="row">
        <article>
          <h2 className="h2-required">
            Debe ser <span className="span-sesion-required">{rol}</span> para poder ver este apartado.
          </h2>
          <div className="div-img-requerid">
          <img
            src="/LoginAutenticacion.webp"
            alt="LoginAutenticacion"
            className="img-fluid img-requerid"
          />
          </div>
        </article>

        <article className="article-link-required">
            <Link to={"/iniciarsesion"} className="link-sesion-required">
              <FaUserCircle /> INICIAR SESION
            </Link>

            <Link to={"/registro"} className="link-register-required">
              <FaUserPlus /> REGISTRARME
            </Link>
        </article>
      </section>

      <Footer />
    </>
  );
}
