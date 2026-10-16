const express = require("express");
const cors = require("cors");
const fs = require("node:fs");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const FILE_PATH = process.env.DATA_FILE || path.join(__dirname, "eventos.json");
const CATEGORIAS = ["Deportes", "Medio Ambiente", "Cultural", "Salud"];

app.use(cors());
app.use(express.json());

// Verifica que la fecha sea real (ej: 2026-02-30 no existe)
function fechaReal(fecha) {
  if (typeof fecha !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(fecha))
    return false;
  const [anio, mes, dia] = fecha.split("-").map(Number);
  const date = new Date(Date.UTC(anio, mes - 1, dia));
  return (
    date.getUTCFullYear() === anio &&
    date.getUTCMonth() === mes - 1 &&
    date.getUTCDate() === dia
  );
}

// Devuelve la fecha de hoy en formato YYYY-MM-DD
function fechaActualLocal() {
  const hoy = new Date();
  return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
}

// Valida todos los campos del cuerpo de la petición
function validar(body) {
  if (!body || typeof body !== "object" || Array.isArray(body))
    return "Los datos deben ser un objeto JSON.";
  const { organizador, email, descripcion, fecha, categoria } = body;
  if (
    typeof organizador !== "string" ||
    organizador.trim().length < 2 ||
    organizador.trim().length > 100
  )
    return "El organizador debe tener entre 2 y 100 caracteres.";
  if (
    typeof email !== "string" ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  )
    return "El correo electrónico no es válido.";
  if (
    typeof descripcion !== "string" ||
    descripcion.trim().length < 10 ||
    descripcion.trim().length > 1000
  )
    return "La descripción debe contener entre 10 y 1000 caracteres.";
  if (!fechaReal(fecha) || fecha < fechaActualLocal())
    return "La fecha debe ser válida y no anterior a hoy.";
  if (!CATEGORIAS.includes(categoria)) return "La categoría no está permitida.";
  return null;
}

// Lee el archivo JSON; si no existe, lo crea vacío
function leerRegistros() {
  try {
    const contenido = fs.readFileSync(FILE_PATH, "utf8");
    const data = JSON.parse(contenido);
    if (!Array.isArray(data))
      throw new Error("El almacenamiento no contiene una lista.");
    return data;
  } catch (err) {
    if (err.code === "ENOENT") {
      try {
        fs.writeFileSync(FILE_PATH, "[]\n", { flag: "wx" });
        return [];
      } catch (creacionError) {
        if (creacionError.code === "EEXIST") return leerRegistros();
        throw creacionError;
      }
    }
    throw err;
  }
}

// Guarda el arreglo en el archivo de forma segura (escribe en temporal y renombra)
function guardarRegistros(registros) {
  const temporal = `${FILE_PATH}.${process.pid}.${randomUUID()}.tmp`;
  try {
    fs.writeFileSync(temporal, JSON.stringify(registros, null, 2), {
      encoding: "utf8",
      flag: "wx",
    });
    fs.renameSync(temporal, FILE_PATH);
  } finally {
    try {
      fs.unlinkSync(temporal);
    } catch (error) {
      if (error.code !== "ENOENT")
        console.error("Error al limpiar temporal:", error);
    }
  }
}

// GET / — comprueba que la API está viva
app.get("/", (_req, res) =>
  res.status(200).json({
    mensaje: "API de Eventos Comunitarios activa",
    registros: "/registros",
  }),
);

// GET /registros — devuelve todos los eventos guardados
app.get("/registros", (_req, res) => {
  try {
    res.status(200).json(leerRegistros());
  } catch (err) {
    console.error("Error de lectura:", err);
    res
      .status(500)
      .json({ error: "No se pudo consultar el archivo de registros." });
  }
});

// POST /registros — valida y guarda un nuevo evento
app.post("/registros", (req, res) => {
  const error = validar(req.body);
  if (error) return res.status(400).json({ error });
  try {
    const registros = leerRegistros();
    const { organizador, email, descripcion, fecha, categoria } = req.body;
    const evento = {
      id: randomUUID(),
      organizador: organizador.trim(),
      email: email.trim(),
      descripcion: descripcion.trim(),
      fecha,
      categoria,
    };
    registros.push(evento);
    guardarRegistros(registros);
    return res
      .status(201)
      .json({ mensaje: "Evento registrado con éxito", evento });
  } catch (err) {
    console.error("Error de almacenamiento:", err);
    return res.status(500).json({
      error:
        "No se pudo guardar el evento. No se modificó el registro existente.",
    });
  }
});

// Solo arranca el servidor si se ejecuta directamente (no en los tests)
if (require.main === module)
  app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));

// Exporta para que server.test.js pueda importar sin arrancar el servidor
module.exports = { app, validar, fechaReal, leerRegistros };
