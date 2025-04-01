import React, { useEffect, useState } from "react";
import { 
  getSucursales, getAreas, 
  addSucursal, addArea, 
  updateSucursal, updateArea, 
  deleteSucursal, deleteArea 
} from "../services/api";

const LocalesAreas = () => {
  // Estados para listas y campos de formulario
  const [sucursales, setSucursales] = useState([]);
  const [areas, setAreas] = useState([]);
  const [nuevaSucursal, setNuevaSucursal] = useState("");
  const [nuevaArea, setNuevaArea] = useState("");
  const [editSucursal, setEditSucursal] = useState(null);
  const [editArea, setEditArea] = useState(null);

  // Cargar datos de sucursales y áreas desde la API
  const cargarDatos = async () => {
    try {
      // Llamamos a ambas APIs en paralelo para eficiencia
      const [sucursalesData, areasData] = await Promise.all([
        getSucursales(),
        getAreas()
      ]);
      // Actualizamos el estado con los datos recibidos (asegurando que sean arrays)
      setSucursales(Array.isArray(sucursalesData) ? sucursalesData : []);
      setAreas(Array.isArray(areasData) ? areasData : []);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      // En caso de error, aseguramos dejar listas vacías para evitar estados incongruentes
      setSucursales([]);
      setAreas([]);
    }
  };

  // useEffect para cargar sucursales y áreas al montar el componente
  useEffect(() => {
    cargarDatos();
  }, []);  // dependencia vacía -> se ejecuta una vez al inicio

  // Manejo de creación de nueva sucursal
  const agregarSucursal = async () => {
    if (!nuevaSucursal.trim()) return;          // no hacer nada si el campo está vacío
    await addSucursal({ nombre: nuevaSucursal }); 
    setNuevaSucursal("");                       // limpiar campo
    cargarDatos();                              // refrescar lista de sucursales desde el servidor
  };

  // Manejo de creación de nueva área
  const agregarArea = async () => {
    if (!nuevaArea.trim()) return;
    await addArea({ nombre: nuevaArea });
    setNuevaArea("");
    cargarDatos();  // refrescar lista de áreas
  };

  // Guardar cambios de edición en sucursal existente
  const guardarSucursalEditada = async (id, nombre) => {
    await updateSucursal({ id, nombre });
    setEditSucursal(null);  // salir del modo edición
    cargarDatos();          // refrescar lista para ver cambios
  };

  // Guardar cambios de edición en área existente
  const guardarAreaEditada = async (id, nombre) => {
    await updateArea({ id, nombre });
    setEditArea(null);
    cargarDatos();
  };

  // Eliminar sucursal
  const eliminarSucursal = async (id) => {
    await deleteSucursal(id);
    cargarDatos();
  };

  // Eliminar área
  const eliminarArea = async (id) => {
    await deleteArea(id);
    cargarDatos();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Locales y Áreas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sección Sucursales */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Sucursales</h3>
          {/* Formulario Agregar Sucursal */}
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Nueva sucursal"
              value={nuevaSucursal}
              onChange={(e) => setNuevaSucursal(e.target.value)}
              className="border p-2 flex-1"
            />
            <button 
              onClick={agregarSucursal} 
              className="bg-[#C10B67] text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
          {/* Listado de sucursales */}
          <ul className="list-disc list-inside">
            {sucursales.map((s) => (
              <li key={s.id} className="flex justify-between items-center mb-1">
                {editSucursal?.id === s.id ? (
                  /* Modo edición para esta sucursal */
                  <>
                    <input
                      className="border px-2 py-1 mr-2"
                      value={editSucursal.nombre}
                      onChange={(e) => setEditSucursal({ ...editSucursal, nombre: e.target.value })}
                    />
                    <button onClick={() => guardarSucursalEditada(s.id, editSucursal.nombre)} className="mr-2">
                      Guardar
                    </button>
                    <button onClick={() => setEditSucursal(null)}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  /* Vista normal (no edición) */
                  <>
                    <span>{s.nombre}</span>
                    <div>
                      <button onClick={() => setEditSucursal(s)} className="mr-2">Editar</button>
                      <button onClick={() => eliminarSucursal(s.id)}>Eliminar</button>
                    </div>
                  </>
                )}
              </li>
            ))}
            {/* Mensaje si no hay sucursales */}
            {sucursales.length === 0 && <li>No hay sucursales registradas.</li>}
          </ul>
        </div>

        {/* Sección Áreas */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Áreas</h3>
          {/* Formulario Agregar Área */}
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Nueva área"
              value={nuevaArea}
              onChange={(e) => setNuevaArea(e.target.value)}
              className="border p-2 flex-1"
            />
            <button 
              onClick={agregarArea} 
              className="bg-[#C10B67] text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
          {/* Listado de áreas */}
          <ul className="list-disc list-inside">
            {areas.map((a) => (
              <li key={a.id} className="flex justify-between items-center mb-1">
                {editArea?.id === a.id ? (
                  /* Modo edición para esta área */
                  <>
                    <input
                      className="border px-2 py-1 mr-2"
                      value={editArea.nombre}
                      onChange={(e) => setEditArea({ ...editArea, nombre: e.target.value })}
                    />
                    <button onClick={() => guardarAreaEditada(a.id, editArea.nombre)} className="mr-2">
                      Guardar
                    </button>
                    <button onClick={() => setEditArea(null)}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  /* Vista normal (no edición) */
                  <>
                    <span>{a.nombre}</span>
                    <div>
                      <button onClick={() => setEditArea(a)} className="mr-2">Editar</button>
                      <button onClick={() => eliminarArea(a.id)}>Eliminar</button>
                    </div>
                  </>
                )}
              </li>
            ))}
            {/* Mensaje si no hay áreas */}
            {areas.length === 0 && <li>No hay áreas registradas.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocalesAreas;
