import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { ContentSwitcher } from "../../../util/mainreutilizable/MainReutilizable";
import { GiExitDoor } from "react-icons/gi";
import { CerrarSesion } from "../../../peticiones/AutenticacionPeticiones";
import { FaUserSecret } from "react-icons/fa6";
import BienvenidoClientePc from "../../../util/bienvenido/BienvenidoPc";
import InformacionPc from "../../../util/informacion/InformacionPc";
import AgregarAdminDaurinPc from "./AgregarAdminDaurinPc";
import ListarAdminDaurinPc from "./ListarAdminDaurinPc";
import { PiAddressBookBold } from "react-icons/pi";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../../css/mainadmincomputadora.css";

export default function MainAdminComputadoraDaurin({ nombre }) {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const navigate = useNavigate();

  const manejarClickBoton = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  useEffect(() => {
    Aos.init();
  }, []);

  const opciones = [
    { key: "ListarAdminDaurinPc", content: <ListarAdminDaurinPc /> },
    { key: "AgregarAdminDaurinPc", content: <AgregarAdminDaurinPc /> },
    {
      key: "informacion",
      content: (
        <InformacionPc>
          <div className="div-saludos-bienvenido-pc">
            <p>Estimado Administrador Principal,</p>
            <p className="p-informacion-texto">
              Como administrador principal, usted tiene la capacidad de listar,
              agregar, eliminar y editar propetarios de barberias. Estas
              funcionalidades le permitirán mantener un control eficiente y
              actualizado.
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
          <FaUserSecret className="icon-div-nombre-opciones-cliente-pc" />
          <p>{nombre}</p>
        </div>

        <hr className="hr-nombre-opciones-cliente-pc" />

        <div className="div-opciones-cliente-pc">
          <button
            className="boton-opciones-cliente-pc"
            onClick={() => manejarClickBoton("ListarAdminDaurinPc")}
          >
            <PiAddressBookBold className="icon-botones-opciones-cliente-pc" />
            Listar Admins
          </button>

          <button
            className="boton-opciones-cliente-pc"
            onClick={() => manejarClickBoton("AgregarAdminDaurinPc")}
          >
            <FaUserSecret className="icon-botones-opciones-cliente-pc" />
            Agregar Admin
          </button>

          <button
            className="boton-opciones-cliente-pc boton-informacion-cliente-pc boton-informacion-admin-pc boton-informacion-admin-Daurin"
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
  );
}
