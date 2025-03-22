import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({
    por_categoria: [],
    por_empleado: [],
    por_sucursal: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/dashboard");
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">{t("Dashboard de Desempeño")}</h1>

      {/* Gráfico por categoría */}
      <div>
        <h2 className="text-lg font-semibold">{t("Promedio por Categoría")}</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.por_categoria}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="promedio" fill="#C10B67" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico por empleado */}
      <div>
        <h2 className="text-lg font-semibold">{t("Promedio por Empleado")}</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.por_empleado}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="evaluado_dni" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="promedio" fill="#FCE200" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico por sucursal */}
      <div>
        <h2 className="text-lg font-semibold">{t("Promedio por Sucursal")}</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.por_sucursal}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sucursal" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="promedio" fill="#C10B67" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
