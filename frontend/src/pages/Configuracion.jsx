import React, { useEffect, useState } from "react";
import {
  getEmpleados,
  addEmpleado,
  updateEmpleado,
  getCategorias,
  addCategoria,
  getResultadosPorEmpleado
} from "../services/api";
import { useTranslation } from "react-i18next";

const Configuracion = () => {
  const { t } = useTranslation();

  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({ dni: "", nombre: "", sucursal: "", area: "" });
  const [editarEmpleado, setEditarEmpleado] = useState(null);
  const [resultados, setResultados] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const resEmp = await getEmpleados();
    const resCat = await getCategorias();
    setEmpleados(resEmp.data || []);
    setCategorias(resCat.data || []);
  };

  const handleAddEmpleado = async () => {
    if (!nuevoEmpleado.dni || !nuevoEmpleado.nombre) return;
    await addEmpleado(nuevoEmpleado);
    setNuevoEmpleado({ dni: "", nombre: "", sucursal: "", area: "" });
    cargarDatos();
  };

  const handleUpdateEmpleado = async () => {
    await updateEmpleado(editarEmpleado);
    setEditarEmpleado(null);
    cargarDatos();
  };

  const handleVerResultados = async (dni) => {
    const res = await getResultadosPorEmpleado(dni);
    setResultados({ ...resultados, [dni]: res.data });
  };

  const handleAddCategoria = async () => {
    if (!nuevaCategoria) return;
    await addCategoria({ nombre: nuevaCategoria });
    setNuevaCategoria("");
    cargarDatos();
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto font-inter text-sm">
      <h1 className="text-2xl font-bold text-mia">{t("Configuración del Sistema")}</h1>

      {/* === EMPLEADOS === */}
      <section>
        <h2 className="text-xl font-semibold mb-2">{t("Empleados")}</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="DNI"
            value={nuevoEmpleado.dni}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, dni: e.target.value })}
            className="border p-1 rounded"
          />
          <input
            type="text"
            placeholder={t("Nombre")}
            value={nuevoEmpleado.nombre}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })}
            className="border p-1 rounded"
          />
          <input
            type="text"
            placeholder={t("Sucursal")}
            value={nuevoEmpleado.sucursal}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, sucursal: e.target.value })}
            className="border p-1 rounded"
          />
          <input
            type="text"
            placeholder={t("Área")}
            value={nuevoEmpleado.area}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, area: e.target.value })}
            className="border p-1 rounded"
          />
          <button onClick={handleAddEmpleado} className="bg-mia text-white px-3 rounded">
            {t("Agregar")}
          </button>
        </div>

        <ul className="divide-y border rounded shadow-sm bg-white">
          {empleados.map((emp) => (
            <li key={emp.dni} className="p-2 flex justify-between items-start">
              <div>
                <strong>{emp.nombre}</strong> ({emp.dni})<br />
                {emp.area} - {emp.sucursal}
                {resultados[emp.dni] && (
                  <div className="mt-1 text-gray-700">
                    <strong>{t("Resultados")}:</strong>
                    <ul className="list-disc list-inside text-xs">
                      {resultados[emp.dni].map((r, idx) => (
                        <li key={idx}>
                          {r.fecha} - {r.categoria}: {r.nivel}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditarEmpleado(emp)}
                  className="text-blue-600 hover:underline"
                >
                  {t("Editar")}
                </button>
                <button
                  onClick={() => handleVerResultados(emp.dni)}
                  className="text-green-600 hover:underline"
                >
                  {t("Ver resultados")}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {editarEmpleado && (
          <div className="mt-4 p-4 border rounded bg-yellow-50">
            <h3 className="font-semibold">{t("Editar Empleado")}</h3>
            <input
              type="text"
              value={editarEmpleado.nombre}
              onChange={(e) =>
                setEditarEmpleado({ ...editarEmpleado, nombre: e.target.value })
              }
              className="border p-1 m-1 rounded"
            />
            <input
              type="text"
              value={editarEmpleado.sucursal}
              onChange={(e) =>
                setEditarEmpleado({ ...editarEmpleado, sucursal: e.target.value })
              }
              className="border p-1 m-1 rounded"
            />
            <input
              type="text"
              value={editarEmpleado.area}
              onChange={(e) =>
                setEditarEmpleado({ ...editarEmpleado, area: e.target.value })
              }
              className="border p-1 m-1 rounded"
            />
            <button
              onClick={handleUpdateEmpleado}
              className="bg-mia text-white px-3 py-1 rounded ml-2"
            >
              {t("Guardar cambios")}
            </button>
          </div>
        )}
      </section>

      {/* === CATEGORÍAS === */}
      <section>
        <h2 className="text-xl font-semibold mb-2">{t("Categorías de Preguntas")}</h2>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder={t("Nueva categoría")}
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            className="border p-1 rounded"
          />
          <button onClick={handleAddCategoria} className="bg-mia text-white px-3 rounded">
            {t("Agregar")}
          </button>
        </div>

        <ul className="list-disc list-inside bg-white p-3 rounded shadow">
          {categorias.map((c) => (
            <li key={c.id}>{c.nombre}</li>
          ))}
        </ul>
      </section>
      {/* === PREGUNTAS === */}
      <section>
        <h2 className="text-xl font-semibold mb-2">{t("Preguntas")}</h2>

        <Preguntas categorias={categorias} />
      </section>

      {/* === NIVELES === */}
      <section>
        <h2 className="text-xl font-semibold mb-2">{t("Niveles de Calificación")}</h2>

        <Niveles />
      </section>

      {/* === ASIGNACIONES === */}
      <section>
        <h2 className="text-xl font-semibold mb-2">{t("Asignaciones")}</h2>

        <Asignaciones empleados={empleados} />
      </section>
    </div>
  );
};

export default Configuracion;

