import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaUserSecret } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../css/navbar.css";

export default function Navbar() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-dark"
        data-bs-theme="dark"
        data-aos="fade-right"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <img src="\logo.png" alt="iconBarber" width="27" height="26" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/"}>
                  Inicio
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/estilos"}>
                  Estilos de Corte
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/barberos"}>
                  Lista de Barberos
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/cliente"}>
                  Cliente
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/barbero"}>
                  Barbero
                </Link>
              </li>
            </ul>

            <Link
              type="button"
              className="buttonAdminNavbar"
              to={"/administrador"}
            >
              <FaUserSecret /> Admin
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
