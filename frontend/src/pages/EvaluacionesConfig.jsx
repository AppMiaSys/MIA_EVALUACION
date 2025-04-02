import React, { useEffect, useState } from "react";
import {
  getEvaluaciones,
  addEvaluacion,
  getEmpleados,
  getPreguntas,
  guardarEvaluadosPorEvaluacion,
  getAsignaciones,
} from "../services/api";

const EvaluacionesConfig = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [nueva, setNueva] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [preguntasSeleccionadas, setPreguntasSeleccionadas] = useState([]);

  useEffect(() => {
    cargarEvaluaciones();
    cargarEmpleados();
    cargarPreguntas();
  }, []);

  const cargarEvaluaciones = async () => {
    const res = await getEvaluaciones();
    setEvaluaciones(res.data);
  };

  const cargarEmpleados = async () => {
    const res = await getEmpleados();
    const empleadosConAsignaciones = await Promise.all(
      res.data.map(async (emp) => {
        const asignaciones = await getAsignaciones(emp.dni);
        return { ...emp, asignaciones: asignaciones.data };
      })
    );
    setEmpleados(empleadosConAsignaciones);
  };

  const cargarPreguntas = async () => {
    const res = await getPreguntas();
    setPreguntas(res.data);
  };

 const handleCrearEvaluacion = async () => {
  if (!nueva.trim()) return;

  try {
    const res = await addEvaluacion({
      nombre: nueva,
      participantes: seleccionados,
      preguntas: preguntasSeleccionadas,
    });

    await cargarEvaluaciones();
    alert("Evaluación creada correctamente");
    setNueva("");
    setSeleccionados([]);
    setPreguntasSeleccionadas([]);
  } catch (error) {
    console.error("❌ Error al crear evaluación:", error);
    alert("Error al crear evaluación");
  }
};

  const toggleSeleccion = (dni) => {
    if (seleccionados.includes(dni)) {
      setSeleccionados(seleccionados.filter((e) => e !== dni));
    } else {
      setSeleccionados([...seleccionados, dni]);
    }
  };

  const togglePregunta = (id) => {
    if (preguntasSeleccionadas.includes(id)) {
      setPreguntasSeleccionadas(preguntasSeleccionadas.filter((p) => p !== id));
    } else {
      setPreguntasSeleccionadas([...preguntasSeleccionadas, id]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-mia">Configuración de Evaluaciones</h1>

      <div className="bg-white p-4 rounded shadow space-y-4">
        <input
          type="text"
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          placeholder="Nombre de la evaluación"
          className="border p-2 rounded w-full"
        />

        <h2 className="text-lg font-semibold">Seleccionar Participantes</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {empleados.map((e) => (
            <label key={e.dni} className="flex items-center gap-2 border p-2 rounded">
              <input
                type="checkbox"
                checked={seleccionados.includes(e.dni)}
                onChange={() => toggleSeleccion(e.dni)}
              />
              <div>
                <div className="font-medium">{e.nombre}</div>
                <div className="text-sm text-gray-500">
                  Evalúa a: {e.asignaciones.join(", ") || "—"}
                </div>
              </div>
            </label>
          ))}
        </div>

        <h2 className="text-lg font-semibold">Seleccionar Preguntas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {preguntas.map((p) => (
            <label key={p.id} className="flex items-center gap-2 border p-2 rounded">
              <input
                type="checkbox"
                checked={preguntasSeleccionadas.includes(p.id)}
                onChange={() => togglePregunta(p.id)}
              />
              <div>
                <div>{p.texto}</div>
                <div className="text-xs text-gray-500">Categoría: {p.categoria_id}</div>
              </div>
            </label>
          ))}
        </div>

        <button
          onClick={handleCrearEvaluacion}
          className="bg-mia text-white px-6 py-2 rounded"
        >
          Crear Evaluación
        </button>
      </div>

      <div>
        <h2 className="text-lg font-bold mt-6 mb-2">Evaluaciones Existentes</h2>
        <ul className="bg-white rounded shadow divide-y">
          {evaluaciones.map((ev) => (
            <li key={ev.id} className="p-2">
              {ev.nombre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EvaluacionesConfig;
