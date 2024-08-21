import React, { useEffect, useState } from 'react'
import { CitaTablaBarbero } from './CitasAceptadasCelularBarbero'
import { PiAddressBook } from 'react-icons/pi';
import { obtenerCitasBarbero } from '../../../peticiones/CitasPeticiones';
import { TituloGenericos } from '../../../util/titulos/TituloGenericos';

export default function CitasRealizadasCelularBarbero() {

  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    obtenerCitasBarbero(setCitas, setMensaje);
  }, [citas]);

  return (
    <>
      <section>
        <TituloGenericos titulo={"CITAS REALIZADAS"} icono={PiAddressBook} />
      </section>
      <br />

      <section>
        <CitaTablaBarbero citas={citas} estado={"Realizada"} botonEliminar={true} />
      </section>
      {mensaje && <p className='p-mensaje-table-barbero-pc'>{mensaje}</p>}
    </>
  )
}
