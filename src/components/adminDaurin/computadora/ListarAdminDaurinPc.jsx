import React, { useEffect, useState } from "react";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { FaAddressBook } from "react-icons/fa";
import { TbEditOff } from "react-icons/tb";
import { MdOutlinePersonOff } from "react-icons/md";
import {
  eliminarAdmin,
  obtenerAdmins,
} from "../../../peticiones/AdminPeticiones";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import "./../../../css/listaradmin.css";

export default function ListarAdminDaurinPc() {
  const [admins, setAdmins] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mensajeAdmin, setMensajeAdmin] = useState("");

  useEffect(() => {
    obtenerAdmins(setAdmins, setMensaje);
  }, []);

  const llamarEliminar = (adminId) => {
    eliminarAdmin(adminId, setMensajeAdmin);
  };

  return (
    <>
      <br />
      <TituloGenericos
        titulo={"LISTAR ADMINS"}
        icono={FaAddressBook}
        clase="name-cita-pc"
        clase2="h1-pc-white"
        claseInformacion="section-principal-titulo-pc"
      />

      <br />
      <section className="section-listar-admin">
        {mensaje && <p className="mensaje-error">{mensaje}</p>}

        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="col-th-listarAdmin">
                #
              </th>
              <th scope="col" className="col-th-listarAdmin">
                Nombre
              </th>
              <th scope="col" className="col-th-listarAdmin">
                Telefono
              </th>
              <th scope="col" className="col-th-listarAdmin">
                Email
              </th>
              <th scope="col" className="col-th-listarAdmin">
                Tipo
              </th>
              <th scope="col" className="col-th-listarAdmin">
                Editar
              </th>
              <th scope="col" className="col-th-listarAdmin">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {admins.map((admin, index) => (
              <tr key={admin.administradoresId}>
                <th scope="row">{index + 1}</th>
                <td>{admin.nombre}</td>
                <td>{admin.telefono}</td>
                <td>{admin.email}</td>
                <td>{admin.tipo}</td>
                <td className="td-button-editar-admins">
                  <Link
                    to={
                      admin.tipo !== "PropietarioApp"
                        ? `/ActualizarAdmin/${admin.administradoresId}`
                        : "#"
                    }
                    title="Editar administrador"
                    className="button-editar-admin"
                    disabled={admin.tipo === "PropietarioApp"}
                  >
                    {admin.tipo === "PropietarioApp" ? (
                      <TbEditOff />
                    ) : (
                      <FaUserEdit />
                    )}
                  </Link>
                </td>
                <td className="td-button-eliminar-admins">
                  <button
                    type="button"
                    title="Eliminar administrador"
                    className="button-eliminar-admin"
                    onClick={() => llamarEliminar(admin.administradoresId)}
                    disabled={admin.tipo === "PropietarioApp"}
                  >
                    {admin.tipo === "PropietarioApp" ? (
                      <MdOutlinePersonOff />
                    ) : (
                      <TiUserDelete />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <br />
      {mensajeAdmin && <p className="mensaje-admin-eliminar">{mensajeAdmin}</p>}
      <br />
    </>
  );
}
