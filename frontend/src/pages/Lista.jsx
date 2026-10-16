import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import EventCard from "../components/EventCard";

export default function Lista() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Función de carga que también usa el botón "Reintentar"
  const cargar = useCallback(async () => {
    setCargando(true);
    setError("");
    try {
      const respuesta = await api.get("/registros");
      if (!Array.isArray(respuesta.data)) {
        throw new Error("Formato de respuesta inválido");
      }
      setEventos(respuesta.data);
    } catch {
      setError(
        "No se pudieron consultar los eventos. Revisa la conexión e inténtalo de nuevo.",
      );
    } finally {
      setCargando(false);
    }
  }, []);

  // Se ejecuta al montar el componente (al abrir /lista)
  useEffect(() => {
    let activo = true;

    const obtenerEventos = async () => {
      try {
        const respuesta = await api.get("/registros");
        if (!Array.isArray(respuesta.data)) {
          throw new Error("Formato de respuesta inválido");
        }
        if (activo) setEventos(respuesta.data);
      } catch {
        if (activo)
          setError(
            "No se pudieron consultar los eventos. Revisa la conexión e inténtalo de nuevo.",
          );
      } finally {
        if (activo) setCargando(false);
      }
    };

    obtenerEventos();

    // Cleanup: si el usuario navega a otra página antes de que termine la petición,
    // no actualiza el estado de un componente ya desmontado
    return () => {
      activo = false;
    };
  }, []);

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-header list-heading">
          <div>
            <span className="eyebrow">Descubre lo que sucede</span>
            <h1>Eventos de la comunidad</h1>
            <p>Consulta las actividades compartidas por los organizadores.</p>
          </div>
          <Link to="/registro" className="btn btn-primary">
            + Registrar evento
          </Link>
        </div>

        {/* Estado: cargando */}
        {cargando && (
          <div className="state-panel" role="status">
            <h2>Cargando eventos…</h2>
            <p>Consultando las actividades registradas.</p>
          </div>
        )}

        {/* Estado: error con botón de reintento */}
        {!cargando && error && (
          <div className="state-panel" role="alert">
            <h2>Ocurrió un error</h2>
            <p>{error}</p>
            <button className="btn btn-secondary" onClick={cargar}>
              Reintentar consulta
            </button>
          </div>
        )}

        {/* Estado: lista vacía */}
        {!cargando && !error && eventos.length === 0 && (
          <div className="state-panel">
            <h2>Aún no hay eventos</h2>
            <p>Este espacio está listo para recibir su primera actividad.</p>
            <Link to="/registro" className="btn btn-primary">
              Registrar el primer evento →
            </Link>
          </div>
        )}

        {/* Estado: lista con eventos */}
        {!cargando && !error && eventos.length > 0 && (
          <>
            <span className="list-count">
              {eventos.length}{" "}
              {eventos.length === 1
                ? "evento registrado"
                : "eventos registrados"}
            </span>
            <div className="event-grid">
              {eventos.map((evento, index) => (
                <EventCard key={evento.id} evento={evento} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
