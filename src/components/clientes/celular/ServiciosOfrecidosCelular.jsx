import { useEffect, useState } from "react";
import { LuScissorsSquareDashedBottom } from "react-icons/lu";
import { obtenerCitas } from "../../../peticiones/CitasPeticiones";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { CartasCitas } from "../../../util/cartas/CartasCitas";
import "../../../css/cliente.css";

//Servicios Ofrecidos
export function ServiciosOfrecidosCelular() {
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    obtenerCitas(setCitas, setMensaje);
  }, []);

  return (
    <>
      <TituloGenericos
        titulo={"SERVICIOS OFRECIDOS"}
        icono={LuScissorsSquareDashedBottom}
      />
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
              mostrarSoloRealizadas={true}
            />
          ))
        ) : (
          <p>{mensaje}</p>
        )}
      </div>
    </>
  );
}
