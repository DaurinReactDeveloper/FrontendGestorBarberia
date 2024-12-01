export default function calcularComentarios(comentario, setCantidadComentario) {
    let contadorComentarios = 0;
  
    for (let i = 0; i < comentario.length; i++) {
      contadorComentarios++;
    }
  
    setCantidadComentario(contadorComentarios);
  }
  