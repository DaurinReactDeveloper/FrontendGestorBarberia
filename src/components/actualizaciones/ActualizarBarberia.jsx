import React, { useEffect, useState } from "react";
import Navbar from "../../util/navbar/Navbar";
import Footer from "../../util/footer/Footer";
import { MdOutlineUpdate } from "react-icons/md";
import { obtenerAdmins } from "../../peticiones/AdminPeticiones";
import { IoIosSave } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { actualizarBarberia } from "../../peticiones/BarberiasPeticiones";
import "../../css/actualizarbarberia.css";

export default function ActualizarBarberia() {
  const navigate = useNavigate();
  const { id } = useParams();
  const idBarberia = id;

  const [admin, setAdmins] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [nombreBarberia, setNombreBarberia] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    obtenerAdmins(setAdmins, setMensaje);
  }, []);

  //Mensajes
  const [mensajeAdmin, setMensajeAdmin] = useState("");
  const [mensajeNombre, setMensajeNombre] = useState("");
  const [mensajeBarberia, setMensajeBarberia] = useState("");
  const [mensaje, setMensaje] = useState("");

  //funciones Obtener
  function obtenerNombreBarberia(e) {
    const NuevoNombreAdmin = e.target.value;
    setNombreBarberia(NuevoNombreAdmin);
  }

  function obtenerAdminId(e) {
    const NuevoAdminId = e.target.value;
    setAdminId(NuevoAdminId);
  }

  function llamarActualizar(e) {
    e.preventDefault();

    setCargando(true);

    actualizarBarberia(
      idBarberia,
      nombreBarberia,
      adminId,
      setMensajeBarberia,
      setMensajeNombre,
      setMensajeAdmin,
      navigate
    ).finally(() => setCargando(false));
  }

  return (
    <>
      <Navbar />

      <h1 className="h1-actualizar-barberia">
        <MdOutlineUpdate />
        ACTUALIZAR BARBERIA
      </h1>

      <br />

      <section className="section-actualizar-barberia-pc">
        {/* Imagen */}
        <article className="article-actualizar-barberia-pc">
          <img
            src="/ActualizarBarberia.webp"
            alt="ActualizarAdmin"
            className="img-fluid"
          />
        </article>

        <br />

        {/* Google Form */}
        <form className="form-actualizar-barberia" onSubmit={llamarActualizar}>
          <div className="div-input-actualizar-barberia">
            <p className="p-form-actualizar-barberia">Nombre de la Barberia</p>
            <input
              type="text"
              value={nombreBarberia}
              minLength={5}
              maxLength={43}
              onChange={obtenerNombreBarberia}
              placeholder="Ingrese el nuevo nombre de la barberia"
              className="input-form-actualizar-barberia"
              required
            />
            <span className="span-actualizar-barberia">{mensajeNombre}</span>
          </div>

          <div className="div-select-actualizar-barberia">
            <div>
              <p className="p-form-actualizar-barberia">Dueño de la Barberia</p>
              <select
                className="select-form-actualizar-barberia"
                value={adminId}
                onChange={obtenerAdminId}
                required
              >
                <option>Selecciona el Administrador</option>

                {admin.map((admins, index) => (
                  <option key={index} value={admins.administradoresId}>
                    {admins.nombre}
                  </option>
                ))}
              </select>
              <span className="span-actualizar-barberia">{mensajeAdmin}</span>
              <span className="span-actualizar-barberia">{mensaje}</span>
            </div>
          </div>

          {mensajeBarberia && (
            <p className="p-mensaje-actualizar-barberia">{mensajeBarberia}</p>
          )}

          <div className="div-button-actualizar-barberia">
            <button
              className="button-actualizar-barberia"
              type="submit"
              disabled={cargando}
            >
              <IoIosSave />
              {cargando ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </section>

      <br />
      <br />

      <Footer />
    </>
  );
}
