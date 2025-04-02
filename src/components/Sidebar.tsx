import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBarChart2, FiTrash2 } from "react-icons/fi";
import "../styles/App.css"; // si prefieres, mantén los estilos en App.css

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-iniciales">FC</div>      <nav>
        <ul className="sidebar-menu">
          <li>
            <Link
              to="/"
              className={`sidebar-link ${location.pathname === "/" ? "active" : ""}`}
            >
              <FiHome className="sidebar-icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/graficas"
              className={`sidebar-link ${location.pathname === "/graficas" ? "active" : ""}`}
            >
              <FiBarChart2 className="sidebar-icon" />
              <span>Gráficas</span>
            </Link>
          </li>
          <li>
            <Link
              to="/eliminadas"
              className={`sidebar-link ${location.pathname === "/eliminadas" ? "active" : ""}`}
            >
              <FiTrash2 className="sidebar-icon" />
              <span>Eliminadas</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
