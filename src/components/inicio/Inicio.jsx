import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiScissors2Line } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import Footer from "../../util/footer/Footer";
import Navbar from "../../util/navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import "./../../css/inicio.css";

export default function Inicio() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Navbar />

      <main className="mainFramePrincipal">
        <section
          className="row rowFrame1Principal"
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <FramePrincipal1 />
        </section>

        <section className="row rowFrame1Principal">
          <FramePrincipal2 />
        </section>

        <section className="row rowFrame1Principal">
          <FramePrincipal3 />
        </section>
      </main>

      <Footer />
    </>
  );
}

function FramePrincipal1() {
  return (
    <>
      {/* PC */}
      {/* Arcicle de la imagen*/}
      <article className="col-lg-5 col-md-12 articlePc">
        <img
          src="/imagenFrame1.webp"
          alt="imagenFrame"
          className="img-fluid img-imagenframe1"
        />
      </article>

      {/* Article del Texto*/}
      <article className="col-lg-7 col-md-12 articlePc article-datos-botones">
        <div>
          <p className="DaurinFrame1">DAURIN</p>
          <p className="BarbershopFrame1">BARBERSHOP</p>
          <hr className="hr-datos-frame1" />
        </div>

        {/* Botones */}
        <div className="div-botones-frame1">
          <Link
            type="button"
            className="button-iniciarsesion"
            to={"/iniciarsesion"}
          >
            <FaUserCircle />
            Iniciar Sesión
          </Link>

          <Link type="button" className="button-registrarse" to={"/registro"}>
            <AiOutlineUserAdd />
            Registrarse
          </Link>
        </div>
      </article>

      {/* Celulares */}
      <article className="articleCelulares">
        <img
          src="/frame1celulares.webp"
          alt="FrameCelulares"
          className="img-fluid img-frame1celulares"
        />
      </article>
    </>
  );
}

function FramePrincipal2() {
  return (
    <>
      {/* PC */}
      <article className="articlePc articleFrame2PC">
        <p className="titulo-reserva">RESERVA TU CORTE</p>
        <p className="frase-reserva">
          "Porque cada estilo cuenta y tu imagen es nuestra prioridad. Ven y
          disfruta de una experiencia única de cuidado personal y
          transformación."
        </p>

        <div className="div-botones-frame2">
          <Link
            to={"/registro"}
            type="button"
            className="button-reservar-frame2"
          >
            <RiScissors2Line />
            IR A RESERVAR
          </Link>
        </div>
      </article>

      {/* Celulares */}
      <article className="articleCelulares articleFrame2Celulares">
        <p className="titulo-inicia-sesión">RESERVA TU CORTE</p>
        <p className="frase-inicia-sesión">
          "Porque cada estilo cuenta y tu imagen es nuestra prioridad. Ven y
          disfruta de una experiencia única de cuidado personal y
          transformación."
        </p>

        <div className="div-botones-frame2-celulares">
          <Link
            to={"/iniciarsesion"}
            className="button-iniciar-frame2-Celulares"
          >
            <FaUserCircle />
            Iniciar Sesión
          </Link>

          <Link
            to={"/registro"}
            className="button-registrarse-frame2-Celulares"
          >
            <AiOutlineUserAdd />
            Registrarse
          </Link>
        </div>
      </article>
    </>
  );
}

function FramePrincipal3() {
  return (
    <>
      {/* PC */}
      <article className="articleFrame3PC">
        {/* DIV BOTONES */}
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>

            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>

            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          {/* DIV IMÁGENES E INFO */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/imagenFrame3.webp"
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <div>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>

                <p>Excelente Servicio, quede encantado.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="/imagenFrame3-1.webp"
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <div>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <p>Muy buen servicio, los recomiendo.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="/imagenFrame3-2.webp"
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <div>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <p>Fui y quede encantado.</p>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </article>
    </>
  );
}
