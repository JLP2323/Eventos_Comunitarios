
import { useState } from "react";
import { Link } from "react-router-dom";
import { crearEvento } from "../api";
import {
  CATEGORIAS,
  fechaActual,
  validarEvento,
} from "../validation";

const formularioInicial = {
  organizador: "",
  email: "",
  descripcion: "",
  fecha: "",
  categoria: "",
};

export default function Registro() {
  const [datos, setDatos] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  function handleChange(evento) {
    const { name, value } = evento.target;

    setDatos((anteriores) => ({
      ...anteriores,
      [name]: value,
    }));

    setErrores((anteriores) => ({
      ...anteriores,
      [name]: "",
    }));
  }

  async function handleSubmit(evento) {
    evento.preventDefault();

    if (enviando) return;

    setMensaje("");
    const erroresEncontrados = validarEvento(datos);
    setErrores(erroresEncontrados);

    if (Object.keys(erroresEncontrados).length > 0) {
      return;
    }

    setEnviando(true);

    try {
      const resultado = await crearEvento({
        organizador: datos.organizador.trim(),
        email: datos.email.trim(),
        descripcion: datos.descripcion.trim(),
        fecha: datos.fecha,
        categoria: datos.categoria,
      });

      setMensaje(
        resultado.mensaje || "Evento registrado correctamente."
      );
      setDatos(formularioInicial);
      setErrores({});
    } catch (error) {
      setErrores({
        general: error.message || "Error de conexión con el servidor.",
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="page-section">
      <div className="container">
        <header className="page-header">
          <span className="eyebrow">Nuevo evento</span>
          <h1>Registrar un evento</h1>
          <p>
            Completa los datos de la actividad para
            compartirla con la comunidad.
          </p>
        </header>

        <form
          className="content-panel form-layout"
          onSubmit={handleSubmit}
          noValidate
        >
          {mensaje && (
            <div className="notice notice-success" role="status">
              {mensaje}
              <div>
                <Link to="/lista">Consultar eventos →</Link>
              </div>
            </div>
          )}

          {errores.general && (
            <div className="notice notice-error" role="alert">
              {errores.general}
            </div>
          )}

          <div className="form-grid">
            <div className="field">
              <label htmlFor="organizador">
                Organizador <span className="required">*</span>
              </label>

              <input
                id="organizador"
                name="organizador"
                type="text"
                placeholder="Ej. Comité Barrial"
                value={datos.organizador}
                onChange={handleChange}
                aria-invalid={Boolean(errores.organizador)}
                aria-describedby={
                  errores.organizador ? "error-organizador" : undefined
                }
                maxLength={100}
              />

              {errores.organizador && (
                <span id="error-organizador" className="field-error">
                  {errores.organizador}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="email">
                Correo electrónico <span className="required">*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="ejemplo@correo.com"
                value={datos.email}
                onChange={handleChange}
                aria-invalid={Boolean(errores.email)}
                aria-describedby={
                  errores.email ? "error-email" : undefined
                }
              />

              {errores.email && (
                <span id="error-email" className="field-error">
                  {errores.email}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="fecha">
                Fecha del evento <span className="required">*</span>
              </label>

              <input
                id="fecha"
                name="fecha"
                type="date"
                min={fechaActual()}
                value={datos.fecha}
                onChange={handleChange}
                aria-invalid={Boolean(errores.fecha)}
                aria-describedby={
                  errores.fecha ? "error-fecha" : undefined
                }
              />

              {errores.fecha && (
                <span id="error-fecha" className="field-error">
                  {errores.fecha}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="categoria">
                Categoría <span className="required">*</span>
              </label>

              <select
                id="categoria"
                name="categoria"
                value={datos.categoria}
                onChange={handleChange}
                aria-invalid={Boolean(errores.categoria)}
                aria-describedby={
                  errores.categoria ? "error-categoria" : undefined
                }
              >
                <option value="">Selecciona una categoría</option>

                {CATEGORIAS.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>

              {errores.categoria && (
                <span id="error-categoria" className="field-error">
                  {errores.categoria}
                </span>
              )}
            </div>

            <div className="field full">
              <label htmlFor="descripcion">
                Descripción <span className="required">*</span>
              </label>

              <textarea
                id="descripcion"
                name="descripcion"
                placeholder="Describe el evento comunitario..."
                rows={5}
                maxLength={1000}
                value={datos.descripcion}
                onChange={handleChange}
                aria-invalid={Boolean(errores.descripcion)}
                aria-describedby={
                  errores.descripcion ? "error-descripcion" : undefined
                }
              />

              {errores.descripcion && (
                <span id="error-descripcion" className="field-error">
                  {errores.descripcion}
                </span>
              )}

              <span className="field-help">
                {datos.descripcion.length}/1000 caracteres
              </span>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={enviando}
            >
              {enviando ? "Guardando..." : "Guardar evento"}
            </button>

            <Link to="/lista" className="btn btn-secondary">
              Ver eventos
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
