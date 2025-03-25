import React from "react";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-mia">{t("Bienvenido(a)")}, {usuario?.nombre || "Usuario"}</h1>
      <p className="text-gray-600">{t("Aquí puedes gestionar todas las evaluaciones y configuraciones del sistema Mia")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg">{t("Empleados evaluados")}</h2>
          <p className="text-sm text-gray-500">{t("Visualiza los resultados por colaborador")}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg">{t("Estadísticas por categoría")}</h2>
          <p className="text-sm text-gray-500">{t("Explora los resultados por tipo de competencia")}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg">{t("Puntaje promedio mensual")}</h2>
          <p className="text-sm text-gray-500">{t("Consulta el rendimiento mensual por área o sucursal")}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg">{t("Niveles de desempeño")}</h2>
          <p className="text-sm text-gray-500">{t("Configura y visualiza los niveles de evaluación")}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
