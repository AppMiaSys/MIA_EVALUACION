import React, { useState, useEffect } from 'react';
import {
  getSucursales,
  addSucursal,
  getAreas,
  addArea,
  updateSucursal,
  updateArea,
  deleteSucursal,
  deleteArea
} from '../services/api';

const LocalesAreas = () => {
  const [sucursales, setSucursales] = useState([]);
  const [areas, setAreas] = useState([]);
  const [nuevaSucursal, setNuevaSucursal] = useState('');
  const [nuevaArea, setNuevaArea] = useState('');
  const [editSucursal, setEditSucursal] = useState(null);
  const [editArea, setEditArea] = useState(null);

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

  const guardarSucursalEditada = async (id, nombre) => {
    await updateSucursal({ id, nombre });
    setEditSucursal(null);
    cargarDatos();
  };

  const guardarAreaEditada = async (id, nombre) => {
    await updateArea({ id, nombre });
    setEditArea(null);
    cargarDatos();
  };

  const eliminarSucursal = async (id) => {
    await deleteSucursal(id);
    cargarDatos();
  };

  const eliminarArea = async (id) => {
    await deleteArea(id);
    cargarDatos();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mantenedor de Locales y Áreas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              sucursales.map((s) => (
                <li key={s.id} className="flex justify-between items-center mb-1">
                  {editSucursal?.id === s.id ? (
                    <>
                      <input
                        className="border px-2 py-1"
                        value={editSucursal.nombre}
                        onChange={(e) => setEditSucursal({ ...editSucursal, nombre: e.target.value })}
                      />
                      <div className="ml-2">
                        <button
                          onClick={() => guardarSucursalEditada(s.id, editSucursal.nombre)}
                          className="text-green-600 px-2"
                        >
                          ✔
                        </button>
                        <button onClick={() => setEditSucursal(null)} className="text-gray-600 px-2">
                          ✖
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span>{s.nombre}</span>
                      <div>
                        <button onClick={() => setEditSucursal(s)} className="text-blue-600 px-2">
                          ✎
                        </button>
                        <button onClick={() => eliminarSucursal(s.id)} className="text-red-600 px-2">
                          🗑
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No hay sucursales registradas</li>
            )}
          </ul>
        </div>

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
              areas.map((a) => (
                <li key={a.id} className="flex justify-between items-center mb-1">
                  {editArea?.id === a.id ? (
                    <>
                      <input
                        className="border px-2 py-1"
                        value={editArea.nombre}
                        onChange={(e) => setEditArea({ ...editArea, nombre: e.target.value })}
                      />
                      <div className="ml-2">
                        <button
                          onClick={() => guardarAreaEditada(a.id, editArea.nombre)}
                          className="text-green-600 px-2"
                        >
                          ✔
                        </button>
                        <button onClick={() => setEditArea(null)} className="text-gray-600 px-2">
                          ✖
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span>{a.nombre}</span>
                      <div>
                        <button onClick={() => setEditArea(a)} className="text-blue-600 px-2">
                          ✎
                        </button>
                        <button onClick={() => eliminarArea(a.id)} className="text-red-600 px-2">
                          🗑
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))
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
