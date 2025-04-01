import React, { useState, useEffect } from 'react';
import { getSucursales, addSucursal, getAreas, addArea } from '../services/api';

const LocalesAreas = () => {
  const [sucursales, setSucursales] = useState([]);
  const [areas, setAreas] = useState([]);
  const [nuevaSucursal, setNuevaSucursal] = useState('');
  const [nuevaArea, setNuevaArea] = useState('');

  const cargarDatos = async () => {
    try {
      const [sucursalesRes, areasRes] = await Promise.all([getSucursales(), getAreas()]);
      setSucursales(sucursalesRes || []);
      setAreas(areasRes || []);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const agregarSucursal = async () => {
    if (!nuevaSucursal.trim()) return;
    await addSucursal({ nombre: nuevaSucursal });
    setNuevaSucursal('');
    cargarDatos();
  };

  const agregarArea = async () => {
    if (!nuevaArea.trim()) return;
    await addArea({ nombre: nuevaArea });
    setNuevaArea('');
    cargarDatos();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mantenedor de Locales y Áreas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sucursales */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Sucursales</h3>
          <div className="flex gap-2 mb-4">
            <input
              value={nuevaSucursal}
              onChange={(e) => setNuevaSucursal(e.target.value)}
              placeholder="Nueva sucursal"
              className="border px-2 py-1 flex-1"
            />
            <button onClick={agregarSucursal} className="bg-blue-600 text-white px-3 py-1 rounded">
              Agregar
            </button>
          </div>
          <ul className="list-disc pl-5">
            {sucursales.length > 0 ? (
              sucursales.map((s, i) => <li key={i}>{s.nombre}</li>)
            ) : (
              <li className="text-gray-500">No hay sucursales registradas</li>
            )}
          </ul>
        </div>

        {/* Áreas */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Áreas</h3>
          <div className="flex gap-2 mb-4">
            <input
              value={nuevaArea}
              onChange={(e) => setNuevaArea(e.target.value)}
              placeholder="Nueva área"
              className="border px-2 py-1 flex-1"
            />
            <button onClick={agregarArea} className="bg-green-600 text-white px-3 py-1 rounded">
              Agregar
            </button>
          </div>
          <ul className="list-disc pl-5">
            {areas.length > 0 ? (
              areas.map((a, i) => <li key={i}>{a.nombre}</li>)
            ) : (
              <li className="text-gray-500">No hay áreas registradas</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocalesAreas;
