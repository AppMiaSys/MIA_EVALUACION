import React, { useEffect, useState } from "react";
import {
  getNivelesAcceso,
  addNivelAcceso,
  updateNivelAcceso
} from "../services/api";
import { useTranslation } from "react-i18next";

const opciones = [
  "Dashboard", "Empleados", "Categorías", "Preguntas", "Niveles",
  "Asignaciones", "Evaluar", "Mis Evaluaciones", "Perfil", "Niveles de Acceso", "Ayuda"
];

const NivelesAcceso = () => {
  const { t } = useTranslation();
  const [niveles, setNiveles] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "", permisos: [] });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await getNivelesAcceso();
    setNiveles(res.data || []);
  };

  const togglePermiso = (permiso, enEdicion = false) => {
    const target = enEdicion ? editando : nuevo;
    const permisos = [...(target.permisos || [])];
    const i = permisos.indexOf(permiso);
    if (i >= 0) permisos.splice(i, 1);
    else permisos.push(permiso);
    enEdicion ? setEditando({ ...target, permisos }) : setNuevo({ ...target, permisos });
  };

  const handleAdd = async () => {
    if (!nuevo.nombre) return;
    await addNivelAcceso({ ...nuevo, permisos: nuevo.permisos.join(",") });
    setNuevo({ nombre: "", permisos: [] });
    await cargar(); // ✅ Actualiza la lista al agregar
  };

  const handleUpdate = async () => {
    await updateNivelAcceso({ ...editando, permisos: editando.permisos.join(",") });
    setEditando(null);
    await cargar();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-mia mb-4">{t("Niveles de Acceso")}</h1>

      <div className="p-4 border rounded bg-white space-y-4">
        <input
          type="text"
          placeholder={t("Nombre del nivel")}
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {opciones.map((op) => (
            <label key={op} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={nuevo.permisos.includes(op)}
                onChange={() => togglePermiso(op)}
              />
              {op}
            </label>
          ))}
        </div>
        <button
          onClick={handleAdd}
          className="bg-mia text-white px-4 py-2 rounded"
        >
          {t("Agregar Nivel")}
        </button>
      </div>

      <ul className="divide-y rounded border bg-white">
        {niveles.map((n) => (
          <li key={n.id} className="p-4">
            <strong>{n.nombre}</strong>
            <div className="text-sm text-gray-600">{n.permisos}</div>
            <button
              onClick={() =>
                setEditando({ ...n, permisos: n.permisos ? n.permisos.split(",") : [] })
              }
              className="text-blue-600 text-sm hover:underline mt-1"
            >
              {t("Editar")}
            </button>
          </li>
        ))}
      </ul>

      {editando && (
        <div className="mt-6 p-4 border bg-yellow-50 rounded space-y-4">
          <h3 className="font-semibold">{t("Editar Nivel de Acceso")}</h3>
          <input
            type="text"
            value={editando.nombre}
            onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {opciones.map((op) => (
              <label key={op} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editando.permisos.includes(op)}
                  onChange={() => togglePermiso(op, true)}
                />
                {op}
              </label>
            ))}
          </div>
          <button
            onClick={handleUpdate}
            className="bg-mia text-white px-4 py-2 rounded"
          >
            {t("Guardar cambios")}
          </button>
        </div>
      )}
    </div>
  );
};

export default NivelesAcceso;
