import React from "react";
import Navbar from "../../util/navbar/Navbar";
import Footer from "../../util/footer/Footer";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section className="row">
        <article>
          <h2 className="h2-required">
            HA <span className="span-sesion-required">OCURRIDO UN ERROR</span> VAYA AL INCIO, POR FAVOR.
          </h2>
          <div className="div-img-requerid">
          <img
            src="/NotFoundPages.webp"
            alt="NotFound"
            className="img-fluid img-requerid"
          />
          </div>
        </article>

        <article className="article-link-required">
            <Link to={"/"} className="link-sesion-required">
              <AiFillHome /> IR AL INICIO
            </Link>
        </article>
      </section>

      <Footer />
    </>
  );
}
