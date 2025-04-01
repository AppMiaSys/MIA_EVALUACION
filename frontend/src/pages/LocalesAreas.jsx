import React, { useEffect, useState } from "react";
import { getSucursales, getAreas, addSucursal, addArea } from "../services/api";

const LocalesAreas = () => {
  const [sucursales, setSucursales] = useState([]);
  const [areas, setAreas] = useState([]);
  const [nuevaSucursal, setNuevaSucursal] = useState("");
  const [nuevaArea, setNuevaArea] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const s = await getSucursales();
      const a = await getAreas();
      export const getSucursales = async () => {
  const res = await axios.get(`${API}/sucursales`);
  return res.data;
};

export const getAreas = async () => {
  const res = await axios.get(`${API}/areas`);
  return res.data;
};
setSucursales(Array.isArray(s) ? s : []);
setAreas(Array.isArray(a) ? a : []);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const guardarSucursal = async () => {
    if (!nuevaSucursal) return;
    await addSucursal({ nombre: nuevaSucursal });
    setNuevaSucursal("");
    cargarDatos();
  };

  const guardarArea = async () => {
    if (!nuevaArea) return;
    await addArea({ nombre: nuevaArea });
    setNuevaArea("");
    cargarDatos();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Locales y Áreas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sucursales */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Sucursales</h3>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Nueva sucursal"
              value={nuevaSucursal}
              onChange={(e) => setNuevaSucursal(e.target.value)}
              className="border p-2 flex-1"
            />
            <button
              onClick={guardarSucursal}
              className="bg-[#C10B67] text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
          <ul className="list-disc list-inside">
            {sucursales.map((s) => (
              <li key={s.id}>{s.nombre}</li>
            ))}
          </ul>
        </div>

        {/* Áreas */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Áreas</h3>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Nueva área"
              value={nuevaArea}
              onChange={(e) => setNuevaArea(e.target.value)}
              className="border p-2 flex-1"
            />
            <button
              onClick={guardarArea}
              className="bg-[#C10B67] text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
          <ul className="list-disc list-inside">
            {areas.map((a) => (
              <li key={a.id}>{a.nombre}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocalesAreas;
