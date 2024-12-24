import React, { useEffect, useState } from "react";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { FaShop, FaShopSlash } from "react-icons/fa6";
import {
  eliminarBarberia,
  obtenerBarberias,
} from "../../../peticiones/BarberiasPeticiones";
import { BiSolidEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./../../../css/listarbarberias.css";

export default function ListarBarberiasDaurinPc() {
  const [barberias, setBarberias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mensajeBarberia, setMensajeBarberia] = useState("");
  const [cargando, setcargando] = useState(false);

  useEffect(() => {
    obtenerBarberias(setBarberias, setMensaje);
  }, []);

  function llamarEliminar(idBarberia) {
    setcargando(false);
    eliminarBarberia(idBarberia, setMensajeBarberia);
    setcargando(true);
  }

  return (
    <>
      <br />
      <TituloGenericos
        titulo={"LISTAR BARBERIAS"}
        icono={FaShop}
        clase="name-cita-pc"
        clase2="h1-pc-white"
        claseInformacion="section-principal-titulo-pc"
      />

      <br />
      <section className="section-listar-barberias-pc">
        {mensaje && <p className="p-mensaje-listar-barberias-pc">{mensaje}</p>}

        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="th-listar-barberias-pc">
                #
              </th>
              <th scope="col" className="th-listar-barberias-pc">
                Nombre
              </th>
              <th scope="col" className="th-listar-barberias-pc">
                Nombre del Administrador
              </th>
              <th scope="col" className="th-listar-barberias-pc">
                Editar
              </th>
              <th scope="col" className="th-listar-barberias-pc">
                Eliminar
              </th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {barberias.map((barberia, index) => (
              <tr key={barberia.barberiasId}>
                <th scope="row">{index + 1}</th>
                <td className="td-listar-barberias-pc">
                  {barberia.nombreBarberia}
                </td>
                <td className="td-listar-barberias-pc">
                  {barberia.nombreAdministrador}
                </td>
                <td className="td-listar-barberias-pc">
                  <Link
                    title="Actualizar Barberia"
                    className="link-actualizar-barberia-pc"
                    to={`/ActualizarBarberia/${barberia.barberiasId}`}
                    disabled={cargando}
                  >
                    <BiSolidEdit />
                  </Link>
                </td>
                <td className="td-listar-barberias-pc">
                  <button
                    title="Eliminar Barberia"
                    className="button-eliminar-barberia-pc"
                    type="button"
                    onClick={() => llamarEliminar(barberia.barberiasId)}
                    disabled={cargando}
                  >
                    <FaShopSlash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {mensajeBarberia && (
        <p className="p-mensaje-listar-barberias-pc">{mensajeBarberia}</p>
      )}
    </>
  );
}
