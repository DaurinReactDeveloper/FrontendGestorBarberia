import React, { useEffect, useState } from "react";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { FaShop } from "react-icons/fa6";
import {
  eliminarBarberia,
  obtenerBarberias,
} from "../../../peticiones/BarberiasPeticiones";
import { FaShopSlash } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import "../../../css/listarbarberias.css";

export default function ListarBarberiasDaurin() {
  const [barberias, setBarberias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mensajeBarberia, setMensajeBarberia] = useState("");
  const [cargando, setcargando] = useState(false);

  useEffect(() => {
    obtenerBarberias(setBarberias, setMensaje);
  }, []);


  function llamarEliminar(idBarberia) {
    setcargando(false);
    eliminarBarberia(idBarberia,setMensajeBarberia);
    setcargando(true);
  }

  return (
    <>
      <TituloGenericos titulo={"LISTAR BARBERIAS"} icono={FaShop} />

      <br />

      <section className="section-listar-barberias">
        {mensaje && <p className="p-mensaje-listar-barberias">{mensaje}</p>}

        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="col-th-listarBarberias">
                #
              </th>
              <th scope="col" className="col-th-listarBarberias">
                Nombre
              </th>
              <th scope="col" className="col-th-listarBarberias">
                Nombre del Administrador
              </th>
              <th scope="col" className="col-th-listarBarberias">
                Editar
              </th>
              <th scope="col" className="col-th-listarBarberias">
                Eliminar
              </th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {barberias.map((barberia, index) => (
              <tr key={barberia.barberiasId}>
                <th scope="row">{index + 1}</th>
                <td>
                  {barberia.nombreBarberia}
                </td>
                <td className="td-listar-barberias-celular">
                 {barberia.nombreAdministrador}
                </td>
                <td>
                  <Link
                  to={`/ActualizarBarberia/${barberia.barberiasId}`}
                    className="button-editar-listar-barberias-celular"
                    disabled={cargando}
                  >
                    <BiSolidEdit />
                  </Link>
                </td>
                <td className="td-listar-barberias-celular">
                  <button
                    className="button-eliminar-listar-barberias-celular"
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

      {mensajeBarberia && <p>{mensajeBarberia}</p>}

      <br />
      <br />
    </>
  );
}
