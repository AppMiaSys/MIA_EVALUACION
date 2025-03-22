import React, { useEffect, useState } from "react";
import {
  getPreguntas,
  getNiveles,
  getAsignaciones,
  getEmpleados,
  enviarEvaluacion
} from "../services/api";
import { useTranslation } from "react-i18next";

const Evaluacion = () => {
  const { t } = useTranslation();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [evaluados, setEvaluados] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [evaluadoDni, setEvaluadoDni] = useState("");
  const [respuestas, setRespuestas] = useState({});
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      const asignados = await getAsignaciones(usuario.dni);
      const empleados = await getEmpleados();
      const filtrados = empleados.data.filter((e) =>
        asignados.data.includes(e.dni)
      );
      setEvaluados(filtrados);

      const resPreg = await getPreguntas();
      const resNiv = await getNiveles();
      setPreguntas(resPreg.data || []);
      setNiveles(resNiv.data || []);
    };
    cargarDatos();
  }, [usuario.dni]);

  const handleEnviar = async () => {
    if (!evaluadoDni || Object.keys(respuestas).length === 0) return;
    const fecha = new Date().toISOString().split("T")[0];

    for (let pregunta of preguntas) {
      await enviarEvaluacion({
        evaluador_dni: usuario.dni,
        evaluado_dni: evaluadoDni,
        categoria: pregunta.categoria,
        nivel: respuestas[pregunta.id],
        comentario,
        fecha
      });
    }

    setEvaluadoDni("");
    setRespuestas({});
    setComentario("");
    setMensaje(t("¡Evaluación enviada exitosamente!"));
    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4 font-inter">
      <h1 className="text-2xl font-bold text-mia">{t("Realizar Evaluación")}</h1>

      <div>
        <label className="font-semibold">{t("Colaborador a evaluar")}:</label>
        <select
          value={evaluadoDni}
          onChange={(e) => setEvaluadoDni(e.target.value)}
          className="w-full border p-2 rounded mt-1"
        >
          <option value="">{t("Seleccione un colaborador")}</option>
          {evaluados.map((e) => (
            <option key={e.dni} value={e.dni}>
              {e.nombre} ({e.dni})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {preguntas.map((p) => (
          <div key={p.id} className="bg-white rounded shadow p-4">
            <p className="font-medium">{p.texto}</p>
            <div className="flex flex-wrap gap-4 mt-2">
              {niveles.map((n) => (
                <label key={n.id} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={`pregunta-${p.id}`}
                    checked={respuestas[p.id] === n.nivel}
                    onChange={() =>
                      setRespuestas({ ...respuestas, [p.id]: n.nivel })
                    }
                  />
                  {n.nivel}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder={t("Comentario final (opcional)")}
        className="w-full border p-2 rounded"
        rows={3}
      />

      <button
        onClick={handleEnviar}
        className="bg-mia text-white px-6 py-2 rounded hover:opacity-90"
      >
        {t("Enviar Evaluación")}
      </button>

      {mensaje && <p className="text-green-600 font-semibold mt-2">{mensaje}</p>}
    </div>
  );
};

export default Evaluacion;
