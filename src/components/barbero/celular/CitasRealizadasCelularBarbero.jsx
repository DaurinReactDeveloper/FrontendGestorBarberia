import React, { useEffect, useState } from "react";
import { CitaTablaBarbero } from "./CitasAceptadasCelularBarbero";
import { PiAddressBook } from "react-icons/pi";
import { obtenerCitasBarberoById } from "../../../peticiones/CitasPeticiones";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";

export default function CitasRealizadasCelularBarbero() {
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false); // Estado para mostrar mensaje

  useEffect(() => {
    obtenerCitasBarberoById(setCitas, setMensaje);
    setMostrarMensaje(citas.length > 0);
  }, [citas]);

  return (
    <>
      <section>
        <TituloGenericos titulo={"CITAS REALIZADAS"} icono={PiAddressBook} />
      </section>
      <br />

      <section>
        <CitaTablaBarbero
          citas={citas}
          estado={"Realizada"}
          botonEliminar={true}
        />
      </section>
      {mostrarMensaje && mensaje && (
        <p className="p-mensaje-table-barbero-pc">{mensaje}</p>
      )}
    </>
  );
}
