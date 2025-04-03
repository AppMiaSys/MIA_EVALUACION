import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConfiguracionEvaluaciones = () => {
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [empleados, setEmpleados] = useState([]);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [evaluacionId, setEvaluacionId] = useState(null);
  const [seleccionados, setSeleccionados] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [modoEditar, setModoEditar] = useState(false);
  const [evaluacionSeleccionada, setEvaluacionSeleccionada] = useState(null);

  useEffect(() => {
    cargarEmpleados();
    cargarEvaluaciones();
  }, []);

  const cargarEmpleados = async () => {
    const res = await axios.get('/api/empleados');
    setEmpleados(res.data);
  };

  const cargarEvaluaciones = async () => {
    const res = await axios.get('/api/evaluaciones');
    setEvaluaciones(res.data);
  };

  const crearEvaluacion = async () => {
    const res = await axios.post('/api/evaluaciones/nueva', {
      nombre,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      participantes: seleccionados,
      preguntas: [] // Si deseas incluir preguntas asociadas, ajusta aquí.
    });
    if (res.data.status === 'ok') {
      setEvaluacionId(res.data.evaluacion_id);
      setMensaje('✅ Evaluación creada exitosamente.');
      cargarEvaluaciones();
    }
  };

  const editarEvaluacion = async () => {
    await axios.put(`/api/evaluaciones/${evaluacionSeleccionada.id}`, {
      nombre,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      participantes: seleccionados,
      preguntas: []
    });
    setMensaje('✏️ Evaluación actualizada correctamente.');
    cargarEvaluaciones();
  };

  const eliminarEvaluacion = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esta evaluación?");
    if (!confirmacion) return;

    try {
      await axios.delete(`/api/evaluaciones/${id}`);
      setMensaje('🗑️ Evaluación eliminada correctamente.');
      cargarEvaluaciones();
      resetForm();
    } catch (err) {
      setMensaje("❌ Error al eliminar la evaluación.");
    }
  };

  const guardar = async () => {
    if (!nombre.trim()) {
      setMensaje("❌ El nombre es obligatorio.");
      return;
    }

    try {
      if (modoEditar && evaluacionSeleccionada) {
        await editarEvaluacion();
      } else {
        await crearEvaluacion();
      }
      resetForm();
    } catch (error) {
      console.error("❌ Error al guardar:", error);
      setMensaje("❌ Error al guardar la evaluación.");
    }
  };

  const toggleSeleccionado = (dni) => {
    setSeleccionados(prev =>
      prev.includes(dni) ? prev.filter(d => d !== dni) : [...prev, dni]
    );
  };

  const resetForm = () => {
    setNombre('');
    setFechaInicio('');
    setFechaFin('');
    setSeleccionados([]);
    setEvaluacionSeleccionada(null);
    setModoEditar(false);
    setEvaluacionId(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Configuración de Evaluaciones</h1>

      <div className="mb-4">
        <input type="text" placeholder="Nombre evaluación" value={nombre} onChange={e => setNombre(e.target.value)} className="border p-2 mr-2" />
        <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} className="border p-2 mr-2" />
        <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} className="border p-2 mr-2" />
        <button onClick={guardar} className="bg-blue-500 text-white px-4 py-2 rounded">
          {modoEditar ? "Actualizar" : "Crear"}
        </button>
      </div>

      {evaluaciones.length > 0 && (
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Evaluaciones existentes</h2>
          <ul className="space-y-2">
            {evaluaciones.map(evaluacion => (
              <li key={evaluacion.id} className="bg-gray-100 p-3 rounded flex justify-between items-center">
                <div>
                  <span className="font-medium">{evaluacion.nombre}</span>
                  {eval.fecha_inicio && <span className="ml-2 text-sm text-gray-600">({eval.fecha_inicio} - {eval.fecha_fin})</span>}
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-yellow-400 px-2 py-1 text-sm rounded"
                    onClick={() => {
                      setModoEditar(true);
                      setEvaluacionSeleccionada(eval);
                      setNombre(eval.nombre);
                      setFechaInicio(eval.fecha_inicio || '');
                      setFechaFin(eval.fecha_fin || '');
                      setEvaluacionId(eval.id);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 text-sm rounded"
                    onClick={() => eliminarEvaluacion(eval.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {evaluacionId && (
        <div>
          <h2 className="text-lg font-semibold">Seleccionar Participantes</h2>
          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border p-2">
            {empleados.map(emp => (
              <label key={emp.dni} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={seleccionados.includes(emp.dni)}
                  onChange={() => toggleSeleccionado(emp.dni)}
                />
                <span>{emp.nombre} ({emp.dni})</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {mensaje && <div className="mt-4 text-blue-700 font-medium">{mensaje}</div>}
    </div>
  );
};

export default ConfiguracionEvaluaciones;
