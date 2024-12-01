import React, { useEffect, useState } from "react";
import { CitaTablaBarbero } from "../celular/CitasAceptadasCelularBarbero";
import { obtenerCitasBarberoById } from "../../../peticiones/CitasPeticiones";
import { FiScissors } from "react-icons/fi";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import "./../../../css/citasaceptadasbarberopc.css";

export default function CitasAceptadasBarberoPc() {
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true); // Estado para controlar la carga
  const [mostrarMensaje, setMostrarMensaje] = useState(false); // Estado para mostrar mensaje

  useEffect(() => {
    obtenerCitasBarberoById(setCitas, setMensaje).finally(() => {
      setCargando(false); 
      setMostrarMensaje(citas.length > 0);
    });
  }, []);

  return (
    <>
      <section>
        <br />
        <TituloGenericos
          titulo={"CITAS ACEPTADAS"}
          icono={FiScissors}
          clase="name-cita-pc"
          clase2="h1-pc-white"
        />
      </section>
      <section className="section-cita-barberos-tabla-pc">
        {cargando ? ( // Mostrar cargador si está cargando
          <p className="p-mensaje-carga-paginacion">Cargando...</p>
        ) : (
          <CitaTablaBarbero
            citas={citas}
            estado={"Aceptada"}
            botonFinalizar={true}
          />
        )}
      </section>
      {mostrarMensaje && mensaje && <p className="p-mensaje-table-barbero-pc">{mensaje}</p>}
    </>
  );
}