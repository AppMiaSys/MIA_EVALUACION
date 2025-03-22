import React, { useEffect, useState } from "react";
import { getEmpleados, getResultadosPorEmpleado } from "../services/api";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const [empleados, setEmpleados] = useState([]);
  const [resultados, setResultados] = useState({});
  const [dniSeleccionado, setDniSeleccionado] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await getEmpleados();
        if (Array.isArray(res.data)) {
          setEmpleados(res.data);
        } else {
          setEmpleados([]);
        }
      } catch (err) {
        setError("Error al cargar empleados.");
        console.error(err);
      }
    };
    cargar();
  }, []);

  const verResultados = async (dni) => {
    try {
      const res = await getResultadosPorEmpleado(dni);
      if (Array.isArray(res.data)) {
        setResultados({ ...resultados, [dni]: res.data });
        setDniSeleccionado(dni);
      }
    } catch (err) {
      setError("Error al cargar resultados.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 font-inter space-y-6">
      <h1 className="text-2xl font-bold text-mia">{t("Dashboard")}</h1>

      {error && (
        <p className="text-red-600 bg-red-100 p-3 rounded">{error}</p>
      )}

      {Array.isArray(empleados) && empleados.length === 0 && !error && (
        <p className="text-gray-600">{t("No hay empleados registrados aún.")}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {empleados.map((e) => (
          <div key={e.dni} className="bg-white p-4 rounded shadow">
            <p className="font-semibold text-mia">{e.nombre} ({e.dni})</p>
            <p className="text-sm text-gray-500">{e.area} – {e.sucursal}</p>

            <button
              onClick={() => verResultados(e.dni)}
              className="text-mia underline mt-2 text-sm"
            >
              {t("Ver resultados")}
            </button>

            {dniSeleccionado === e.dni && resultados[e.dni] && (
              <ul className="text-xs mt-2 list-disc list-inside text-gray-700">
                {resultados[e.dni].length > 0 ? (
                  resultados[e.dni].map((r, idx) => (
                    <li key={idx}>
                      {r.fecha} – {r.categoria}: <strong>{r.nivel}</strong>
                    </li>
                  ))
                ) : (
                  <li>{t("Sin evaluaciones aún")}</li>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
