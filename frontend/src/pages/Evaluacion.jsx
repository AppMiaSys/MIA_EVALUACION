import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  getAsignaciones,
  getCategoriasByEvaluacion,
  getPreguntasByEvaluacion,
  getNivelesByEvaluacion,
  getEmpleados,
  enviarEvaluacion
} from "../services/api";

const Evaluacion = () => {
  const { t } = useTranslation();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [empleados, setEmpleados] = useState([]);
  const [evaluadosAsignados, setEvaluadosAsignados] = useState([]);
  const [seleccionado, setSeleccionado] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [respuestas, setRespuestas] = useState({});

  useEffect(() => {
    const cargarDatos = async () => {
      const asignados = await getAsignaciones(usuario.dni);
      const empleadosTodos = await getEmpleados();
      setEvaluadosAsignados(asignados.data);
      setEmpleados(empleadosTodos.data);

      const categorias = await getCategoriasByEvaluacion(1);
      const preguntas = await getPreguntasByEvaluacion(1);
      const niveles = await getNivelesByEvaluacion(1);
      setCategorias(categorias.data);
      setPreguntas(preguntas.data);
      setNiveles(niveles.data);
    };
    cargarDatos();
  }, [usuario.dni]);

  const evaluadosConNombre = empleados.filter((e) =>
    evaluadosAsignados.includes(e.dni)
  );

  const handleSelectNivel = (preguntaId, nivelId) => {
    setRespuestas({ ...respuestas, [preguntaId]: nivelId });
  };

  const handleEnviar = async () => {
    for (const pregunta of preguntas) {
      await enviarEvaluacion({
        evaluador_dni: usuario.dni,
        evaluado_dni: seleccionado,
        evaluacion_id: 1,
        categoria_id: pregunta.categoria_id,
        pregunta_id: pregunta.id,
        puntuacion: respuestas[pregunta.id],
        fecha: new Date().toISOString().split("T")[0],
      });
    }
    alert(t("Evaluación registrada correctamente"));
    setSeleccionado("");
    setRespuestas({});
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-mia text-center sm:text-left">
        {t("Realizar Evaluación")}
      </h1>

      <select
        value={seleccionado}
        onChange={(e) => setSeleccionado(e.target.value)}
        className="border p-2 rounded w-full sm:w-1/2"
      >
        <option value="">{t("Selecciona a quién vas a evaluar")}</option>
        {evaluadosConNombre.map((e) => (
          <option key={e.dni} value={e.dni}>
            {e.nombre} ({e.dni})
          </option>
        ))}
      </select>

      {seleccionado &&
        categorias.map((cat) => (
          <div key={cat.id} className="bg-white p-4 border rounded space-y-4">
            <h2 className="text-lg font-semibold text-mia text-center sm:text-left">
              {cat.nombre}
            </h2>
            {preguntas
              .filter((p) => p.categoria_id === cat.id)
              .map((p) => (
                <div key={p.id} className="space-y-2">
                  <p className="font-medium text-sm sm:text-base">
                    {p.texto}
                  </p>
                  <div className="grid grid-cols-2 sm:flex gap-2">
                    {niveles.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => handleSelectNivel(p.id, n.puntaje)}
                        className={`px-3 py-1 rounded border text-sm sm:text-base text-center transition duration-200 ease-in-out ${
                          respuestas[p.id] === n.puntaje
                            ? "bg-mia text-white font-bold"
                            : "bg-gray-100 hover:bg-mia/10"
                        }`}
                      >
                        {n.nombre}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ))}

      {seleccionado && preguntas.length > 0 && (
        <button
          onClick={handleEnviar}
          className="bg-mia text-white px-6 py-2 rounded mt-4 w-full sm:w-auto"
        >
          {t("Enviar evaluación")}
        </button>
      )}
    </div>
  );
};

export default Evaluacion;
