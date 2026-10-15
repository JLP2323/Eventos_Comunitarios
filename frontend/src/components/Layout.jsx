import { NavLink, Link } from "react-router-dom";

const navItems = [
  { to: "/", label: "Inicio", end: true },
  { to: "/registro", label: "Registrar evento" },
  { to: "/lista", label: "Explorar eventos" },
];
export default function Layout({ children }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Link
            className="brand"
            to="/"
            aria-label="Eventos Comunitarios, ir al inicio"
          >
            <span className="brand-mark" aria-hidden="true">
              ✳
            </span>
            <span>
              Comunidad<span style={{ color: "#148565" }}>Activa</span>
            </span>
          </Link>
          <nav className="site-nav" aria-label="Navegación principal">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <span>ComunidadActiva · Eventos Comunitarios</span>
          <span>Un espacio para compartir iniciativas locales</span>
        </div>
      </footer>
    </div>
  );
}
