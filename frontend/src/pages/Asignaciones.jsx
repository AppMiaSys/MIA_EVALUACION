// ✅ src/pages/Asignaciones.jsx

import React, { useEffect, useState } from "react";
import { getEmpleados, getAsignaciones, asignarEvaluados } from "../services/api";
import { useTranslation } from "react-i18next";

const Asignaciones = () => {
  const { t } = useTranslation();
  const [empleados, setEmpleados] = useState([]);
  const [evaluador, setEvaluador] = useState(null);
  const [evaluadosSeleccionados, setEvaluadosSeleccionados] = useState([]);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const res = await getEmpleados();
    setEmpleados(Array.isArray(res.data) ? res.data : []);
  };

  const seleccionarEvaluador = async (dni) => {
    const empleado = empleados.find((e) => e.dni === dni);
    setEvaluador(empleado);
    const asignaciones = await getAsignaciones(dni);
    setEvaluadosSeleccionados(Array.isArray(asignaciones.data) ? asignaciones.data : []);
  };

  const toggleEvaluado = (dni) => {
    if (evaluadosSeleccionados.includes(dni)) {
      setEvaluadosSeleccionados(evaluadosSeleccionados.filter((d) => d !== dni));
    } else {
      setEvaluadosSeleccionados([...evaluadosSeleccionados, dni]);
    }
  };

  const guardarAsignaciones = async () => {
    if (!evaluador) return;
    await asignarEvaluados(evaluador.dni, evaluadosSeleccionados);
    alert(t("Asignaciones guardadas correctamente"));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-mia">{t("Asignaciones de Evaluadores")}</h1>

      <div className="flex flex-wrap gap-2">
        <select
          value={evaluador?.dni || ""}
          onChange={(e) => seleccionarEvaluador(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">{t("Seleccionar evaluador")}</option>
          {empleados.map((e) => (
            <option key={e.dni} value={e.dni}>
              {e.nombre} ({e.dni})
            </option>
          ))}
        </select>
      </div>

      {evaluador && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            {t("Asignar trabajadores que evaluará")}: {evaluador.nombre}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {empleados
              .filter((e) => e.dni !== evaluador.dni)
              .map((e) => (
                <label key={e.dni} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={evaluadosSeleccionados.includes(e.dni)}
                    onChange={() => toggleEvaluado(e.dni)}
                  />
                  {e.nombre} ({e.dni})
                </label>
              ))}
          </div>
          <button
            onClick={guardarAsignaciones}
            className="bg-mia text-white px-4 py-2 rounded mt-4"
          >
            {t("Guardar asignaciones")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Asignaciones;
