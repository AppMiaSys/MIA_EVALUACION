// ✅ src/pages/Preguntas.jsx

import React, { useEffect, useState } from "react";
import { getPreguntas, getCategorias, addPregunta, updatePregunta } from "../services/api";
import { useTranslation } from "react-i18next";

const Preguntas = () => {
  const { t } = useTranslation();
  const [preguntas, setPreguntas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nuevaPregunta, setNuevaPregunta] = useState({ texto: "", categoria_id: "" });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const resPreg = await getPreguntas();
    const resCat = await getCategorias();
    setPreguntas(Array.isArray(resPreg.data) ? resPreg.data : []);
    setCategorias(Array.isArray(resCat.data) ? resCat.data : []);
  };

  const handleAdd = async () => {
    if (!nuevaPregunta.texto || !nuevaPregunta.categoria_id) return;
    await addPregunta(nuevaPregunta);
    setNuevaPregunta({ texto: "", categoria_id: "" });
    cargarDatos();
  };

  const handleUpdate = async () => {
    await updatePregunta(editando);
    setEditando(null);
    cargarDatos();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-mia">{t("Preguntas de Evaluación")}</h1>

      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder={t("Texto de la pregunta")}
          value={nuevaPregunta.texto}
          onChange={(e) => setNuevaPregunta({ ...nuevaPregunta, texto: e.target.value })}
          className="border p-1 rounded w-full md:w-auto flex-1"
        />
        <select
          value={nuevaPregunta.categoria_id}
          onChange={(e) => setNuevaPregunta({ ...nuevaPregunta, categoria_id: e.target.value })}
          className="border p-1 rounded"
        >
          <option value="">{t("Seleccionar categoría")}</option>
          {Array.isArray(categorias) &&
            categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
        </select>
        <button onClick={handleAdd} className="bg-mia text-white px-4 rounded">
          {t("Agregar")}
        </button>
      </div>

      <ul className="bg-white rounded shadow divide-y">
        {preguntas.map((p) => (
          <li key={p.id} className="p-3 flex justify-between items-start">
            <div>
              <strong>{p.texto}</strong><br />
              <span className="text-xs text-gray-500">{t("Categoría")}: {p.categoria}</span>
            </div>
            <button
              onClick={() => setEditando(p)}
              className="text-blue-600 hover:underline"
            >
              {t("Editar")}
            </button>
          </li>
        ))}
      </ul>

      {editando && (
        <div className="p-3 border rounded bg-yellow-50">
          <h3 className="font-medium mb-2">{t("Editar Pregunta")}</h3>
          <input
            type="text"
            value={editando.texto}
            onChange={(e) => setEditando({ ...editando, texto: e.target.value })}
            className="border p-1 m-1 rounded w-full"
          />
          <select
            value={editando.categoria_id}
            onChange={(e) => setEditando({ ...editando, categoria_id: e.target.value })}
            className="border p-1 m-1 rounded"
          >
            {Array.isArray(categorias) &&
              categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
          </select>
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

export default Preguntas;
