import React, { useEffect, useState } from "react";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { BsShop } from "react-icons/bs";
import { MdAddBusiness } from "react-icons/md";
import { obtenerAdmins } from "../../../peticiones/AdminPeticiones";
import { agregarBarberia } from "../../../peticiones/BarberiasPeticiones";
import "./../../../css/agregarbarberia.css";

export default function AgregarBarberiaDaurinPc() {
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
      <br />
      <TituloGenericos
        titulo={"AGREGAR BARBERIA"}
        icono={BsShop}
        clase="name-cita-pc"
        clase2="h1-pc-white"
        claseInformacion="section-principal-titulo-pc"
      />

      <br />

      <section className="row section-agregar-barberia-pc">
        <article className="col-6 article-agregar-barberia-pc">
          <img
            src="/BarberiaAgregarPc.webp"
            alt="BarberiaAgregar"
            className="img-agregar-barberia-pc"
          />
        </article>

        <form className="col-5" onSubmit={AgregarBarberia}>
        
          <div className="div-input-agregar-barberia-pc">
            {/* Nombre Barberia */}
            <label className="label-agregar-barberia-pc">
              <p className="p-agregar-barberia-pc">Nombre Barberia</p>
              <input
                className="input-agregar-barberia-pc"
                type="text"
                required
                placeholder="Ingrese el nombre de la Barberia"
                value={nombreBarberia}
                onChange={manejarCambioNombreBarberia}
              />
              {mensajeNombre && <p>{mensajeNombre}</p>}
            </label>
          </div>

          
          <div>
            {/* Dueño Barberia */}
            <label className="label-agregar-barberia-pc">
              <p className="p-agregar-barberia-pc">Administrador</p>

              <select
                className="select-agregar-barberia-pc"
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
              {mensajeAdmin && <p className="p-mensaje-agregar-admin-pc">{mensajeAdmin}</p>}
            </label>
          </div>

          {mensaje && <p className="p-mensaje-agregar-admin-pc">{mensaje}</p>}

          <div className="div-button-agregar-barberia-pc">
            <button className="button-agregar-barberia-pc" type="submit" disabled={cargando}>
              {cargando ? (
                "Guardando..."
              ) : (
                <>
                  <MdAddBusiness /> Agregar Barberia
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
