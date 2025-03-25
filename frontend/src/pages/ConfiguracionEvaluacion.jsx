// ✅ src/pages/ConfiguracionEvaluacion.jsx con popup para seleccionar evaluados

import React, { useState, useEffect } from "react";
import { getEmpleados } from "../services/api";

const ConfiguracionEvaluacion = () => {
  const [empleados, setEmpleados] = useState([]);
  const [evaluadosSeleccionados, setEvaluadosSeleccionados] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const cargar = async () => {
      const res = await getEmpleados();
      setEmpleados(res.data);
    };
    cargar();
  }, []);

  const toggleSeleccion = (dni) => {
    setEvaluadosSeleccionados((prev) =>
      prev.includes(dni) ? prev.filter((id) => id !== dni) : [...prev, dni]
    );
  };

  const guardarEvaluados = () => {
    // Aquí puedes enviar evaluadosSeleccionados al backend o asociarlos a la evaluación
    console.log("Evaluados seleccionados:", evaluadosSeleccionados);
    setMostrarPopup(false);
  };

  const empleadosFiltrados = empleados.filter((e) =>
    e.dni.includes(busqueda) || e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-mia">Configuración de Evaluación</h1>
      {/* Otros campos de configuración aquí */}

      <button
        onClick={() => setMostrarPopup(true)}
        className="bg-mia text-white px-4 py-2 rounded"
      >
        Seleccionar evaluados
      </button>

      {mostrarPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-xl space-y-4">
            <h2 className="text-lg font-semibold">Seleccionar Evaluados</h2>
            <input
              type="text"
              placeholder="Buscar por DNI o nombre"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <div className="max-h-60 overflow-y-auto border p-2 rounded">
              {empleadosFiltrados.map((emp) => (
                <label key={emp.dni} className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    checked={evaluadosSeleccionados.includes(emp.dni)}
                    onChange={() => toggleSeleccion(emp.dni)}
                  />
                  {emp.nombre} ({emp.dni})
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setMostrarPopup(false)} className="text-gray-600 hover:underline">
                Cancelar
              </button>
              <button onClick={guardarEvaluados} className="bg-mia text-white px-4 py-2 rounded">
                Guardar selección
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfiguracionEvaluacion;
