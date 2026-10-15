

const API_URL =

  import.meta.env.VITE_API_URL || "http://localhost:3000";



export async function crearEvento(datos) {

  const respuesta = await fetch(`${API_URL}/registros`, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

    },

    body: JSON.stringify(datos),

  });



  const resultado = await respuesta.json();



  if (!respuesta.ok) {

    throw new Error(

      resultado.error || "No se pudo registrar el evento."

    );

  }



  return resultado;

}

