import React from "react";
import { Link } from "react-router-dom";
import { FiFrown } from "react-icons/fi";

const NotFound: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <FiFrown style={{ fontSize: "5rem", color: "var(--color-danger)" }} />
        <h1 style={{ fontSize: "3rem", margin: "1rem 0", color: "var(--color-text)" }}>
          404
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-light)", marginBottom: "1.5rem" }}>
          ¡Oops! La página que buscas no existe.
        </p>
        <Link to="/dashboard" className="btn" style={{ textDecoration: "none" }}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
