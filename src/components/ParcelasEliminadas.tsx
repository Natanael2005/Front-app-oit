import React, { useEffect, useState } from "react";
import axios from "axios";

interface Parcela {
  id: number;
  nombre: string;
  ubicacion: string;
  tipo_cultivo: string;
  responsable: string;
  activo: boolean;
}

const ParcelasEliminadas: React.FC = () => {
  const [parcelas, setParcelas] = useState<Parcela[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/parcelas/eliminadas")
      .then((res) => {
        setParcelas(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener parcelas eliminadas:", err);
      });
  }, []);

  return (
    <div className="pe-container">
      <h2 style={{ marginBottom: 10, marginLeft: 3 }}>Parcelas Eliminadas</h2>
      {parcelas.length === 0 ? (
        <p>No hay parcelas eliminadas.</p>
      ) : (
        <ul className="pe-list">  
          {parcelas.map((parcela) => (
            <li key={parcela.id} className="pe-card">
              <h3>{parcela.nombre}</h3>
              <p>
                <strong>Ubicación:</strong> {parcela.ubicacion}
              </p>
              <p>
                <strong>Tipo de cultivo:</strong> {parcela.tipo_cultivo}
              </p>
              <p>
                <strong>Responsable:</strong> {parcela.responsable}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParcelasEliminadas;
