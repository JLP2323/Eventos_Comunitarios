export default function Registro() {
  return (
    <section className="page-section">
      <div className="container">
        <header className="page-header">
          <span className="eyebrow">Nuevo evento</span>
          <h1>Registrar un evento</h1>
          <p>
            Completa los datos de la actividad. Este formulario enviará la
            información a la API con una petición POST /registros.
          </p>
        </header>
        <form
          className="content-panel form-layout"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-grid">
            <div className="field">
              <label htmlFor="organizador">
                Organizador <span className="required">*</span>
              </label>
              <input
                id="organizador"
                name="organizador"
                type="text"
                placeholder="Ej. Junta de Acción Comunal"
              />
            </div>
            <div className="field">
              <label htmlFor="fecha">
                Fecha <span className="required">*</span>
              </label>
              <input id="fecha" name="fecha" type="date" />
            </div>
            <div className="field full">
              <label htmlFor="categoria">Categoría</label>
              <select id="categoria" name="categoria" defaultValue="">
                <option value="" disabled>
                  Selecciona una categoría
                </option>
                <option>Cultural</option>
                <option>Deportiva</option>
                <option>Ambiental</option>
                <option>Bienestar</option>
              </select>
            </div>
            <div className="field full">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                placeholder="Cuéntanos de qué trata el evento"
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled>
              Guardar evento
            </button>
            <span className="field-help">
              La conexión con la API se completará en la siguiente etapa.
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
