// ✅ src/pages/EvaluacionesConfig.jsx

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getEvaluaciones,
  addEvaluacion,
  getCategoriasByEvaluacion,
  getPreguntasByEvaluacion,
  getNivelesByEvaluacion
} from "../services/api";

const EvaluacionesConfig = () => {
  const { t } = useTranslation();
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [detalle, setDetalle] = useState({ categorias: [], preguntas: [], niveles: [] });
  const [nueva, setNueva] = useState({ nombre: "", descripcion: "" });

  const cargar = async () => {
    const res = await getEvaluaciones();
    setEvaluaciones(res.data);
  };

  const seleccionarEvaluacion = async (e) => {
    setSeleccionada(e);
    const [cat, preg, niv] = await Promise.all([
      getCategoriasByEvaluacion(e.id),
      getPreguntasByEvaluacion(e.id),
      getNivelesByEvaluacion(e.id)
    ]);
    setDetalle({ categorias: cat.data, preguntas: preg.data, niveles: niv.data });
  };

  const crearEvaluacion = async () => {
    if (!nueva.nombre) return;
    await addEvaluacion(nueva);
    setNueva({ nombre: "", descripcion: "" });
    await cargar();
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-mia">{t("Configuración de Evaluaciones")}</h1>

      <div className="p-4 border rounded bg-white space-y-3">
        <h2 className="text-lg font-semibold">{t("Crear nueva evaluación")}</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nueva.nombre}
          onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Descripción"
          value={nueva.descripcion}
          onChange={(e) => setNueva({ ...nueva, descripcion: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={crearEvaluacion}
          className="bg-mia text-white px-4 py-2 rounded"
        >
          {t("Crear evaluación")}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h2 className="font-semibold">{t("Lista de Evaluaciones")}</h2>
          <ul className="bg-white rounded border divide-y">
            {evaluaciones.map((e) => (
              <li
                key={e.id}
                className={`p-3 cursor-pointer hover:bg-gray-100 ${seleccionada?.id === e.id ? "bg-yellow-50" : ""}`}
                onClick={() => seleccionarEvaluacion(e)}
              >
                <strong>{e.nombre}</strong>
                <div className="text-sm text-gray-600">{e.descripcion}</div>
              </li>
            ))}
          </ul>
        </div>

        {seleccionada && (
          <div className="space-y-3">
            <h2 className="font-semibold">{t("Detalle de Evaluación")}: {seleccionada.nombre}</h2>
            <div>
              <h3 className="text-mia font-semibold">{t("Categorías")}</h3>
              <ul className="list-disc pl-6 text-sm">
                {detalle.categorias.map((c) => <li key={c.id}>{c.nombre}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-mia font-semibold">{t("Preguntas")}</h3>
              <ul className="list-disc pl-6 text-sm">
                {detalle.preguntas.map((p) => <li key={p.id}>{p.texto}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-mia font-semibold">{t("Niveles de Calificación")}</h3>
              <ul className="list-disc pl-6 text-sm">
                {detalle.niveles.map((n) => <li key={n.id}>{n.nivel} ({n.puntos} pts)</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluacionesConfig;
