import { useEffect, useState } from "react";
import { obtenerCitas } from "../../../peticiones/CitasPeticiones";
import { PiAddressBook } from "react-icons/pi";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { CartasCitas } from "../../../util/cartas/CartasCitas";

//MisCitasCelular
export function MisCitasCelular() {
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    obtenerCitas(setCitas, setMensaje);
  }, []);

  return (
    <>
      <TituloGenericos titulo={"MIS CITAS"} icono={PiAddressBook} />
      <br />

      <div>
        {citas.length > 0 ? (
          citas.map((citasCliente) => (
            <CartasCitas
              key={citasCliente.citaId}
              estado={citasCliente.estado}
              img={citasCliente.estilo.imgestilo}
              alt="Citas"
              fecha={citasCliente.fecha}
              hora={citasCliente.hora}
              nombre={citasCliente.estilo.nombre}
              descripcion={citasCliente.estilo.descripcion}
              precio={citasCliente.estilo.precio}
              idCita={citasCliente.citaId}
            />
          ))
        ) : (
          <p>{mensaje}</p>
        )}
      </div>
    </>
  );
}
