import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { CgAddR } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { LuScissorsSquareDashedBottom } from "react-icons/lu";
import { PiAddressBook } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";
import { MisCitasCelular } from "./MisCitasCelular";
import { InformacionCelular } from "../../../util/informacion/InformacionCelular";
import { BienvenidoCelular } from "../../../util/bienvenido/BienvenidoCelular";
import { ServiciosOfrecidosCelular } from "./ServiciosOfrecidosCelular";
import { AnadirCitaCelular } from "./AnadirCitasCelular";
import { CerrarSesion } from "../../../peticiones/AutenticacionPeticiones";
import {
  AccordionItem,
  ContentSwitcher,
} from "../../../util/mainreutilizable/MainReutilizable";
import { RiUserSettingsFill } from "react-icons/ri";
import { obtenerCredenciales } from "../../../peticiones/CitasPeticiones";
import "./../../../css/cliente.css";

export function MainClienteCelular({ nombre }) {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const { id } = obtenerCredenciales();

  const manejarClickBoton = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  const navigate = useNavigate();

  const opciones = [
    { key: "agregarCita", content: <AnadirCitaCelular /> },
    { key: "misCitas", content: <MisCitasCelular /> },
    { key: "serviciosOfrecidos", content: <ServiciosOfrecidosCelular /> },
    {
      key: "informacion",
      content: (
        <InformacionCelular>
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
          </p>{" "}
        </InformacionCelular>
      ),
    },
  ];

  return (
    <>
      <section className="row row-cliente-celulares">
        <article className="col-12 opciones-cliente">
          <div className="accordion accordion-flush" id="accordionFlushExample">

            <AccordionItem
              id="flush-collapseOne"
              title={nombre}
              icon={FaUserCircle}
            >
              <Link
                type="button"
                className="button-accordion-body link-Detalles-Cliente-Celular"
                to={`/DetallesCliente/${id}`}
              >
                <RiUserSettingsFill  />
                Mi Perfil
              </Link>

              <button
                className="button-accordion-body"
                onClick={() => manejarClickBoton("agregarCita")}
              >
                <CgAddR />
                Añadir Cita
              </button>

              <button
                className="button-accordion-body"
                onClick={() => manejarClickBoton("misCitas")}
              >
                <PiAddressBook />
                Mis Citas
              </button>

              <button
                className="button-accordion-body"
                onClick={() => manejarClickBoton("serviciosOfrecidos")}
              >
                <LuScissorsSquareDashedBottom />
                Servicios Obtenidos
              </button>

              <button
                className="button-accordion-body"
                onClick={() => manejarClickBoton("informacion")}
              >
                <AiOutlineInfoCircle />
                Información
              </button>

              <hr />
              <div className="div-button-cerrar-sesion">
                <button
                  className="button-accordion-body button-cerrar-sesion"
                  onClick={() => CerrarSesion(navigate)}
                >
                  <GiExitDoor className="icon-cerrar-sesion" />
                </button>
              </div>
            </AccordionItem>
          </div>
        </article>

        <article className="col-12 mostrar-opción">
          <ContentSwitcher
            opcionSeleccionada={opcionSeleccionada}
            opciones={opciones}
            defaultContent={<BienvenidoCelular nombre={nombre} />}
          />
        </article>
      </section>
    </>
  );
}
