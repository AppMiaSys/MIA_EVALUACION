import React, { useEffect, useState } from "react";
import {
  getEmpleados,
  addEmpleado,
  updateEmpleado,
  getSucursales,
  getAreas,
  getNivelesAcceso,
} from "../services/api";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    dni: "",
    nombre: "",
    sucursal: "",
    area: "",
    contrasena: "",
    nivel_acceso: 1,
  });
  const [sucursales, setSucursales] = useState([]);
  const [areas, setAreas] = useState([]);
  const [niveles, setNiveles] = useState([]);

  const cargarSucursalesYAreas = async () => {
    try {
      const [s, a, n, e] = await Promise.all([
        getSucursales(),
        getAreas(),
        getNivelesAcceso(),
        getEmpleados(),
      ]);
      setSucursales(Array.isArray(s) ? s : []);
      setAreas(Array.isArray(a) ? a : []);
      setNiveles(Array.isArray(n) ? n : []);
      setEmpleados(Array.isArray(e) ? e : []);
    } catch (error) {
      console.error("❌ Error cargando datos:", error);
    }
  };

  useEffect(() => {
    cargarSucursalesYAreas();
  }, []);

  const abrirPopup = (emp = null) => {
    if (emp) {
      setForm(emp);
      setEditando(true);
    } else {
      setForm({
        dni: "",
        nombre: "",
        sucursal: "",
        area: "",
        contrasena: "",
        nivel_acceso: 1,
      });
      setEditando(false);
    }
    setPopupVisible(true);
  };

  const cerrarPopup = () => setPopupVisible(false);

  const guardar = async () => {
    if (editando) await updateEmpleado(form);
    else await addEmpleado(form);
    await cargarSucursalesYAreas();
    cerrarPopup();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Empleados</h2>
      <button
        onClick={() => abrirPopup()}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        + Nuevo Empleado
      </button>
      <div className="overflow-x-auto">
        <table className="w-full border text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">DNI</th>
              <th className="border px-2 py-1">Nombre</th>
              <th className="border px-2 py-1">Sucursal</th>
              <th className="border px-2 py-1">Área</th>
              <th className="border px-2 py-1">Contraseña</th>
              <th className="border px-2 py-1">Nivel Acceso</th>
              <th className="border px-2 py-1">Editar</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp) => (
              <tr key={emp.dni}>
                <td className="border px-2 py-1">{emp.dni}</td>
                <td className="border px-2 py-1">{emp.nombre}</td>
                <td className="border px-2 py-1">{emp.sucursal}</td>
                <td className="border px-2 py-1">{emp.area}</td>
                <td className="border px-2 py-1">{emp.contrasena}</td>
                <td className="border px-2 py-1">{emp.nivel_acceso}</td>
                <td className="border px-2 py-1">
                  <button
                    className="text-blue-500 underline"
                    onClick={() => abrirPopup(emp)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {popupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editando ? "Editar Empleado" : "Nuevo Empleado"}
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="DNI"
                value={form.dni}
                onChange={(e) => setForm({ ...form, dni: e.target.value })}
                disabled={editando}
                className="w-full border px-3 py-1 rounded"
              />
              <input
                type="text"
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full border px-3 py-1 rounded"
              />
              <select
                value={form.sucursal}
                onChange={(e) => setForm({ ...form, sucursal: e.target.value })}
                className="w-full border px-3 py-1 rounded"
              >
                <option value="">Seleccione una sucursal</option>
                {Array.isArray(sucursales) &&
                  sucursales.map((s) => (
                    <option key={s.id} value={s.nombre}>
                      {s.nombre}
                    </option>
                  ))}
              </select>
              <select
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                className="w-full border px-3 py-1 rounded"
              >
                <option value="">Seleccione un área</option>
                {Array.isArray(areas) &&
                  areas.map((a) => (
                    <option key={a.id} value={a.nombre}>
                      {a.nombre}
                    </option>
                  ))}
              </select>
              <input
                type="password"
                placeholder="Contraseña"
                value={form.contrasena}
                onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
                className="w-full border px-3 py-1 rounded"
              />
              <select
                value={form.nivel_acceso}
                onChange={(e) =>
                  setForm({ ...form, nivel_acceso: parseInt(e.target.value) })
                }
                className="w-full border px-3 py-1 rounded"
              >
                <option value="">Nivel de Acceso</option>
                {Array.isArray(niveles) &&
                  niveles.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.nombre}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={cerrarPopup}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={guardar}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empleados;
