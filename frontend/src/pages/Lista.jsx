import { Link } from "react-router-dom";

export default function Lista() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="list-heading">
          <header className="page-header">
            <span className="eyebrow">Agenda comunitaria</span>
            <h1>Explorar eventos</h1>
            <p>
              Aquí se mostrarán los eventos registrados, obtenidos desde la API
              con una petición GET /registros.
            </p>
          </header>
          <span className="list-count">0 eventos</span>
        </div>
        <div className="state-panel">
          <div className="state-symbol" aria-hidden="true">
            🗓️
          </div>
          <h2>Aún no hay eventos para mostrar</h2>
          <p>
            Cuando conectemos la lista con el backend, cada evento aparecerá
            aquí como una tarjeta.
          </p>
          <div className="page-actions" style={{ justifyContent: "center" }}>
            <Link to="/registro" className="btn btn-primary">
              + Registrar el primero
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
