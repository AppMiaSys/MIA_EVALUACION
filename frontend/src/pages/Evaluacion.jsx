import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Evaluacion = () => {
  const { t } = useTranslation();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [empleados, setEmpleados] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [evaluadoDni, setEvaluadoDni] = useState("");
  const [respuestas, setRespuestas] = useState({});
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resEmp, resPreg, resNiv] = await Promise.all([
          axios.get("/api/empleados"),
          axios.get("/api/preguntas"),
          axios.get("/api/niveles")
        ]);

        setEmpleados(
          Array.isArray(resEmp.data)
            ? resEmp.data.filter((e) => e.dni !== usuario.dni)
            : []
        );
        setPreguntas(Array.isArray(resPreg.data) ? resPreg.data : []);
        setNiveles(Array.isArray(resNiv.data) ? resNiv.data : []);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };

    cargarDatos();
  }, [usuario.dni]);

  const enviarEvaluacion = async () => {
    if (!evaluadoDni || Object.keys(respuestas).length === 0) return;

    const fecha = new Date().toISOString().split("T")[0];

    try {
      const envios = preguntas.map((pregunta) => {
        return axios.post("/api/evaluaciones", {
          evaluador_dni: usuario.dni,
          evaluado_dni: evaluadoDni,
          categoria: pregunta.categoria,
          nivel: respuestas[pregunta.id],
          comentario,
          fecha
        });
      });

      await Promise.all(envios);
      setMensaje(t("¡Evaluación enviada exitosamente!"));
      setRespuestas({});
      setEvaluadoDni("");
      setComentario("");
    } catch (err) {
      console.error("Error al enviar evaluación:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-inter">
      <h1 className="text-2xl font-bold text-mia">{t("Realizar Evaluación")}</h1>

      {/* Selección de colaborador */}
      <div>
        <label className="block font-semibold mb-1">{t("Selecciona al colaborador a evaluar")}</label>
        <select
          className="w-full border p-2 rounded"
          value={evaluadoDni}
          onChange={(e) => setEvaluadoDni(e.target.value)}
        >
          <option value="">{t("Seleccione un colaborador")}</option>
          {empleados.map((e) => (
            <option key={e.dni} value={e.dni}>
              {e.nombre} ({e.sucursal})
            </option>
          ))}
        </select>
      </div>

      {/* Preguntas */}
      <div className="space-y-4">
        {preguntas.map((pregunta) => (
          <div key={pregunta.id} className="bg-white p-4 shadow rounded">
            <p className="font-medium">{pregunta.texto}</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {niveles.map((nivel) => (
                <label key={nivel.id} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={`pregunta-${pregunta.id}`}
                    value={nivel.nivel}
                    checked={respuestas[pregunta.id] === nivel.nivel}
                    onChange={() =>
                      setRespuestas({ ...respuestas, [pregunta.id]: nivel.nivel })
                    }
                  />
                  {nivel.nivel}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Comentario final */}
      <textarea
        placeholder={t("Comentario final (opcional)")}
        className="w-full p-2 border rounded"
        rows={3}
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />

      <button
        onClick={enviarEvaluacion}
        className="bg-mia text-white px-6 py-2 rounded hover:opacity-90"
      >
        {t("Enviar Evaluación")}
      </button>

      {mensaje && <p className="text-green-600 font-semibold mt-2">{mensaje}</p>}
    </div>
  );
};

export default Evaluacion;
