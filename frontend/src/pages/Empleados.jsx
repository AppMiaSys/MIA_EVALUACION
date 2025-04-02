import React, { useEffect, useState } from "react";
import {
  getEmpleados,
  addEmpleado,
  updateEmpleado,
  getNivelesAcceso,
  getSucursales,
  getAreas,
} from "../services/api";
import { useTranslation } from "react-i18next";

const Empleados = () => {
  const { t } = useTranslation();
  const [empleados, setEmpleados] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [areas, setAreas] = useState([]);
  const [nuevo, setNuevo] = useState({
    dni: "",
    nombre: "",
    sucursal: "",
    area: "",
    contrasena: "",
    nivel_acceso: "",
  });
  const [popupVisible, setPopupVisible] = useState(false);
  const [editando, setEditando] = useState(null);

  const cargarTodo = async () => {
    try {
      const [emp, suc, ar, niv] = await Promise.all([
        getEmpleados(),
        getSucursales(),
        getAreas(),
        getNivelesAcceso(),
      ]);
      setEmpleados(emp || []);
      setSucursales(suc || []);
      setAreas(ar || []);
      setNiveles(niv || []);
    } catch (error) {
      console.error("❌ Error cargando datos:", error);
    }
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  const guardar = async () => {
    if (!nuevo.dni || !nuevo.nombre || !nuevo.nivel_acceso) return;
    await addEmpleado(nuevo);
    setPopupVisible(false);
    setNuevo({
      dni: "",
      nombre: "",
      sucursal: "",
      area: "",
      contrasena: "",
      nivel_acceso: "",
    });
    await cargarTodo();
  };

  const guardarEdicion = async () => {
    await updateEmpleado(editando);
    setEditando(null);
    await cargarTodo();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-mia">{t("Usuarios")}</h1>
        <button
          onClick={() => setPopupVisible(true)}
          className="bg-mia text-white px-4 py-2 rounded"
        >
          {t("Nuevo")}
        </button>
      </div>

      {popupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg space-y-4">
            <h2 className="text-lg font-semibold">{t("Nuevo Usuario")}</h2>
            <input
              type="text"
              placeholder="DNI"
              value={nuevo.dni}
              onChange={(e) => setNuevo({ ...nuevo, dni: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Nombre"
              value={nuevo.nombre}
              onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <select
              value={nuevo.sucursal}
              onChange={(e) => setNuevo({ ...nuevo, sucursal: e.target.value })}
              className="border p-2 rounded w-full"
            >
              <option value="">{t("Selecciona una sucursal")}</option>
              {sucursales.map((s) => (
                <option key={s.id} value={s.nombre}>
                  {s.nombre}
                </option>
              ))}
            </select>
            <select
              value={nuevo.area}
              onChange={(e) => setNuevo({ ...nuevo, area: e.target.value })}
              className="border p-2 rounded w-full"
            >
              <option value="">{t("Selecciona un área")}</option>
              {areas.map((a) => (
                <option key={a.id} value={a.nombre}>
                  {a.nombre}
                </option>
              ))}
            </select>
            <input
              type="password"
              placeholder="Contraseña"
              value={nuevo.contrasena}
              onChange={(e) =>
                setNuevo({ ...nuevo, contrasena: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <select
              value={nuevo.nivel_acceso}
              onChange={(e) =>
                setNuevo({ ...nuevo, nivel_acceso: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              <option value="">{t("Nivel de acceso")}</option>
              {niveles.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.nombre}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 px-4 py-2 rounded text-white"
                onClick={() => setPopupVisible(false)}
              >
                {t("Cancelar")}
              </button>
              <button
                className="bg-mia px-4 py-2 rounded text-white"
                onClick={guardar}
              >
                {t("Guardar")}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="border px-4 py-2">{t("DNI")}</th>
              <th className="border px-4 py-2">{t("Nombre")}</th>
              <th className="border px-4 py-2">{t("Sucursal")}</th>
              <th className="border px-4 py-2">{t("Área")}</th>
              <th className="border px-4 py-2">{t("Nivel de Acceso")}</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((e) => (
              <tr key={e.dni}>
                <td className="border px-4 py-2">{e.dni}</td>
                <td className="border px-4 py-2">{e.nombre}</td>
                <td className="border px-4 py-2">{e.sucursal}</td>
                <td className="border px-4 py-2">{e.area}</td>
                <td className="border px-4 py-2">{e.nivel_acceso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Empleados;
