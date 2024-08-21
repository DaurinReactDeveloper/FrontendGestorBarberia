import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InformacionPc from "../../../util/informacion/InformacionPc";
import { FaUserCircle } from "react-icons/fa";
import { ContentSwitcher } from "../../../util/mainreutilizable/MainReutilizable";
import { GiExitDoor } from "react-icons/gi";
import { CerrarSesion } from "../../../peticiones/AutenticacionPeticiones";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { PiAddressBook } from "react-icons/pi";
import GestionCitasBarberoPc from "./GestionCitasBarberoPc";
import CitasRealizadasBarberoPc from "./CitasRealizadasBarberoPc";
import CitasAceptadasBarberoPc from "./CitasAceptadasBarberoPc";
import BienvenidoClientePc from "../../../util/bienvenido/BienvenidoPc";
import { FaImagePortrait } from "react-icons/fa6";
import { FiScissors } from "react-icons/fi";
import Aos from "aos";
import 'aos/dist/aos.css';

export function MainBarberoPc({ nombre }) {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const navigate = useNavigate();

  const manejarClickBoton = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  useEffect(() => {
    Aos.init();
  }, []);

  const opciones = [
    { key: "gestionarCitas", content: <GestionCitasBarberoPc /> },
    { key: "citasRealizadas", content: <CitasRealizadasBarberoPc /> },
    { key: "citasaceptadas", content: <CitasAceptadasBarberoPc  /> },
    {
      key: "informacion",
      content: (
        <InformacionPc>
          <div className="div-saludos-bienvenido-pc">
            <p>Estimado Barbero,</p>
            <p className="p-informacion-texto">
              Como profesional, usted tendrá tres opciones para gestionar las
              citas que los clientes agreguen, las cuales inicialmente estarán
              en estado de <strong>"Proceso"</strong>:{" "}
              <strong>"Aceptar"</strong>,<strong> "Rechazar"</strong> o{" "}
              <strong>"Finalizar"</strong>. Le recomendamos no eliminar las
              citas que hayan sido <strong>"Aceptadas"</strong> o
              <strong> "Finalizadas"</strong>, ya que estas pasarán al estado de{" "}
              <strong>"Realizadas"</strong>. En la sección de{" "}
              <strong>"Citas Realizadas"</strong>, podrá ver todas las citas que
              ya ha dado por concluidas.
            </p>
            <p>
              Atentamente, <strong>[Daurin Barbershop]</strong>
            </p>
          </div>
        </InformacionPc>
      ),
    },
  ];

  return (
    <>
      <section className="row">
        <article
          className="col-lg-2 col-opciones-cliente-pc"
          data-aos="fade-up"
        >
          <div className="div-nombre-opciones-cliente-pc">
            <FaUserCircle className="icon-div-nombre-opciones-cliente-pc" />
            <p>{nombre}</p>
          </div>

          <hr className="hr-nombre-opciones-cliente-pc" />

          <div className="div-opciones-cliente-pc">
            <button
              className="boton-opciones-cliente-pc"
              onClick={() => manejarClickBoton("gestionarCitas")}
            >
              <FaImagePortrait className="icon-botones-opciones-cliente-pc" />
              Gestionar Citas
            </button>

            <button
              className="boton-opciones-cliente-pc"
              onClick={() => manejarClickBoton("citasaceptadas")}
            >
              <FiScissors className="icon-botones-opciones-cliente-pc" />
              Citas Aceptadas
            </button>

            <button
              className="boton-opciones-cliente-pc"
              onClick={() => manejarClickBoton("citasRealizadas")}
            >
              <PiAddressBook className="icon-botones-opciones-cliente-pc" />
              Citas Realizadas
            </button>

            <button
              className="boton-opciones-cliente-pc boton-informacion-cliente-pc"
              onClick={() => manejarClickBoton("informacion")}
            >
              <AiOutlineInfoCircle className="icon-botones-opciones-cliente-pc" />
              Información
            </button>

            <hr className="hr-nombre-opciones-cliente-pc" />

            <div className="div-button-cerrar-sesion">
              <button
                className="boton-opciones-cliente-pc boton-cerrar-sesion-opciones-cliente-pc"
                onClick={() => CerrarSesion(navigate)}
                title="Cerrar Sesion"
              >
                <GiExitDoor className="icon-cerrar-sesion-pc" />
              </button>
            </div>
          </div>
        </article>

        <article
          className="col-lg-9 col-informacion-cliente-pc"
          data-aos="fade-up"
        >
          <ContentSwitcher
            opcionSeleccionada={opcionSeleccionada}
            opciones={opciones}
            defaultContent={<BienvenidoClientePc nombre={nombre} />}
          />
        </article>
      </section>
    </>
  );
}
