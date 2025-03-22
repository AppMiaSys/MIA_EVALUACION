import React, { useEffect, useState } from "react";
import {
  getNiveles,
  addNivel,
  updateNivel
} from "../services/api";
import { useTranslation } from "react-i18next";

const Niveles = () => {
  const { t } = useTranslation();
  const [niveles, setNiveles] = useState([]);
  const [nuevoNivel, setNuevoNivel] = useState({ nivel: "", puntos: "" });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarNiveles();
  }, []);

  const cargarNiveles = async () => {
    const res = await getNiveles();
    setNiveles(Array.isArray(res.data) ? res.data : []);
  };

  const handleAdd = async () => {
    if (!nuevoNivel.nivel || !nuevoNivel.puntos) return;
    await addNivel(nuevoNivel);
    setNuevoNivel({ nivel: "", puntos: "" });
    cargarNiveles();
  };

  const handleUpdate = async () => {
    await updateNivel(editando);
    setEditando(null);
    cargarNiveles();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder={t("Nivel")}
          value={nuevoNivel.nivel}
          onChange={(e) => setNuevoNivel({ ...nuevoNivel, nivel: e.target.value })}
          className="border p-1 rounded"
        />
        <input
          type="number"
          placeholder={t("Puntos")}
          value={nuevoNivel.puntos}
          onChange={(e) => setNuevoNivel({ ...nuevoNivel, puntos: e.target.value })}
          className="border p-1 rounded w-24"
        />
        <button onClick={handleAdd} className="bg-mia text-white px-3 rounded">
          {t("Agregar")}
        </button>
      </div>

      <ul className="bg-white rounded shadow divide-y">
        {Array.isArray(niveles) &&
          niveles.map((nivel) => (
            <li key={nivel.id} className="p-2 flex justify-between items-center">
              <span>
                <strong>{nivel.nivel}</strong> – {nivel.puntos} pts
              </span>
              <button
                onClick={() => setEditando(nivel)}
                className="text-blue-600 hover:underline"
              >
                {t("Editar")}
              </button>
            </li>
          ))}
      </ul>

      {editando && (
        <div className="p-3 border rounded bg-yellow-50 mt-3">
          <h3 className="font-medium mb-2">{t("Editar Nivel")}</h3>
          <input
            type="text"
            value={editando.nivel}
            onChange={(e) => setEditando({ ...editando, nivel: e.target.value })}
            className="border p-1 m-1 rounded"
          />
          <input
            type="number"
            value={editando.puntos}
            onChange={(e) => setEditando({ ...editando, puntos: e.target.value })}
            className="border p-1 m-1 rounded w-24"
          />
          <button
            onClick={handleUpdate}
            className="bg-mia text-white px-3 py-1 rounded ml-2"
          >
            {t("Guardar cambios")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Niveles;
