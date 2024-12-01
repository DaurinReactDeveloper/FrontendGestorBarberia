import React, { useEffect, useState } from "react";
import { actualizarAdmin } from "../../peticiones/AdminPeticiones";
import "./../../css/modaladmin.css";

export function ModalActualizarAdmin({ idAdmin }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const adminId =  idAdmin ;

  // Mensajes
  const [nombreMensaje, setNombreMensaje] = useState("");
  const [emailMensaje, setEmailMensaje] = useState("");
  const [telefonoMensaje, setTelefonoMensaje] = useState("");
  const [passwordMensaje, setPasswordMensaje] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Estado de carga
  const [cargando, setCargando] = useState(false);

  // Funciones para obtener valores de los inputs
  function obtenerNombre(e) {
    setNombre(e.target.value);
  }

  function obtenerEmail(e) {
    setEmail(e.target.value);
  }

  function obtenerTelefono(e) {
    setTelefono(e.target.value);
  }

  function obtenerPassword(e) {
    setPassword(e.target.value);
  }

  // Función para actualizar el administrador
  function llamarAddAdmin(e) {
    e.preventDefault();
    setMensaje("");
    setCargando(true);

    if(idAdmin !== null){
    actualizarAdmin(
      adminId,
      nombre,
      email,
      telefono,
      password,
      setNombreMensaje,
      setEmailMensaje,
      setTelefonoMensaje,
      setPasswordMensaje,
      setMensaje,
      setCargando
    ).finally(() => setCargando(false));
    }

  }

  return (
    <>
    <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 modal-title-actualizar-admin"
                id="exampleModalLabel"
              >
                Actualizar administrador
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <p className="p-mensaje-modal-actualizar-admin">
                Completa los campos a continuación para actualizar la
                información del administrador. Recuerda guardar los cambios
                antes de salir.
              </p>

              {/* INPUTS */}
              <div className="div-modal-actualizar-admin">
                <p className="p-modal-actualizar-admin">Nombre</p>
                <input
                  type="text"
                  className="inputs-modal-actualizar-admin"
                  placeholder="Inserte el nombre"
                  value={nombre}
                  minLength={5}
                  maxLength={28}
                  onChange={obtenerNombre}
                  required
                />
                <span className="mensaje-error">{nombreMensaje}</span>
              </div>

              <div className="div-modal-actualizar-admin">
                <p className="p-modal-actualizar-admin">Email</p>
                <input
                  type="email"
                  className="inputs-modal-actualizar-admin"
                  placeholder="dauringonzales6@gmail.com"
                  value={email}
                  minLength={5}
                  maxLength={48}
                  onChange={obtenerEmail}
                  required
                />
                <span className="mensaje-error">{emailMensaje}</span>
              </div>

              <div className="div-modal-actualizar-admin">
                <p className="p-modal-actualizar-admin">Telefono</p>
                <input
                  type="text"
                  className="inputs-modal-actualizar-admin"
                  placeholder="8099187905"
                  value={telefono}
                  minLength={5}
                  maxLength={19}
                  onChange={obtenerTelefono}
                  required
                />
                <span className="mensaje-error">{telefonoMensaje}</span>
              </div>

              <div className="div-modal-actualizar-admin">
                <p className="p-modal-actualizar-admin">Contraseña</p>
                <input
                  type="password"
                  className="inputs-modal-actualizar-admin"
                  placeholder="Inserte la contraseña"
                  value={password}
                  minLength={5}
                  maxLength={9}
                  onChange={obtenerPassword}
                  required
                />
                <span className="mensaje-error">{passwordMensaje}</span>
              </div>
            </div>

            {/* BOTONES */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn-modal-cancelar-admin"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-modal-guardar-admin"
                onClick={llamarAddAdmin}
                disabled={cargando}
              >
                {cargando ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
            {mensaje && <p className="mensaje-actualizacion">{mensaje}</p>}
          </div>
        </div>
      </div>      
    </>
  );
}
