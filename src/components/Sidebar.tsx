"use client"

// Sidebar.tsx
import type React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FiHome, FiBarChart2, FiTrash2, FiLogOut, FiUser } from "react-icons/fi"
import "../styles/App.css"

const Sidebar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-iniciales">
        <FiUser />
      </div>
      <nav>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard" className={`sidebar-link ${location.pathname === "/dashboard" ? "active" : ""}`}>
              <FiHome className="sidebar-icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/graficas" className={`sidebar-link ${location.pathname === "/graficas" ? "active" : ""}`}>
              <FiBarChart2 className="sidebar-icon" />
              <span>Gráficas</span>
            </Link>
          </li>
          <li>
            <Link to="/eliminadas" className={`sidebar-link ${location.pathname === "/eliminadas" ? "active" : ""}`}>
              <FiTrash2 className="sidebar-icon" />
              <span>Eliminadas</span>
            </Link>
          </li>
          <li className="logout-container" style={{ marginTop: "0px" }}>
            <button onClick={handleLogout} className="sidebar-link logout-btn">
              <FiLogOut className="sidebar-icon" />
              <span>Cerrar sesión</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
