// ✅ src/pages/NivelesAcceso.jsx

import React, { useEffect, useState } from "react";
import { getNivelesAcceso, addNivelAcceso, updateNivelAcceso } from "../services/api";
import { useTranslation } from "react-i18next";

const NivelesAcceso = () => {
  const { t } = useTranslation();
  const [niveles, setNiveles] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "", permisos: "" });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await getNivelesAcceso();
    setNiveles(Array.isArray(res.data) ? res.data : []);
  };

  const handleAdd = async () => {
    if (!nuevo.nombre || !nuevo.permisos) return;
    await addNivelAcceso(nuevo);
    setNuevo({ nombre: "", permisos: "" });
    cargar();
  };

  const handleUpdate = async () => {
    await updateNivelAcceso(editando);
    setEditando(null);
    cargar();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-mia">{t("Niveles de Acceso")}</h1>

      <div className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder={t("Nombre del nivel")}
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder={t("Permisos separados por coma")}
          value={nuevo.permisos}
          onChange={(e) => setNuevo({ ...nuevo, permisos: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button onClick={handleAdd} className="bg-mia text-white px-4 py-1 rounded">
          {t("Agregar")}
        </button>
      </div>

      <ul className="mt-6 bg-white rounded shadow divide-y">
        {niveles.map((n) => (
          <li key={n.id} className="p-3">
            <div className="flex justify-between">
              <div>
                <strong>{n.nombre}</strong>
                <p className="text-sm text-gray-500">{n.permisos}</p>
              </div>
              <button
                onClick={() => setEditando(n)}
                className="text-blue-600 hover:underline"
              >
                {t("Editar")}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editando && (
        <div className="mt-4 p-4 border rounded bg-yellow-50">
          <h3 className="font-semibold mb-2">{t("Editar Nivel")}</h3>
          <input
            type="text"
            value={editando.nombre}
            onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
            className="border p-1 m-1 rounded"
          />
          <input
            type="text"
            value={editando.permisos}
            onChange={(e) => setEditando({ ...editando, permisos: e.target.value })}
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

export default NivelesAcceso;
