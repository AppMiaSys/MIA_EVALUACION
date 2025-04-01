import React, { useEffect, useState } from "react";
import { getNiveles, addNivel, updateNivel } from "../services/api";
import { useTranslation } from "react-i18next";

const Niveles = () => {
  const { t } = useTranslation();
  const [niveles, setNiveles] = useState([]);
  const [nuevoNivel, setNuevoNivel] = useState({ nombre: "", puntaje: "" });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarNiveles();
  }, []);

  const cargarNiveles = async () => {
    try {
      const res = await getNiveles();
      setNiveles(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error al cargar niveles:", error);
    }
  };

  const handleAdd = async () => {
    if (!nuevoNivel.nombre || !nuevoNivel.puntaje) return;
    try {
      await addNivel(nuevoNivel);
      setNuevoNivel({ nombre: "", puntaje: "" });
      cargarNiveles();
    } catch (error) {
      console.error("Error al agregar nivel:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateNivel(editando);
      setEditando(null);
      cargarNiveles();
    } catch (error) {
      console.error("Error al actualizar nivel:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-mia">{t("Niveles de Calificación")}</h1>

      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder={t("Nombre del Nivel")}
          value={nuevoNivel.nombre}
          onChange={(e) => setNuevoNivel({ ...nuevoNivel, nombre: e.target.value })}
          className="border p-1 rounded"
        />
        <input
          type="number"
          placeholder={t("Puntaje")}
          value={nuevoNivel.puntaje}
          onChange={(e) => setNuevoNivel({ ...nuevoNivel, puntaje: e.target.value })}
          className="border p-1 rounded w-24"
        />
        <button onClick={handleAdd} className="bg-mia text-white px-4 rounded">
          {t("Agregar")}
        </button>
      </div>

      <ul className="bg-white rounded shadow divide-y">
        {niveles.map((n) => (
          <li key={n.id} className="p-2 flex justify-between items-center">
            <span>
              <strong>{n.nombre}</strong> – {n.puntaje} pts
            </span>
            <button
              onClick={() => setEditando(n)}
              className="text-blue-600 hover:underline"
            >
              {t("Editar")}
            </button>
          </li>
        ))}
      </ul>

      {editando && (
        <div className="p-3 border rounded bg-yellow-50">
          <h3 className="font-medium mb-2">{t("Editar Nivel")}</h3>
          <input
            type="text"
            value={editando.nombre}
            onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
            className="border p-1 m-1 rounded"
          />
          <input
            type="number"
            value={editando.puntaje}
            onChange={(e) => setEditando({ ...editando, puntaje: e.target.value })}
            className="border p-1 m-1 rounded w-24"
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

export default Niveles;

