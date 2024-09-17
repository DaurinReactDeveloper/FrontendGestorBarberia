import { createBrowserRouter } from "react-router-dom";
import Inicio from "../components/inicio/Inicio.jsx";
import BarberoBusqueda from "../components/barberosBusqueda/BarberosBusqueda.jsx";
import Estilos from "../components/estiloscorteBusqueda/EstilosCorte.jsx";
import Registro from "../components/autenticacion/registro/Registro.jsx";
import IniciarSesion from "../components/autenticacion/iniciarsesion/IniciarSesion.jsx";
import IniciarSesionGeneral from "../components/autenticacion/iniciarsesion/IniciarSesionGeneral.jsx";
import Cliente from "../components/clientes/Cliente.jsx";
import ProtectedRoute from "../util/tokens/Roles.jsx";
import Barbero from "../components/barbero/Barbero.jsx";
import Admin from "../components/administrador/Admin.jsx";
import {DetallesBarbero,DetallesCliente} from "../components/detalles/DetallesBarberoCliente.jsx";
import Comentario from "../components/comentario/Comentario.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
    errorElement: <h1>Ha Ocurrido un Error</h1>,
  },
  {
    path: "/estilos",
    element: <Estilos />,
    errorElement: <h1>Ha Ocurrido un Error</h1>,
  },
  {
    path: "/barberos",
    element: <BarberoBusqueda />,
    errorElement: <h1>Ha Ocurrido un Error</h1>,
  },
  {
    path: "/registro",
    element: <Registro />,
    errorElement: <h1>Ha Ocurrido un Error</h1>,
  },
  {
    path: "/iniciarsesion",
    element: <IniciarSesion />,
    errorElement: <h1>Ha Ocurrido un Error</h1>,
  },
  {
    path: "/iniciarsesiongeneral/:tipo",
    element: <IniciarSesionGeneral />,
    errorElement: <h1>Ha Ocurrido un Error</h1>,
  },
  {
    path: "/DetallesBarbero/:id",
    element: <DetallesBarbero/> ,
    errorElement: <h1>Ha Ocurrido un Error</h1>,
  },
  {
    path: "/DetallesCliente/:id",
    element: (
      <ProtectedRoute
        element={<DetallesCliente />}
        requiredRole="cliente"
        requiredRole2="barbero"
        requiredRole3="admin"
        elementDefault={"/iniciarsesiongeneral/cliente"}
      />),
    errorElement: <h1>Ha Ocurrido un Error</h1>,
  },
  {
    path: "/cliente",
    element: (
      <ProtectedRoute
        element={<Cliente />}
        requiredRole="cliente"
        elementDefault={"/iniciarsesiongeneral/cliente"}
      />
    ),
    errorElement: <h1>Ha Ocurrido un Error</h1>,
  },
  {
    path: "/barbero",
    element: (
      <ProtectedRoute
        element={<Barbero />}
        requiredRole="barbero"
        elementDefault={"/iniciarsesiongeneral/barbero"}
      />
    ),
    errorElement: <h1>Ha Ocurrido un Error</h1>,
  },
  {
    path: "/administrador",
    element: (
      <ProtectedRoute
        element={<Admin />}
        requiredRole="admin"
        elementDefault={"/iniciarsesiongeneral/administrador"}
      />
    ),
    errorElement: <h1>Ha Ocurrido un Error</h1>,
  },
  {
    path: "/comentario/:citaId",
    element: (
      <ProtectedRoute
        element={<Comentario />}
        requiredRole="cliente"
        elementDefault={"/iniciarsesiongeneral/cliente"}
      />
    ),
    errorElement: <h1>Ha Ocurrido un Error</h1>,
  },
]);
