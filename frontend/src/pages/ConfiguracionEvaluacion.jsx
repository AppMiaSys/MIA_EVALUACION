import React, { useEffect, useState } from "react";
import {
  getEvaluaciones,
  addEvaluacion,
  deleteEvaluacion,
  updateEvaluacion,
} from "../services/api";

function EvaluacionesConfig() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [nuevaEvaluacion, setNuevaEvaluacion] = useState({
    nombre: "",
    fecha_inicio: "",
    fecha_fin: "",
  });

  const cargarEvaluaciones = async () => {
    try {
      const res = await getEvaluaciones();
      // 👇 Validamos que siempre sea un array
      const lista = Array.isArray(res.data) ? res.data : [];
      setEvaluaciones(lista);
    } catch (error) {
      console.error("❌ Error al cargar evaluaciones:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaEvaluacion({ ...nuevaEvaluacion, [name]: value });
  };

  const crearEvaluacion = async () => {
    try {
      await addEvaluacion(nuevaEvaluacion);
      setNuevaEvaluacion({ nombre: "", fecha_inicio: "", fecha_fin: "" });
      cargarEvaluaciones();
    } catch (error) {
      console.error("❌ Error al crear evaluación:", error);
    }
  };

  const eliminarEvaluacion = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta evaluación?")) {
      try {
        await deleteEvaluacion(id);
        cargarEvaluaciones();
      } catch (error) {
        console.error("❌ Error al eliminar evaluación:", error);
      }
    }
  };

  const editarEvaluacion = async (evalItem) => {
    const nuevoNombre = prompt("Nuevo nombre de la evaluación:", evalItem.nombre);
    if (nuevoNombre && nuevoNombre !== evalItem.nombre) {
      try {
        await updateEvaluacion(evalItem.id, { ...evalItem, nombre: nuevoNombre });
        cargarEvaluaciones();
      } catch (error) {
        console.error("❌ Error al editar evaluación:", error);
      }
    }
  };

  useEffect(() => {
    cargarEvaluaciones();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Configuración de Evaluaciones</h2>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          name="nombre"
          value={nuevaEvaluacion.nombre}
          onChange={handleChange}
          placeholder="Nombre de la evaluación"
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="fecha_inicio"
          value={nuevaEvaluacion.fecha_inicio}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="fecha_fin"
          value={nuevaEvaluacion.fecha_fin}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          onClick={crearEvaluacion}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Crear Evaluación
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Evaluaciones existentes</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Fecha inicio</th>
              <th className="border px-4 py-2">Fecha fin</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(evaluaciones) &&
              evaluaciones.map((ev) => (
                <tr key={ev.id}>
                  <td className="border px-4 py-2">{ev.id}</td>
                  <td className="border px-4 py-2">{ev.nombre}</td>
                  <td className="border px-4 py-2">{ev.fecha_inicio || "-"}</td>
                  <td className="border px-4 py-2">{ev.fecha_fin || "-"}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => editarEvaluacion(ev)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarEvaluacion(ev.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {evaluaciones.length === 0 && (
          <p className="text-gray-500 mt-2">No hay evaluaciones registradas.</p>
        )}
      </div>
    </div>
  );
}

export default EvaluacionesConfig;
