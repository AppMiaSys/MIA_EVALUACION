import React, { useEffect, useState } from "react";
import { getEmpleados, getResultadosPorEmpleado } from "../services/api";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const [empleados, setEmpleados] = useState([]);
  const [resultados, setResultados] = useState({});
  const [dniSeleccionado, setDniSeleccionado] = useState("");

  useEffect(() => {
    const cargar = async () => {
      const res = await getEmpleados();
      setEmpleados(res.data || []);
    };
    cargar();
  }, []);

  const verResultados = async (dni) => {
    const res = await getResultadosPorEmpleado(dni);
    setResultados({ ...resultados, [dni]: res.data });
    setDniSeleccionado(dni);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 font-inter space-y-6">
      <h1 className="text-2xl font-bold text-mia">{t("Dashboard")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {empleados.map((e) => (
          <div key={e.dni} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">{e.nombre} ({e.dni})</p>
            <p className="text-sm text-gray-500">{e.area} - {e.sucursal}</p>
            <button
              onClick={() => verResultados(e.dni)}
              className="text-mia underline mt-2 text-sm"
            >
              {t("Ver resultados")}
            </button>
            {dniSeleccionado === e.dni && resultados[e.dni] && (
              <ul className="text-xs mt-2 list-disc list-inside text-gray-700">
                {resultados[e.dni].map((r, idx) => (
                  <li key={idx}>
                    {r.fecha} - {r.categoria}: {r.nivel}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
