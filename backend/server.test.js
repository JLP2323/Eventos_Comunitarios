const { test } = require("node:test");
const assert = require("node:assert/strict");
const { validar, fechaReal } = require("./server");

// Fecha de mañana en formato YYYY-MM-DD
const fecha = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

const valido = {
  organizador: "Comité Vecinal",
  email: "contacto@ejemplo.com",
  descripcion: "Jornada de integración comunitaria",
  fecha,
  categoria: "Cultural",
};

test("acepta evento válido", () => assert.equal(validar(valido), null));

test("rechaza email incorrecto", () =>
  assert.match(validar({ ...valido, email: "malo" }), /correo/));

test("rechaza fecha imposible", () => {
  assert.equal(fechaReal("2026-02-30"), false);
  assert.match(validar({ ...valido, fecha: "2026-02-30" }), /fecha/);
});

test("rechaza categorías inventadas", () =>
  assert.match(validar({ ...valido, categoria: "Otra" }), /categoría/));

test("rechaza descripción corta", () =>
  assert.match(validar({ ...valido, descripcion: "corto" }), /descripción/));
