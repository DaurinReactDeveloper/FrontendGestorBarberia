import React, { useEffect, useState } from "react";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { BsShop } from "react-icons/bs";
import { MdAddBusiness } from "react-icons/md";
import { obtenerAdmins } from "../../../peticiones/AdminPeticiones";
import { agregarBarberia } from "../../../peticiones/BarberiasPeticiones";
import "./../../../css/agregarbarberia.css";

export default function AgregarBarberiaDaurin() {
  const [admins, setAdmins] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [nombreBarberia, setNombreBarberia] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajeNombre, setMensajeNombre] = useState("");
  const [mensajeAdmin, setMensajeAdmin] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    obtenerAdmins(setAdmins, setMensaje);
  }, []);

  const manejarCambioAdminId = (e) => {
    const NuevoAdminId = e.target.value;
    setAdminId(NuevoAdminId);
  };

  const manejarCambioNombreBarberia = (e) => {
    setNombreBarberia(e.target.value);
  };

  const AgregarBarberia = async (e) => {
    e.preventDefault();

    setCargando(true);

    await agregarBarberia(
      nombreBarberia,
      adminId,
      setMensaje,
      setMensajeNombre,
      setMensajeAdmin
    );

    setCargando(false);
  };

  return (
    <>
      <TituloGenericos titulo={"AGREGAR BARBERIA"} icono={BsShop} />

      <br />

      <article className="article-img-agreagar-barberia-celular">
        <img
          src="/BarberiaAgregarPc.webp"
          alt="BarberiaAgregar"
          className="img-fluid img-agregar-barberia-celular"
        />
      </article>

      <section>
        <form onSubmit={AgregarBarberia}>
          <div className="div-agregar-barberia-input-celular">
            {/* Nombre Barberia */}
            <label className="label-agregar-barberia-celular">
              <p className="p-label-agregar-barberia">Nombre Barberia</p>
              <input
                type="text"
                required
                placeholder="Ingrese el nombre de la Barberia"
                className="input-agregar-barberia-celular"
                value={nombreBarberia}
                onChange={manejarCambioNombreBarberia}
              />
              {mensajeNombre && (
                <p className="mensaje-error">{mensajeNombre}</p>
              )}
            </label>
          </div>

          <div className="div-agregar-barberia-select-celular">
            {/* Dueño Barberia */}
            <label className="label-agregar-barberia-celular">
              <p className="p-label-agregar-barberia">Administrador</p>

              <select
                className="select-agregar-barberia-celular"
                value={adminId}
                onChange={manejarCambioAdminId}
                required
              >
                <option value="">Selecciona el Dueño</option>

                {admins.map((admin, index) => (
                  <option key={index} value={admin.administradoresId}>
                    {admin.nombre}
                  </option>
                ))}
              </select>
              {mensajeAdmin && <p className="mensaje-error">{mensajeAdmin}</p>}
            </label>
          </div>

          {mensaje && (
            <p className="mensaje-exito-agregar-barberia-celular">{mensaje}</p>
          )}

          <div className="div-agregar-barberia-celular">
            <button
              type="submit"
              className="button-agregar-barberia-celular"
              disabled={cargando}
            >
              {cargando ? (
                "Guardando..."
              ) : (
                <>
                  <MdAddBusiness /> Agregar Barberia
                </>
              )}
            </button>
          </div>
          <br />
        </form>
      </section>
    </>
  );
}
