import "../../css/cliente.css";

export function BienvenidoCelular({ nombre }) {
  return (
    <>
      <div className="div-cliente-bienvenido">
        <h1 className="h1-cliente-bienvenido">
          BIENVENIDO <strong>{nombre}</strong>{" "}
        </h1>
      </div>
    </>
  );
}
