import React, { useEffect, useState } from "react";
import {
  getPreguntas,
  addPregunta,
  updatePregunta
} from "../services/api";
import { useTranslation } from "react-i18next";

const Preguntas = ({ categorias }) => {
  const { t } = useTranslation();
  const [preguntas, setPreguntas] = useState([]);
  const [nuevaPregunta, setNuevaPregunta] = useState({ texto: "", categoria_id: "" });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarPreguntas();
  }, []);

  const cargarPreguntas = async () => {
    const res = await getPreguntas();
    setPreguntas(res.data || []);
  };

  const handleAdd = async () => {
    if (!nuevaPregunta.texto || !nuevaPregunta.categoria_id) return;
    await addPregunta(nuevaPregunta);
    setNuevaPregunta({ texto: "", categoria_id: "" });
    cargarPreguntas();
  };

  const handleUpdate = async () => {
    await updatePregunta(editando);
    setEditando(null);
    cargarPreguntas();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder={t("Texto de la pregunta")}
          value={nuevaPregunta.texto}
          onChange={(e) =>
            setNuevaPregunta({ ...nuevaPregunta, texto: e.target.value })
          }
          className="border p-1 rounded w-full md:w-auto flex-1"
        />
        <select
          value={nuevaPregunta.categoria_id}
          onChange={(e) =>
            setNuevaPregunta({ ...nuevaPregunta, categoria_id: e.target.value })
          }
          className="border p-1 rounded"
        >
          <option value="">{t("Seleccionar categoría")}</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        <button onClick={handleAdd} className="bg-mia text-white px-3 rounded">
          {t("Agregar")}
        </button>
      </div>

      <ul className="bg-white p-3 rounded shadow divide-y">
        {preguntas.map((p) => (
          <li key={p.id} className="py-2 flex justify-between items-start">
            <div>
              <strong>{p.texto}</strong><br />
              <span className="text-xs text-gray-600">{t("Categoría")}: {p.categoria}</span>
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
            onChange={(e) =>
              setEditando({ ...editando, texto: e.target.value })
            }
            className="border p-1 m-1 rounded w-full"
          />
          <select
            value={editando.categoria_id}
            onChange={(e) =>
              setEditando({ ...editando, categoria_id: e.target.value })
            }
            className="border p-1 m-1 rounded"
          >
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
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

export default Preguntas;
