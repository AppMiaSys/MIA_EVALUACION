// ✅ src/pages/MisEvaluaciones.jsx

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const MisEvaluaciones = () => {
  const { t } = useTranslation();
  const [vista, setVista] = useState("evaluados");

  const evaluacionesRealizadas = [
    { id: 1, nombre: "Juan Pérez", categoria: "Trabajo en equipo", nivel: "Alto", fecha: "2025-03-01" },
    { id: 2, nombre: "María Gómez", categoria: "Comunicación", nivel: "Medio", fecha: "2025-03-02" },
  ];

  const evaluacionesRecibidas = [
    { id: 1, categoria: "Liderazgo", nivel: "Alto", fecha: "2025-03-03", sucursal: "Trujillo" },
    { id: 2, categoria: "Responsabilidad", nivel: "Medio", fecha: "2025-03-04", sucursal: "Moche" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-mia">{t("Mis Evaluaciones")}</h1>

      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => setVista("evaluados")}
          className={`px-4 py-2 rounded ${vista === "evaluados" ? "bg-mia text-white" : "bg-gray-200"}`}
        >
          {t("Evaluados")}
        </button>
        <button
          onClick={() => setVista("recibidas")}
          className={`px-4 py-2 rounded ${vista === "recibidas" ? "bg-mia text-white" : "bg-gray-200"}`}
        >
          {t("Me evaluaron")}
        </button>
      </div>

      {vista === "evaluados" ? (
        <ul className="mt-6 space-y-2">
          {evaluacionesRealizadas.map((e) => (
            <li key={e.id} className="bg-white p-4 rounded shadow">
              <p><strong>{e.nombre}</strong> – {e.categoria} – {e.nivel} – {e.fecha}</p>
              <a href="#" className="text-blue-600 text-sm hover:underline">{t("Ver evaluación")}</a>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-6 space-y-2">
          {evaluacionesRecibidas.map((e) => (
            <li key={e.id} className="bg-white p-4 rounded shadow">
              <p>{e.categoria} – {e.nivel} – {e.fecha} – {t("Sucursal")}: {e.sucursal}</p>
              <a href="#" className="text-blue-600 text-sm hover:underline">{t("Ver detalle")}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisEvaluaciones;
