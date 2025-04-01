// ✅ src/pages/Asignaciones.jsx

import React, { useEffect, useState } from "react";
import { getEmpleados, getAsignaciones, postAsignaciones } from "../services/api";
import { useTranslation } from "react-i18next";

const Asignaciones = () => {
  const { t } = useTranslation();
  const [empleados, setEmpleados] = useState([]);
  const [evaluador, setEvaluador] = useState("");
  const [asignados, setAsignados] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await getEmpleados();
    setEmpleados(res.data);
  };

  const cargarAsignados = async (dni) => {
    setEvaluador(dni);
    const res = await getAsignaciones(dni);
    setAsignados(res.data);
  };

  const toggleAsignado = (dni) => {
    setAsignados((prev) =>
      prev.includes(dni) ? prev.filter((d) => d !== dni) : [...prev, dni]
    );
  };

  const guardar = async () => {
    if (!evaluador) return;
    await postAsignaciones({ evaluador, evaluados: asignados });
    alert(t("Asignaciones guardadas"));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-mia">{t("Asignación de Evaluaciones")}</h1>

      <select
        value={evaluador}
        onChange={(e) => cargarAsignados(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">{t("Selecciona evaluador")}</option>
        {empleados.map((e) => (
          <option key={e.dni} value={e.dni}>
            {e.nombre} ({e.dni})
          </option>
        ))}
      </select>

      {evaluador && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {empleados.map((e) => (
              <label key={e.dni} className="border p-2 rounded flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={asignados.includes(e.dni)}
                  onChange={() => toggleAsignado(e.dni)}
                />
                {e.nombre} ({e.dni})
              </label>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={guardar} className="bg-mia text-white px-4 py-2 rounded mt-4">
              {t("Guardar asignaciones")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Asignaciones;
