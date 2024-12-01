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
import DetallesBarbero from "../components/detalles/DetallesBarbero.jsx";
import Comentario from "../components/comentario/Comentario.jsx";
import Required from "../components/Messages/Required.jsx";
import NotFound from "../components/Messages/NotFound.jsx";
import AdminDaurin from "../components/adminDaurin/AdminDaurin.jsx";
import DetallesCliente from "../components/detalles/DetallesCliente.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
    errorElement: <NotFound/>,
  },
  {
    path: "/estilos",
    element: (
      <ProtectedRoute
        element={<Estilos />}
        requiredRole="cliente"
        requiredRole2="barbero"
        elementDefault={"/required"}
      />
    ),
    errorElement: <NotFound/>,
  },
  {
    path: "/barberos",
    element: (
      <ProtectedRoute
        element={<BarberoBusqueda />}
        requiredRole="cliente"
        elementDefault={"/required"}
      />
    ),
    errorElement: <NotFound/>,
  },
  {
    path: "/registro",
    element: <Registro />,
    errorElement: <NotFound/>,
  },
  {
    path: "/iniciarsesion",
    element: <IniciarSesion />,
    errorElement: <NotFound/>,
  },
  {
    path: "/iniciarsesiongeneral/:tipo",
    element: <IniciarSesionGeneral />,
    errorElement: <NotFound/>,
  },
  {
    path: "/DetallesBarbero/:id",
    element: <DetallesBarbero/> ,
    errorElement: <NotFound/>,
  },
  {
    path: "/DetallesCliente/:id",
    element: (
      <ProtectedRoute
        element={<DetallesCliente />}
        requiredRole="cliente"
        requiredRole2="adminDaurin"
        requiredRole3="admin"
        elementDefault={"/iniciarsesiongeneral/cliente"}
      />),
      errorElement: <NotFound/>,
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
    errorElement: <NotFound/>,
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
    errorElement: <NotFound/>,
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
    errorElement: <NotFound/>,
  },
  {
    path: "/Daurin",
    element: (
      <ProtectedRoute
        element={<AdminDaurin />}
        requiredRole="adminDaurin"
        elementDefault={"/iniciarsesiongeneral/Daurin"}
      />
    ),
    errorElement: <NotFound/>,
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
    errorElement: <NotFound/>,
  },
  // RUTAS ATERNOS PARA ERRORES
  {
    path: "/required",
    element:<Required rol={"un Cliente"}/>,
    errorElement: <NotFound/>,
  }
]);
