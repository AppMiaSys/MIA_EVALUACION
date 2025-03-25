// ✅ src/pages/Empleados.jsx

import React, { useEffect, useState } from "react";
import {
  getEmpleados,
  addEmpleado,
  updateEmpleado,
  getResultadosPorEmpleado
} from "../services/api";
import { useTranslation } from "react-i18next";

const Empleados = () => {
  const { t } = useTranslation();
  const [empleados, setEmpleados] = useState([]);
  const [nuevo, setNuevo] = useState({ dni: "", nombre: "", sucursal: "", area: "" });
  const [editando, setEditando] = useState(null);
  const [resultados, setResultados] = useState({});

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const res = await getEmpleados();
    setEmpleados(Array.isArray(res.data) ? res.data : []);
  };

  const handleAdd = async () => {
    if (!nuevo.dni || !nuevo.nombre) return;
    await addEmpleado(nuevo);
    setNuevo({ dni: "", nombre: "", sucursal: "", area: "" });
    cargarEmpleados();
  };

  const handleUpdate = async () => {
    await updateEmpleado(editando);
    setEditando(null);
    cargarEmpleados();
  };

  const verResultados = async (dni) => {
    const res = await getResultadosPorEmpleado(dni);
    setResultados({ ...resultados, [dni]: res.data });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-mia">{t("Empleados")}</h1>

      <div className="flex flex-wrap gap-2">
        <input
          placeholder="DNI"
          value={nuevo.dni}
          onChange={(e) => setNuevo({ ...nuevo, dni: e.target.value })}
          className="border p-1 rounded"
        />
        <input
          placeholder={t("Nombre")}
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
          className="border p-1 rounded"
        />
        <input
          placeholder={t("Sucursal")}
          value={nuevo.sucursal}
          onChange={(e) => setNuevo({ ...nuevo, sucursal: e.target.value })}
          className="border p-1 rounded"
        />
        <input
          placeholder={t("Área")}
          value={nuevo.area}
          onChange={(e) => setNuevo({ ...nuevo, area: e.target.value })}
          className="border p-1 rounded"
        />
        <button onClick={handleAdd} className="bg-mia text-white px-4 py-1 rounded">
          {t("Agregar")}
        </button>
      </div>

      <ul className="bg-white rounded shadow divide-y">
        {empleados.map((emp) => (
          <li key={emp.dni} className="p-3 flex justify-between items-start">
            <div>
              <strong>{emp.nombre}</strong> ({emp.dni})<br />
              {emp.area} – {emp.sucursal}
              {resultados[emp.dni] && (
                <div className="mt-1 text-xs text-gray-700">
                  <strong>{t("Resultados")}:</strong>
                  <ul className="list-disc list-inside">
                    {resultados[emp.dni].map((r, idx) => (
                      <li key={idx}>{r.fecha} – {r.categoria}: {r.nivel}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditando(emp)}
                className="text-blue-600 hover:underline"
              >
                {t("Editar")}
              </button>
              <button
                onClick={() => verResultados(emp.dni)}
                className="text-green-600 hover:underline"
              >
                {t("Ver resultados")}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editando && (
        <div className="mt-4 p-4 border rounded bg-yellow-50">
          <h3 className="font-semibold mb-2">{t("Editar Empleado")}</h3>
          <input
            type="text"
            value={editando.nombre}
            onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
            className="border p-1 m-1 rounded"
          />
          <input
            type="text"
            value={editando.sucursal}
            onChange={(e) => setEditando({ ...editando, sucursal: e.target.value })}
            className="border p-1 m-1 rounded"
          />
          <input
            type="text"
            value={editando.area}
            onChange={(e) => setEditando({ ...editando, area: e.target.value })}
            className="border p-1 m-1 rounded"
          />
          <button
            onClick={handleUpdate}
            className="bg-mia text-white px-4 py-1 rounded ml-2"
          >
            {t("Guardar cambios")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Empleados;
