import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 10000,
});

export async function crearEvento(datos) {
  try {
    const respuesta = await api.post("/registros", datos);
    return respuesta.data;
  } catch (error) {
    const mensaje =
      error.response?.data?.error || "No se pudo registrar el evento.";
    throw new Error(mensaje, { cause: error });
  }
}
