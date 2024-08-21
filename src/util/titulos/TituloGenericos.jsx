import "../../css/titulogenericos.css";

export function TituloGenericos({ titulo, icono: Icono, clases = "", clase2 }) {
  return (
    <>
      <section className={`sectionNameEstilos  ${clases}`}>
        <Icono className={clase2} />
        <h1 className={`titulo-sectionNameEstilos  ${clase2}`}>{titulo}</h1>
      </section>
    </>
  );
}
