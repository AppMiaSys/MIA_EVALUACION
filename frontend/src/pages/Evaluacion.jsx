// ✅ src/pages/Evaluacion.jsx

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  getAsignaciones,
  getCategorias,
  getPreguntas,
  getNiveles,
  enviarEvaluacion
} from "../services/api";

const Evaluacion = () => {
  const { t } = useTranslation();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const [evaluados, setEvaluados] = useState([]);
  const [seleccionado, setSeleccionado] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [respuestas, setRespuestas] = useState({});

  useEffect(() => {
    const cargarDatos = async () => {
      const [evals, cats, pregs, nivs] = await Promise.all([
        getAsignaciones(usuario.dni),
        getCategorias(),
        getPreguntas(),
        getNiveles()
      ]);
      setEvaluados(evals.data);
      setCategorias(cats.data);
      setPreguntas(pregs.data);
      setNiveles(nivs.data);
    };
    cargarDatos();
  }, [usuario.dni]);

  const handleSelectNivel = (preguntaId, nivel) => {
    setRespuestas({ ...respuestas, [preguntaId]: nivel });
  };

  const handleEnviar = async () => {
    for (const pregunta of preguntas) {
      if (pregunta.categoria && respuestas[pregunta.id]) {
        await enviarEvaluacion({
          evaluador_dni: usuario.dni,
          evaluado_dni: seleccionado,
          categoria: pregunta.categoria,
          nivel: respuestas[pregunta.id],
          comentario: "",
          fecha: new Date().toISOString().split("T")[0],
        });
      }
    }
    alert(t("Evaluación registrada correctamente"));
    setSeleccionado("");
    setRespuestas({});
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-mia mb-4">{t("Realizar Evaluación")}</h1>

      <select
        value={seleccionado}
        onChange={(e) => setSeleccionado(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      >
        <option value="">{t("Selecciona a quién vas a evaluar")}</option>
        {evaluados.map((dni) => (
          <option key={dni} value={dni}>{dni}</option>
        ))}
      </select>

      {categorias.map((cat) => (
        <div key={cat.id} className="mb-6">
          <h2 className="text-lg font-semibold text-mia mb-2">{cat.nombre}</h2>
          {preguntas.filter((p) => p.categoria === cat.nombre).map((p) => (
            <div key={p.id} className="mb-2">
              <label className="block font-medium mb-1">{p.texto}</label>
              <select
                value={respuestas[p.id] || ""}
                onChange={(e) => handleSelectNivel(p.id, e.target.value)}
                className="border p-1 rounded w-full"
              >
                <option value="">{t("Selecciona nivel")}</option>
                {niveles.map((n) => (
                  <option key={n.id} value={n.nivel}>{n.nivel}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleEnviar}
        disabled={!seleccionado || Object.keys(respuestas).length === 0}
        className="bg-mia text-white px-6 py-2 rounded"
      >
        {t("Enviar evaluación")}
      </button>
    </div>
  );
};

export default Evaluacion;
