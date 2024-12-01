export default function calcularCantidadCitas(
    citas,
    setCantidadRealizada,
    setCantidadCancelada
  ) {
    let contadorRealizadas = 0;
    let contadorCanceladas = 0;
  
    for (let i = 0; i < citas.length; i++) {
      if (citas[i].estado === "Realizada") {
        contadorRealizadas++;
      }
  
      if (citas[i].estado === "Cancelada") {
        contadorCanceladas++;
      }
    }
    setCantidadRealizada(contadorRealizadas);
    setCantidadCancelada(contadorCanceladas);
  }
  