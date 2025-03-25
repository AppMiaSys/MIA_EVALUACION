// ✅ src/pages/Empleados.jsx con nivel de acceso en el formulario

import React, { useEffect, useState } from "react";
import { getEmpleados, addEmpleado, updateEmpleado } from "../services/api";
import { useTranslation } from "react-i18next";

const Empleados = () => {
  const { t } = useTranslation();
  const [empleados, setEmpleados] = useState([]);
  const [nuevo, setNuevo] = useState({ dni: "", nombre: "", sucursal: "", area: "", contrasena: "", nivel_acceso: 2 });
  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await getEmpleados();
    setEmpleados(res.data);
  };

  const guardar = async () => {
    if (!nuevo.dni || !nuevo.nombre) return;
    await addEmpleado(nuevo);
    setNuevo({ dni: "", nombre: "", sucursal: "", area: "", contrasena: "", nivel_acceso: 2 });
    setMostrarFormulario(false);
    await cargar();
  };

  const guardarEdicion = async () => {
    await updateEmpleado(editando);
    setEditando(null);
    await cargar();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-mia">{t("Usuarios")}</h1>
        {empleados.length > 0 && (
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-mia text-white px-4 py-2 rounded"
          >
            {t("Nuevo")}
          </button>
        )}
      </div>

      {empleados.length === 0 ? (
        <div className="bg-white p-4 border rounded space-y-4">
          <h2 className="text-lg font-semibold">{t("Registrar primer usuario")}</h2>
          <input type="text" placeholder="DNI" value={nuevo.dni} onChange={(e) => setNuevo({ ...nuevo, dni: e.target.value })} className="border p-2 rounded w-full" />
          <input type="text" placeholder="Nombre" value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} className="border p-2 rounded w-full" />
          <input type="text" placeholder="Sucursal" value={nuevo.sucursal} onChange={(e) => setNuevo({ ...nuevo, sucursal: e.target.value })} className="border p-2 rounded w-full" />
          <input type="text" placeholder="Área" value={nuevo.area} onChange={(e) => setNuevo({ ...nuevo, area: e.target.value })} className="border p-2 rounded w-full" />
          <input type="text" placeholder="Contraseña" value={nuevo.contrasena} onChange={(e) => setNuevo({ ...nuevo, contrasena: e.target.value })} className="border p-2 rounded w-full" />
          <select value={nuevo.nivel_acceso} onChange={(e) => setNuevo({ ...nuevo, nivel_acceso: parseInt(e.target.value) })} className="border p-2 rounded w-full">
            <option value={1}>Super Admin</option>
            <option value={2}>Administrador</option>
            <option value={3}>Colaborador</option>
          </select>
          <button onClick={guardar} className="bg-mia text-white px-4 py-2 rounded w-full">{t("Registrar")}</button>
        </div>
      ) : (
        <ul className="bg-white border rounded divide-y">
          {empleados.map((e) => (
            <li key={e.dni} className="p-4">
              <div className="font-bold">{e.nombre} ({e.dni})</div>
              <div className="text-sm text-gray-600">{e.sucursal} – {e.area}</div>
              <button onClick={() => setEditando(e)} className="text-blue-600 text-sm hover:underline mt-1">{t("Editar")}</button>
            </li>
          ))}
        </ul>
      )}

      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg space-y-4">
            <h2 className="text-lg font-semibold">{t("Nuevo Usuario")}</h2>
            <input type="text" placeholder="DNI" value={nuevo.dni} onChange={(e) => setNuevo({ ...nuevo, dni: e.target.value })} className="border p-2 rounded w-full" />
            <input type="text" placeholder="Nombre" value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} className="border p-2 rounded w-full" />
            <input type="text" placeholder="Sucursal" value={nuevo.sucursal} onChange={(e) => setNuevo({ ...nuevo, sucursal: e.target.value })} className="border p-2 rounded w-full" />
            <input type="text" placeholder="Área" value={nuevo.area} onChange={(e) => setNuevo({ ...nuevo, area: e.target.value })} className="border p-2 rounded w-full" />
            <input type="text" placeholder="Contraseña" value={nuevo.contrasena} onChange={(e) => setNuevo({ ...nuevo, contrasena: e.target.value })} className="border p-2 rounded w-full" />
            <select value={nuevo.nivel_acceso} onChange={(e) => setNuevo({ ...nuevo, nivel_acceso: parseInt(e.target.value) })} className="border p-2 rounded w-full">
              <option value={1}>Super Admin</option>
              <option value={2}>Administrador</option>
              <option value={3}>Colaborador</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setMostrarFormulario(false)} className="text-gray-600 hover:underline">{t("Cancelar")}</button>
              <button onClick={guardar} className="bg-mia text-white px-4 py-2 rounded">{t("Guardar")}</button>
            </div>
          </div>
        </div>
      )}

      {editando && (
        <div className="mt-6 bg-yellow-50 p-4 border rounded space-y-4">
          <h3 className="font-semibold">{t("Editar Usuario")}</h3>
          <input type="text" value={editando.nombre} onChange={(e) => setEditando({ ...editando, nombre: e.target.value })} className="border p-2 rounded w-full" />
          <input type="text" value={editando.sucursal} onChange={(e) => setEditando({ ...editando, sucursal: e.target.value })} className="border p-2 rounded w-full" />
          <input type="text" value={editando.area} onChange={(e) => setEditando({ ...editando, area: e.target.value })} className="border p-2 rounded w-full" />
          <input type="text" value={editando.contrasena} onChange={(e) => setEditando({ ...editando, contrasena: e.target.value })} className="border p-2 rounded w-full" />
          <select value={editando.nivel_acceso} onChange={(e) => setEditando({ ...editando, nivel_acceso: parseInt(e.target.value) })} className="border p-2 rounded w-full">
            <option value={1}>Super Admin</option>
            <option value={2}>Administrador</option>
            <option value={3}>Colaborador</option>
          </select>
          <button onClick={guardarEdicion} className="bg-mia text-white px-4 py-2 rounded">{t("Guardar cambios")}</button>
        </div>
      )}
    </div>
  );
};

export default Empleados;
