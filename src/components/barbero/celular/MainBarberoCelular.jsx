import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GestionCitasCelularBarbero from "../celular/GestionCitasCelularBarbero";
import CitasRealizadasCelularBarbero from "../celular/CitasRealizadasCelularBarbero";
import CitasAceptadasCelularBarbero from "../celular/CitasAceptadasCelularBarbero";
import { InformacionCelular } from "../../../util/informacion/InformacionCelular";
import { AccordionItem, ContentSwitcher } from "../../../util/mainreutilizable/MainReutilizable";
import { FaUserCircle } from "react-icons/fa";
import { FaImagePortrait } from "react-icons/fa6";
import { FiScissors } from "react-icons/fi";
import { PiAddressBook } from "react-icons/pi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { GiExitDoor } from "react-icons/gi";
import { BienvenidoCelular } from "../../../util/bienvenido/BienvenidoCelular";
import { CerrarSesion } from "../../../peticiones/AutenticacionPeticiones";

 export function MainBarberoCelular({ nombre }) {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  
    const manejarClickBoton = (opcion) => {
      setOpcionSeleccionada(opcion);
    };
  
    const navigate = useNavigate();
  
    const opciones = [
      { key: "gestionarCitas", content: <GestionCitasCelularBarbero /> },
      { key: "citasRealizadas", content: <CitasRealizadasCelularBarbero /> },
      {key: "citasaceptadas", content: <CitasAceptadasCelularBarbero />},
      {
        key: "informacion",
        content: (
          <InformacionCelular>
            <p>Estimado Barbero,</p>
            <p className="p-informacion-texto">
              Como profesional, usted tendrá tres opciones para gestionar las
              citas que los clientes agreguen, las cuales inicialmente estarán en
              estado de <strong>"Proceso"</strong>: <strong>"Aceptar"</strong>,
              <strong> "Rechazar"</strong> o <strong>"Finalizar"</strong>. Le
              recomendamos no eliminar las citas que hayan sido{" "}
              <strong>"Aceptadas"</strong> o<strong> "Finalizadas"</strong>, ya
              que estas pasarán al estado de <strong>"Realizadas"</strong>. En la
              sección de <strong>"Citas Realizadas"</strong>, podrá ver todas las
              citas que ya ha dado por concluidas.
            </p>
            <p>
              Atentamente, <strong>[Daurin Barbershop]</strong>
            </p>
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
                <button
                  type="button"
                  className="button-accordion-body"
                  onClick={() => manejarClickBoton("gestionarCitas")}
                >
                  <FaImagePortrait />
                  Gestionar Citas
                </button>
  
  
                <button
                  type="button"
                  className="button-accordion-body"
                  onClick={() => manejarClickBoton("citasaceptadas")}
                >
                  <FiScissors  />
                  Citas Aceptadas
                </button>
  
  
                <button
                  type="button"
                  className="button-accordion-body"
                  onClick={() => manejarClickBoton("citasRealizadas")}
                >
                  <PiAddressBook />
                  Citas Realizadas
                </button>
  
                <button
                  type="button"
                  className="button-accordion-body"
                  onClick={() => manejarClickBoton("informacion")}
                >
                  <AiOutlineInfoCircle />
                  Información
                </button>
  
                <hr />
                <div className="div-button-cerrar-sesion">
                  <button
                    type="button"
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
  