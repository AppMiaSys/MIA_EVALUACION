// ✅ src/pages/Asignaciones.jsx actualizado con guardar, listar y editar asignaciones

import React, { useEffect, useState } from "react";
import { getEmpleados, getAsignaciones, asignarEvaluados } from "../services/api";
import { useTranslation } from "react-i18next";

const Asignaciones = () => {
  const { t } = useTranslation();
  const [empleados, setEmpleados] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [asignados, setAsignados] = useState([]);
  const [asignacionesTotales, setAsignacionesTotales] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await getEmpleados();
    setEmpleados(res.data);
  };

  const cargarAsignaciones = async (dni) => {
    const res = await getAsignaciones(dni);
    setAsignados(res.data);
  };

  const seleccionar = async (e) => {
    setSeleccionado(e);
    await cargarAsignaciones(e.dni);
  };

  const toggleAsignado = (dni) => {
    const existe = asignados.includes(dni);
    const actualizados = existe
      ? asignados.filter((a) => a !== dni)
      : [...asignados, dni];
    setAsignados(actualizados);
  };

  const guardar = async () => {
    await asignarEvaluados({ evaluador: seleccionado.dni, evaluados: asignados });
    const nuevaLista = [...asignacionesTotales.filter(a => a.evaluador !== seleccionado.dni), {
      evaluador: seleccionado.dni,
      evaluador_nombre: seleccionado.nombre,
      evaluados: empleados.filter(e => asignados.includes(e.dni))
    }];
    setAsignacionesTotales(nuevaLista);
    setSeleccionado(null);
    setAsignados([]);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-mia mb-4">{t("Asignaciones de Evaluación")}</h1>

      {!seleccionado && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {empleados.map((e) => (
            <button
              key={e.dni}
              onClick={() => seleccionar(e)}
              className="border rounded p-2 hover:bg-yellow-50"
            >
              {e.nombre} ({e.dni})
            </button>
          ))}
        </div>
      )}

      {seleccionado && (
        <div className="bg-white border rounded p-4">
          <h2 className="font-semibold mb-2">{t("Asignar a")} {seleccionado.nombre}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {empleados.filter((e) => e.dni !== seleccionado.dni).map((e) => (
              <label key={e.dni} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={asignados.includes(e.dni)}
                  onChange={() => toggleAsignado(e.dni)}
                />
                {e.nombre}
              </label>
            ))}
          </div>
          <div className="flex gap-4">
            <button onClick={guardar} className="bg-mia text-white px-4 py-2 rounded">
              {t("Guardar Asignaciones")}
            </button>
            <button
              onClick={() => {
                setSeleccionado(null);
                setAsignados([]);
              }}
              className="text-gray-600 underline"
            >
              {t("Cancelar")}
            </button>
          </div>
        </div>
      )}

      {asignacionesTotales.length > 0 && (
        <div className="bg-white p-4 border rounded mt-6">
          <h2 className="text-lg font-semibold mb-2">{t("Asignaciones Guardadas")}</h2>
          <ul className="divide-y">
            {asignacionesTotales.map((a, idx) => (
              <li key={idx} className="py-2">
                <strong>{a.evaluador_nombre}</strong>
                <div className="text-sm text-gray-600">
                  {a.evaluados.map((e) => e.nombre).join(", ")}
                </div>
                <button
                  onClick={() => seleccionar({ dni: a.evaluador, nombre: a.evaluador_nombre })}
                  className="text-blue-600 text-sm hover:underline"
                >
                  {t("Editar")}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Asignaciones;
