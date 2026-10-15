

export const CATEGORIAS = [

  "Cultural",

  "Deportiva",

  "Ambiental",

  "Bienestar",

];



export function fechaActual() {

  const fecha = new Date();

  const anio = fecha.getFullYear();

  const mes = String(fecha.getMonth() + 1).padStart(2, "0");

  const dia = String(fecha.getDate()).padStart(2, "0");



  return `${anio}-${mes}-${dia}`;

}



export function validarEvento(datos) {

  const errores = {};



  const organizador = datos.organizador.trim();

  const email = datos.email.trim();

  const descripcion = datos.descripcion.trim();



  if (organizador.length < 2 || organizador.length > 100) {

    errores.organizador =

      "El organizador debe tener entre 2 y 100 caracteres.";

  }



  const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



  if (!patronEmail.test(email)) {

    errores.email =

      "Introduce un correo electrónico válido.";

  }



  if (descripcion.length < 10 || descripcion.length > 1000) {

    errores.descripcion =

      "La descripción debe tener entre 10 y 1000 caracteres.";

  }



  const fechaValida = /^\d{4}-\d{2}-\d{2}$/.test(datos.fecha);

  const fechaConvertida = new Date(`${datos.fecha}T12:00:00`);



  const fechaReal =

    fechaValida &&

    !Number.isNaN(fechaConvertida.getTime()) &&

    fechaConvertida.getFullYear() === Number(datos.fecha.slice(0, 4)) &&

    fechaConvertida.getMonth() + 1 === Number(datos.fecha.slice(5, 7)) &&

    fechaConvertida.getDate() === Number(datos.fecha.slice(8, 10));



  if (!fechaReal || datos.fecha < fechaActual()) {

    errores.fecha =

      "Selecciona una fecha válida, actual o futura.";

  }



  if (!CATEGORIAS.includes(datos.categoria)) {

    errores.categoria =

      "Selecciona una categoría válida.";

  }



  return errores;

}

