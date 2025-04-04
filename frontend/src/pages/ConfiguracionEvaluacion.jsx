import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "https://mia-backend.onrender.com";

const ConfiguracionEvaluaciones = () => {
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [empleados, setEmpleados] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [evaluacionSeleccionada, setEvaluacionSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [modoEditar, setModoEditar] = useState(false);

  useEffect(() => {
    cargarEmpleados();
    cargarEvaluaciones();
  }, []);

  const cargarEmpleados = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/empleados`);
      setEmpleados(res.data);
    } catch (error) {
      console.error("Error cargando empleados:", error);
    }
  };

  const cargarEvaluaciones = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/evaluaciones`);
      const data = res.data;

      if (Array.isArray(data)) {
        setEvaluaciones(data);
      } else if (data && Array.isArray(data.evaluaciones)) {
        setEvaluaciones(data.evaluaciones);
      } else {
        setEvaluaciones([]);
        console.warn("Respuesta inesperada del backend:", data);
      }
    } catch (error) {
      console.error("Error cargando evaluaciones:", error);
      setEvaluaciones([]);
    }
  };

  const crearEvaluacion = async () => {
    const res = await axios.post(`${BASE_URL}/api/evaluaciones/nueva`, {
      nombre,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      participantes: seleccionados,
      preguntas: []
    });
    if (res.data.status === 'ok') {
      setMensaje('✅ Evaluación creada exitosamente.');
      cargarEvaluaciones();
    }
  };

  const editarEvaluacion = async () => {
    await axios.put(`${BASE_URL}/api/evaluaciones/${evaluacionSeleccionada.id}`, {
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
      await axios.delete(`${BASE_URL}/api/evaluaciones/${id}`);
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

  const cargarParaEditar = (evalItem) => {
    setEvaluacionSeleccionada(evalItem);
    setNombre(evalItem.nombre);
    setFechaInicio(evalItem.fecha_inicio || '');
    setFechaFin(evalItem.fecha_fin || '');
    setModoEditar(true);
  };

  const resetForm = () => {
    setNombre('');
    setFechaInicio('');
    setFechaFin('');
    setSeleccionados([]);
    setModoEditar(false);
    setEvaluacionSeleccionada(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📝 Configuración de Evaluaciones</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      <div className="mb-3">
        <label>Nombre:</label>
        <input value={nombre} onChange={e => setNombre(e.target.value)} className="form-control" />
      </div>
      <div className="mb-3">
        <label>Fecha Inicio:</label>
        <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} className="form-control" />
      </div>
      <div className="mb-3">
        <label>Fecha Fin:</label>
        <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} className="form-control" />
      </div>
      <div className="mb-3">
        <label>Participantes:</label>
        <select multiple className="form-control" value={seleccionados} onChange={e => setSeleccionados([...e.target.selectedOptions].map(o => o.value))}>
          {empleados.map(emp => (
            <option key={emp.dni} value={emp.dni}>{emp.nombre}</option>
          ))}
        </select>
      </div>
      <button onClick={guardar} className="btn btn-primary">{modoEditar ? "Guardar Cambios" : "Crear Evaluación"}</button>

      <hr />

      <h4>📋 Evaluaciones Existentes</h4>
      <ul className="list-group">
        {Array.isArray(evaluaciones) && evaluaciones.map(evalItem => (
          <li key={evalItem.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{evalItem.nombre}</span>
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => cargarParaEditar(evalItem)}>Editar</button>
              <button className="btn btn-sm btn-danger" onClick={() => eliminarEvaluacion(evalItem.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConfiguracionEvaluaciones;
