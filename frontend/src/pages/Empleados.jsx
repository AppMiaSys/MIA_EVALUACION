// ✅ src/pages/Empleados.jsx — Actualizado

import React, { useEffect, useState, useRef } from "react";
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
  const [nuevo, setNuevo] = useState({ dni: "", nombre: "", sucursal: "", area: "", contrasena: "" });
  const [editando, setEditando] = useState(null);
  const [resultados, setResultados] = useState({});

  const refs = useRef([]);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const res = await getEmpleados();
    setEmpleados(Array.isArray(res.data) ? res.data : []);
  };

  const handleAdd = async () => {
    if (!nuevo.dni || !nuevo.nombre || !nuevo.contrasena) return;
    await addEmpleado(nuevo);
    setNuevo({ dni: "", nombre: "", sucursal: "", area: "", contrasena: "" });
    cargarEmpleados();
    refs.current[0]?.focus();
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

  const handleKeyPress = (e, index, total) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index + 1 < total) {
        refs.current[index + 1]?.focus();
      } else {
        handleAdd();
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-mia">{t("Empleados")}</h1>

      <div className="flex flex-wrap gap-2">
        {["dni", "nombre", "sucursal", "area", "contrasena"].map((field, i) => (
          <input
            key={field}
            placeholder={t(field.charAt(0).toUpperCase() + field.slice(1))}
            type={field === "contrasena" ? "password" : "text"}
            value={nuevo[field]}
            ref={(el) => (refs.current[i] = el)}
            onChange={(e) => setNuevo({ ...nuevo, [field]: e.target.value })}
            onKeyDown={(e) => handleKeyPress(e, i, 5)}
            className="border p-1 rounded w-full md:w-auto"
          />
        ))}
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
