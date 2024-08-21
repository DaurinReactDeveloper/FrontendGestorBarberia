import { useEffect, useState } from "react";
import { obtenerCitas } from "../../../peticiones/CitasPeticiones";
import { PiAddressBook } from "react-icons/pi";
import { CartasCitasCelular } from "../../../util/cartas/CartasCitasCelular";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";

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
            <CartasCitasCelular
              key={citasCliente.citaId}
              estado={citasCliente.estado}
              img={citasCliente.estilo.imgestilo}
              alt="Citas"
              fecha={citasCliente.fecha}
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
