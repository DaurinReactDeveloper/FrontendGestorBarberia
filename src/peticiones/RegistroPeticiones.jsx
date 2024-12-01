import axios from "axios";
import { urlCliente } from "../endpoints/Endpoints";
import { ValidacionesRegistro } from "../util/validaciones/ValidacionesRegistros";
import { loginUser } from "../util/firebase/userFireBase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../util/firebase/firebaseConfig";

// Añadir ClienteRegistro
export async function anadirCliente(
  img,
  nombre,
  barberiaID,
  telefono,
  email,
  contrasena,
  setImgMensaje,
  setNombreMensaje,
  setTelefonoMensaje,
  setEmailMensaje,
  setContrasenaMensaje,
  setRegistroMensaje,
  setRegistroErrorMensaje,
  setCargando,
  setAuthError
) {
  if (
    !ValidacionesRegistro(
      img,
      nombre,
      telefono,
      email,
      contrasena,
      setImgMensaje,
      setNombreMensaje,
      setTelefonoMensaje,
      setEmailMensaje,
      setContrasenaMensaje
    )
  ) {
    return;
  }

  // Autenticación del usuario - FireBase
  const isAuthenticated = await loginUser(
    "dauringonzales7@gmail.com",
    "Daurin16"
  );

  if (isAuthenticated) {
    setCargando(true);

    if (img && nombre && telefono && email && contrasena) {
      try {
        const imageRef = ref(storage, `clientes/${nombre}.jpg`);
        await uploadBytes(imageRef, img);
        const imageUrl = await getDownloadURL(imageRef);

        //Convertir String
        const BarberiaId = Number(barberiaID);

        const idUser = localStorage.getItem("id");

        //Dto
        const clienteData = {
          Imgcliente: imageUrl,
          barberiaId: BarberiaId,
          Nombre: nombre,
          Telefono: telefono,
          Email: email,
          Password: contrasena,
          changeDate: new Date(),
          changeUser: idUser,
        };

        //Peticion
        const peticion = await axios.post(`${urlCliente}/save`, clienteData);

        //Verificacion de la peticion
        if (peticion.data.success) {
          setTimeout(() => {
            setRegistroMensaje("Cliente registrado exitosamente");
            window.location.href = "/iniciarsesion";
          }, 1000);
        } else {
          setRegistroErrorMensaje(peticion.data.message);

          setTimeout(() => {
            setRegistroErrorMensaje(null);
          }, 2000);
        }
      } catch (error) {
        console.error(
          "Error subiendo la imagen o enviando los datos",
          error.message
        );
      }
    } else {
      setAuthError("No se pudo autenticar al usuario.");
    }
  } else {
    setRegistroErrorMensaje("Por favor complete todos los campos.");
  }
  setCargando(false);
}
