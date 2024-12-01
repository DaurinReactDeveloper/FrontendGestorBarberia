import React, { useEffect, useState } from "react";
import {
  EliminarEstiloByBarberiaId,
  obtenerEstilosByAdminId,
} from "../../peticiones/EstilosPeticiones";
import Aos from "aos";
import "aos/dist/aos.css";

export function CartasCortes() {
  const [estilosCortes, setEstilosCortes] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [mensajeCortes, setMensajeCortes] = useState(null);
  const [cargando, setCargando] = useState(false);


  useEffect(() => {
    obtenerEstilosByAdminId(setEstilosCortes, setMensaje);
    Aos.init();
  }, []);

  function PeticionEliminarCorte(idEstilo) {
    setCargando(false);
    EliminarEstiloByBarberiaId(idEstilo, setMensajeCortes);
    setCargando(true);
  }

  return (
    <>
      <section className="row section-carta-barbero">
        {mensaje && <p>{mensaje}</p>}
        {estilosCortes.map((item) => (
          <div
            key={item.estiloId}
            className="col-auto card card-estilo-barbero"
            data-aos="zoom-in-down"
          >
            <img
              src={item.imgestilo}
              className="card-img-top img-card-barbero img-card-estilo"
              alt="barbero"
            />
            <div className="card-body card-body-barbero">
              <p className="card-text card-nombre-barbero">
                <strong>{item.nombre}</strong>
              </p>
              <p className="card-text card-nombre-barbero">
                {item.descripcion}
              </p>
              <p className="card-text card-telefono-barbero">
                Precio:<strong> ${item.precio} </strong>
              </p>

              {mensajeCortes && <p className="carta-mensaje">{mensajeCortes}</p>}
              
              <div className="div-button-eliminar-corte-telefono">
                <button
                  type="button"
                  className="boton-eliminar-corte"
                  onClick={() => PeticionEliminarCorte(item.estiloId)}
                >
                {cargando ? "Cargando..." : "Eliminar Estilo"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
