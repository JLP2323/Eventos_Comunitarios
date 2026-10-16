export default function EventCard({ evento, index }) {
  // Convierte "2026-10-20" a "20 de octubre de 2026"
  const fecha = /^\d{4}-\d{2}-\d{2}$/.test(evento.fecha || "")
    ? new Date(`${evento.fecha}T12:00:00`).toLocaleDateString("es-EC", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : evento.fecha;

  return (
    <article className="event-card">
      <div className="event-card-top">
        <span className="category-tag">{evento.categoria}</span>
        <span className="event-number">
          #{String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h2>{evento.organizador}</h2>
      <p className="event-description">{evento.descripcion}</p>
      {evento.email && (
        <p className="event-contact">
          Contacto: <a href={`mailto:${evento.email}`}>{evento.email}</a>
        </p>
      )}
      <div className="event-bottom">
        <span aria-hidden="true">▦</span>
        <span>{fecha}</span>
      </div>
    </article>
  );
}
