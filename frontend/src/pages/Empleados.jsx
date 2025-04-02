import React, { useState, useEffect } from "react";
import {
  getEmpleados,
  addEmpleado,
  updateEmpleado,
  getSucursales,
  getAreas,
  getNivelesAcceso,
} from "../services/api";

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [area, setArea] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nivelAcceso, setNivelAcceso] = useState(1);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [sucursales, setSucursales] = useState([]);
  const [areas, setAreas] = useState([]);
  const [niveles, setNiveles] = useState([]);

  const limpiarFormulario = () => {
    setDni("");
    setNombre("");
    setSucursal("");
    setArea("");
    setContrasena("");
    setNivelAcceso(1);
    setModoEdicion(false);
  };

  const cargarTodo = async () => {
    try {
      const [emp, suc, ar, niv] = await Promise.all([
        getEmpleados(),
        getSucursales(),
        getAreas(),
        getNivelesAcceso(),
      ]);
      setEmpleados(Array.isArray(emp) ? emp : []);
      setSucursales(Array.isArray(suc) ? suc : []);
      setAreas(Array.isArray(ar) ? ar : []);
      setNiveles(Array.isArray(niv) ? niv : []);
    } catch (error) {
      console.error("❌ Error cargando datos:", error);
    }
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  const guardarEmpleado = async () => {
    const nuevoEmpleado = {
      dni,
      nombre,
      sucursal,
      area,
      contrasena,
      nivel_acceso: nivelAcceso,
    };

    try {
      if (modoEdicion) {
        await updateEmpleado(nuevoEmpleado);
      } else {
        await addEmpleado(nuevoEmpleado);
      }
      limpiarFormulario();
      setPopupVisible(false);
      cargarTodo();
    } catch (error) {
      console.error("Error al guardar empleado:", error);
    }
  };

  const editarEmpleado = (emp) => {
    setDni(emp.dni);
    setNombre(emp.nombre);
    setSucursal(emp.sucursal);
    setArea(emp.area);
    setContrasena(emp.contrasena);
    setNivelAcceso(emp.nivel_acceso);
    setModoEdicion(true);
    setPopupVisible(true);
  };

const obtenerNombreNivel = (id) => {
  const nivel = niveles.find((n) => n.id === id);
  return nivel ? nivel.nombre : "Desconocido";
};

  
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gestión de Empleados</h1>
      <button
        onClick={() => {
          limpiarFormulario();
          setPopupVisible(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + Nuevo Empleado
      </button>

      {popupVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">
              {modoEdicion ? "Editar Empleado" : "Nuevo Empleado"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="border p-2"
                placeholder="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                disabled={modoEdicion}
              />
              <input
                className="border p-2"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <select
                className="border p-2"
                value={sucursal}
                onChange={(e) => setSucursal(e.target.value)}
              >
                <option value="">Seleccione sucursal</option>
                {Array.isArray(sucursales) &&
                  sucursales.map((s) => (
                    <option key={s.id} value={s.nombre}>
                      {s.nombre}
                    </option>
                  ))}
              </select>
              <select
                className="border p-2"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">Seleccione área</option>
                {Array.isArray(areas) &&
                  areas.map((a) => (
                    <option key={a.id} value={a.nombre}>
                      {a.nombre}
                    </option>
                  ))}
              </select>
              <input
                className="border p-2"
                placeholder="Contraseña"
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
              <select
                className="border p-2"
                value={nivelAcceso}
                onChange={(e) => setNivelAcceso(Number(e.target.value))}
              >
                <option value="">Nivel de acceso</option>
                {Array.isArray(niveles) &&
                  niveles.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.nombre}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setPopupVisible(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={guardarEmpleado}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">DNI</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Sucursal</th>
            <th className="border p-2">Área</th>
            <th className="border p-2">Nivel</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.dni}>
              <td className="border p-2">{emp.dni}</td>
              <td className="border p-2">{emp.nombre}</td>
              <td className="border p-2">{emp.sucursal}</td>
              <td className="border p-2">{emp.area}</td>
              <td className="border p-2">{obtenerNombreNivel(emp.nivel_acceso)}</td>
              <td className="border p-2">
                <button
                  onClick={() => editarEmpleado(emp)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Empleados;
