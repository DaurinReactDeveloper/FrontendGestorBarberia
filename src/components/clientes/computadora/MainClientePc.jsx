import { FaUserCircle } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { LuScissorsSquareDashedBottom } from "react-icons/lu";
import { PiAddressBook } from "react-icons/pi";
import { CgAddR } from "react-icons/cg";
import { CerrarSesion } from "../../../peticiones/AutenticacionPeticiones";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GiExitDoor } from "react-icons/gi";
import { AnadirCitasPc } from "./AnadirCitasPc";
import BienvenidoClientePc from "../../../util/bienvenido/BienvenidoPc";
import MisCitasPc from "./MisCitasPc";
import ServiciosOfrecidosPc from "./ServiciosOfrecidosPc";
import InformacionPc from "../../../util/informacion/InformacionPc";
import { ContentSwitcher } from "../../../util/mainreutilizable/MainReutilizable";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../../css/mainclientepc.css";

//Este componente debo ponerlo generalizado para poder usarlo como básico para el barbero y y admin
export function MainClientePc({ nombre }) {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const navigate = useNavigate();

  const manejarClickBoton = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const opciones = [
    { key: "agregarCita", content: <AnadirCitasPc /> },
    { key: "misCitas", content: <MisCitasPc /> },
    { key: "serviciosOfrecidos", content: <ServiciosOfrecidosPc /> },
    {
      key: "informacion",
      content: (
        <InformacionPc>
          <div className="div-saludos-bienvenido-pc">
            <p>Estimado Cliente,</p>
            <p className="p-informacion-texto">
              Como cliente, usted puede agregar su cita, la cual inicialmente se
              encontrará en estado de "Proceso". El barbero podrá{" "}
              <strong>"Aceptar"</strong> o <strong>"Rechazar"</strong> su
              solicitud. Le recomendamos no eliminar las citas que hayan sido{" "}
              <strong>"Aceptadas"</strong>, ya que estas pasarán al estado de
              <strong> "Realizadas"</strong>. Mantener un historial de servicios
              le permitirá acceder a descuentos en precios en el futuro.
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
              onClick={() => manejarClickBoton("agregarCita")}
            >
              <CgAddR className="icon-botones-opciones-cliente-pc" />
              Añadir Cita
            </button>

            <button
              className="boton-opciones-cliente-pc"
              onClick={() => manejarClickBoton("misCitas")}
            >
              <PiAddressBook className="icon-botones-opciones-cliente-pc" />
              Mis Citas
            </button>

            <button
              className="boton-opciones-cliente-pc"
              onClick={() => manejarClickBoton("serviciosOfrecidos")}
            >
              <LuScissorsSquareDashedBottom className="icon-botones-opciones-cliente-pc" />
              Servicios Obtenidos
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
