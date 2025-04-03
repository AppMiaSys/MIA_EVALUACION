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
      fecha_fin: fechaFin
    });
    if (res.data.status === 'ok') {
      const lista = await axios.get('/api/evaluaciones');
      const ultima = lista.data[lista.data.length - 1];
      setEvaluacionId(ultima.id);
      setMensaje('Evaluación creada. Ahora seleccione los participantes.');
      cargarEvaluaciones();
    }
  };

  const editarEvaluacion = async () => {
    await axios.put(`/api/evaluaciones/${evaluacionSeleccionada.id}`, {
      nombre,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin
    });
    setMensaje('Evaluación actualizada correctamente.');
    cargarEvaluaciones();
  };

  const guardarParticipantes = async () => {
    if (!evaluacionId) return;
    try {
      await axios.post(`/api/evaluaciones/${evaluacionId}/evaluados`, {
        empleados: seleccionados
      });
      setMensaje('Participantes asignados correctamente.');
    } catch (err) {
      setMensaje('Error al asignar participantes.');
    }
  };

  const guardar = async () => {
    try {
      if (modoEditar && evaluacionSeleccionada) {
        await editarEvaluacion();
      } else {
        await crearEvaluacion();
      }
      resetForm();
    } catch (error) {
      console.error("❌ Error al guardar:", error);
      setMensaje("Error al guardar la evaluación.");
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
          <h2 className="font-semibold">Evaluaciones existentes</h2>
          <ul className="list-disc ml-6">
            {evaluaciones.map(eval => (
              <li key={eval.id} className="mb-1">
                <span className="font-medium">{eval.nombre}</span>
                <button
                  className="ml-4 text-sm bg-yellow-400 px-2 py-1 rounded"
                  onClick={() => {
                    setModoEditar(true);
                    setEvaluacionSeleccionada(eval);
                    setNombre(eval.nombre);
                    setFechaInicio(eval.fecha_inicio);
                    setFechaFin(eval.fecha_fin);
                    setEvaluacionId(eval.id);
                  }}
                >
                  Editar
                </button>
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
          <button onClick={guardarParticipantes} className="mt-3 bg-green-600 text-white px-4 py-2 rounded">Guardar Participantes</button>
        </div>
      )}

      {mensaje && <div className="mt-4 text-blue-700 font-medium">{mensaje}</div>}
    </div>
  );
};

export default ConfiguracionEvaluaciones;
