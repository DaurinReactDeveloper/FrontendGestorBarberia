import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AgregarBarberoAdminCelular from "./AgregarBarberoAdminCelular";
import AgregarEstiloAdminCelular from "./AgregarEstiloAdminCelular";
import ListaBarberosAdminCelular from "./ListaBarberosAdminCelular";
import ListaCortesAdminCelular from "./ListaCortesAdminCelular";
import ListaClienteAdminCelular from "./ListaClienteAdminCelular";
import { InformacionCelular } from "../../../util/informacion/InformacionCelular";
import {
  AccordionItem,
  ContentSwitcher,
} from "../../../util/mainreutilizable/MainReutilizable";
import { FaUserCircle } from "react-icons/fa";
import { BsPersonAdd } from "react-icons/bs";
import { RiScissors2Fill } from "react-icons/ri";
import { PiAddressBookBold } from "react-icons/pi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { GiExitDoor } from "react-icons/gi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { CerrarSesion } from "../../../peticiones/AutenticacionPeticiones";
import { BienvenidoCelular } from "../../../util/bienvenido/BienvenidoCelular";
import ReporteIngresosCelular from "./ReporteIngresosCelular";

export default function MainAdminCelular({ nombre }) {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const manejarClickBoton = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  const navigate = useNavigate();

  const opciones = [
    { key: "AgregarEstilo", content: <AgregarEstiloAdminCelular /> },
    { key: "AgregarBarbero", content: <AgregarBarberoAdminCelular /> },
    { key: "ListaBarberos", content: <ListaBarberosAdminCelular /> },
    { key: "ListaCliente", content: <ListaClienteAdminCelular /> },
    { key: "ListaEstilo", content: <ListaCortesAdminCelular /> },
    { key: "ReporteIngresos", content: <ReporteIngresosCelular /> },
    {
      key: "informacion",
      content: (
        <InformacionCelular>
          <p>Estimado Administrador,</p>
          <p className="p-informacion-texto">
            Como administrador, usted tiene la capacidad de agregar estilos de
            cortes de cabello, agregar barberos, listar barberos, listar
            clientes y listar estilos de cortes de cabello. Estas
            funcionalidades le permitirán mantener un control eficiente y
            actualizado de los servicios y personal de la barbería.
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
                onClick={() => manejarClickBoton("AgregarEstilo")}
              >
                <RiScissors2Fill />
                Agregar Estilo
              </button>

              <button
                type="button"
                className="button-accordion-body"
                onClick={() => manejarClickBoton("AgregarBarbero")}
              >
                <BsPersonAdd />
                Agregar Barbero
              </button>

              <button
                type="button"
                className="button-accordion-body"
                onClick={() => manejarClickBoton("ListaBarberos")}
              >
                <PiAddressBookBold />
                Listas de Barberos
              </button>

              <button
                type="button"
                className="button-accordion-body"
                onClick={() => manejarClickBoton("ListaCliente")}
              >
                <PiAddressBookBold />
                Listas de Clientes
              </button>

              <button
                type="button"
                className="button-accordion-body"
                onClick={() => manejarClickBoton("ListaEstilo")}
              >
                <PiAddressBookBold />
                Listas de Cortes
              </button>

              <button
                type="button"
                className="button-accordion-body"
                onClick={() => manejarClickBoton("ReporteIngresos")}
              >
                <LiaFileInvoiceDollarSolid  />
                Reporte de ingresos
              </button>
              
              <button
                type="button"
                className="button-accordion-body button-accordion-body-admin-ingresos"
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
