import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiAddressBookBold } from "react-icons/pi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { RiScissors2Fill } from "react-icons/ri";
import { ContentSwitcher } from "../../../util/mainreutilizable/MainReutilizable";
import { GiExitDoor } from "react-icons/gi";
import { CerrarSesion } from "../../../peticiones/AutenticacionPeticiones";
import BienvenidoClientePc from "../../../util/bienvenido/BienvenidoPc";
import { FaUserCircle } from "react-icons/fa";
import InformacionPc from "../../../util/informacion/InformacionPc";
import AgregarEstiloAdminPc from "./AgregarEstiloAdminPc";
import AgregarBarberoAdminPc from "./AgregarBarberoAdminPc";
import ListaBarberosAdminPc from "./ListaBarberosAdminPc";
import ListaClienteAdminPc from "./ListaClienteAdminPc";
import ListaCortesAdminPc from "./ListaCortesAdminPc";
import Aos from "aos";
import 'aos/dist/aos.css';
import "../../../css/mainadmincomputadora.css";
import ReporteIngresosPc from "./ReporteIngresosPc";

export default function MainAdminComputadora({nombre}) {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const navigate = useNavigate();

  const manejarClickBoton = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  useEffect(() => {
    Aos.init();
  }, []);

  const opciones = [
    { key: "AgregarEstilo", content: <AgregarEstiloAdminPc /> },
    { key: "Reportes", content: <ReporteIngresosPc /> },
    { key: "AgregarBarbero", content: <AgregarBarberoAdminPc /> },
    { key: "ListaBarberos", content: <ListaBarberosAdminPc /> },
    { key: "ListaCliente", content: <ListaClienteAdminPc /> },
    { key: "ListaEstilo", content: <ListaCortesAdminPc/> },
    {
      key: "informacion",
      content: (
        <InformacionPc>
          <div className="div-saludos-bienvenido-pc">
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
          </div>
        </InformacionPc>
      ),
    },
  ];

  return (
    <section className="row">
      <article className="col-lg-2 col-opciones-cliente-pc" data-aos="fade-up">
        <div className="div-nombre-opciones-cliente-pc">
          <FaUserCircle className="icon-div-nombre-opciones-cliente-pc" />
          <p>{nombre}</p>
        </div>

        <hr className="hr-nombre-opciones-cliente-pc" />

        <div className="div-opciones-cliente-pc">
          <button
            type="button"
            className="boton-opciones-cliente-pc"
            onClick={() => manejarClickBoton("AgregarEstilo")}
          >
            <RiScissors2Fill className="icon-botones-opciones-cliente-pc" />
            Agregar Estilo
          </button>

          <button
            type="button"
            className="boton-opciones-cliente-pc"
            onClick={() => manejarClickBoton("AgregarBarbero")}
          >
            <BsPersonAdd className="icon-botones-opciones-cliente-pc" />
            Agregar Barbero
          </button>

          <button
            type="button"
            className="boton-opciones-cliente-pc"
            onClick={() => manejarClickBoton("ListaBarberos")}
          >
            <PiAddressBookBold className="icon-botones-opciones-cliente-pc" />
            Listas de Barberos
          </button>

          <button
            type="button"
            className="boton-opciones-cliente-pc"
            onClick={() => manejarClickBoton("ListaCliente")}
          >
            <PiAddressBookBold className="icon-botones-opciones-cliente-pc" />
            Lista de Clientes
          </button>

          <button
            type="button"
            className="boton-opciones-cliente-pc"
            onClick={() => manejarClickBoton("ListaEstilo")}
          >
            <PiAddressBookBold className="icon-botones-opciones-cliente-pc" />
            Lista de Cortes
          </button>

          <button
            type="button"
            className="boton-opciones-cliente-pc"
            onClick={() => manejarClickBoton("Reportes")}
          >
            <PiAddressBookBold className="icon-botones-opciones-cliente-pc" />
            Reporte de Ingresos
          </button>

          <button
            type="button"
            className="boton-opciones-cliente-pc boton-informacion-cliente-pc boton-informacion-admin-pc"
            onClick={() => manejarClickBoton("informacion")}
          >
            <AiOutlineInfoCircle className="icon-botones-opciones-cliente-pc" />
            Información
          </button>

          <hr className="hr-nombre-opciones-cliente-pc" />

          <div className="div-button-cerrar-sesion">
            <button
              type="button"
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
  );
}
