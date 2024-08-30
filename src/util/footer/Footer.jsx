import React, { useEffect } from "react";
import {
  FaWhatsappSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import "../../css/footer.css";

export default function Footer() {
  return (
    <>
      <footer>
        <section className="row section-footer">
          <article className="article-img-footer">
            <img src="/logo.webp" alt="logo" className="img-fluid img-footer" />
            <p>DAURIN</p>
            <p>BARBERSHOP</p>
          </article>

          <article className="article-contacto-footer">
            <p className="titulo-footer">CONTACTO</p>
            <p>Gmail: dauringonzalez6@gmail.com</p>
            <p>Cel.: 809-918-7905</p>
          </article>

          <article className="article-redes-footer">
            <p className="titulo-footer">REDES SOCIALES</p>

            <div className="div-article-redes-footer">
              <a href="">
                <FaWhatsappSquare className="icon-footer" />
              </a>

              <a href="">
                <FaInstagramSquare className="icon-footer" />
              </a>

              <a href="">
                <FaLinkedin className="icon-footer" />
              </a>
            </div>
          </article>
        </section>

        <section className="footer-final">
          <p>Daurin Gonzalez. &copy; Todos los Derechos Reservados</p>
        </section>
      </footer>
    </>
  );
}
