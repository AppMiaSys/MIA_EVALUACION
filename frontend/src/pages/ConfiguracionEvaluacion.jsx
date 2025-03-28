import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConfiguracionEvaluaciones = () => {
  const [nombre, setNombre] = useState('');
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');
  const [empleados, setEmpleados] = useState([]);
  const [evaluacionId, setEvaluacionId] = useState(null);
  const [seleccionados, setSeleccionados] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    axios.get('/api/empleados').then(res => setEmpleados(res.data));
  }, []);

  const crearEvaluacion = async () => {
    try {
      const res = await axios.post('/api/evaluaciones', {
        nombre,
        fecha_inicio: inicio,
        fecha_fin: fin
      });
      if (res.data.status === 'ok') {
        const lista = await axios.get('/api/evaluaciones');
        const ultima = lista.data[lista.data.length - 1];
        setEvaluacionId(ultima.id);
        setMensaje('Evaluación creada. Ahora seleccione los participantes.');
      }
    } catch (err) {
      setMensaje('Error al crear evaluación.');
    }
  };

  const guardarParticipantes = async () => {
    if (!evaluacionId) return;
    try {
      await axios.post('/api/evaluaciones/participantes', {
        evaluacion_id: evaluacionId,
        empleados: seleccionados
      });
      setMensaje('Participantes asignados correctamente.');
    } catch (err) {
      setMensaje('Error al asignar participantes.');
    }
  };

  const toggleSeleccionado = (dni) => {
    setSeleccionados(prev =>
      prev.includes(dni) ? prev.filter(d => d !== dni) : [...prev, dni]
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Configuración de Evaluaciones</h1>

      <div className="mb-4">
        <input type="text" placeholder="Nombre evaluación" value={nombre} onChange={e => setNombre(e.target.value)} className="border p-2 mr-2" />
        <input type="date" value={inicio} onChange={e => setInicio(e.target.value)} className="border p-2 mr-2" />
        <input type="date" value={fin} onChange={e => setFin(e.target.value)} className="border p-2 mr-2" />
        <button onClick={crearEvaluacion} className="bg-blue-500 text-white px-4 py-2 rounded">Crear</button>
      </div>

      {evaluacionId && (
        <div>
          <h2 className="text-lg font-semibold">Seleccionar Participantes</h2>
          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border p-2">
            {empleados.map(emp => (
              <label key={emp.dni} className="flex items-center space-x-2">
                <input type="checkbox" checked={seleccionados.includes(emp.dni)} onChange={() => toggleSeleccionado(emp.dni)} />
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
