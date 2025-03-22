import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Configuracion = () => {
  const { t } = useTranslation();
  const [empleados, setEmpleados] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [niveles, setNiveles] = useState([]);

  // Formulario de empleados
  const [nuevoEmpleado, setNuevoEmpleado] = useState({ dni: "", nombre: "", sucursal: "" });

  // Formulario de preguntas
  const [nuevaPregunta, setNuevaPregunta] = useState({ categoria: "", texto: "" });

  // Formulario de niveles
  const [nuevoNivel, setNuevoNivel] = useState({ nivel: "", puntos: "" });

useEffect(() => {
  const cargarDatos = async () => {
    try {
      const [res1, res2, res3] = await Promise.all([
        axios.get("/api/empleados"),
        axios.get("/api/preguntas"),
        axios.get("/api/niveles")
      ]);

      setEmpleados(Array.isArray(res1.data) ? res1.data : []);
      setPreguntas(Array.isArray(res2.data) ? res2.data : []);
      setNiveles(Array.isArray(res3.data) ? res3.data : []);
    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  };
  cargarDatos();
}, []);
  {Array.isArray(niveles) && niveles.map((n) => (
  <li key={n.id}>⭐ {n.nivel} = {n.puntos} pts</li>
))}


  const agregarEmpleado = async () => {
    await axios.post("/api/empleados", nuevoEmpleado);
    setNuevoEmpleado({ dni: "", nombre: "", sucursal: "" });
    cargarDatos();
  };

  const agregarPregunta = async () => {
    await axios.post("/api/preguntas", nuevaPregunta);
    setNuevaPregunta({ categoria: "", texto: "" });
    cargarDatos();
  };

  const agregarNivel = async () => {
    await axios.post("/api/niveles", nuevoNivel);
    setNuevoNivel({ nivel: "", puntos: "" });
    cargarDatos();
  };

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold">{t("Configuración del Sistema")}</h1>

      {/* Empleados */}
      <section>
        <h2 className="text-xl font-semibold">{t("Empleados")}</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="DNI"
            value={nuevoEmpleado.dni}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, dni: e.target.value })}
            className="border p-1"
          />
          <input
            type="text"
            placeholder={t("Nombre")}
            value={nuevoEmpleado.nombre}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })}
            className="border p-1"
          />
          <input
            type="text"
            placeholder={t("Sucursal")}
            value={nuevoEmpleado.sucursal}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, sucursal: e.target.value })}
            className="border p-1"
          />
          <button onClick={agregarEmpleado} className="bg-[#C10B67] text-white px-3 rounded">
            {t("Agregar")}
          </button>
        </div>
        <ul className="text-sm">
          {empleados.map((e) => (
            <li key={e.dni}>👤 {e.nombre} ({e.dni}) - {e.sucursal}</li>
          ))}
        </ul>
      </section>

      {/* Preguntas */}
      <section>
        <h2 className="text-xl font-semibold">{t("Preguntas")}</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder={t("Categoría")}
            value={nuevaPregunta.categoria}
            onChange={(e) => setNuevaPregunta({ ...nuevaPregunta, categoria: e.target.value })}
            className="border p-1"
          />
          <input
            type="text"
            placeholder={t("Texto de la pregunta")}
            value={nuevaPregunta.texto}
            onChange={(e) => setNuevaPregunta({ ...nuevaPregunta, texto: e.target.value })}
            className="border p-1 w-full"
          />
          <button onClick={agregarPregunta} className="bg-[#C10B67] text-white px-3 rounded">
            {t("Agregar")}
          </button>
        </div>
        <ul className="text-sm">
          {preguntas.map((p) => (
            <li key={p.id}>📌 <strong>{p.categoria}</strong>: {p.texto}</li>
          ))}
        </ul>
      </section>

      {/* Niveles */}
      <section>
        <h2 className="text-xl font-semibold">{t("Niveles de Calificación")}</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder={t("Nivel")}
            value={nuevoNivel.nivel}
            onChange={(e) => setNuevoNivel({ ...nuevoNivel, nivel: e.target.value })}
            className="border p-1"
          />
          <input
            type="number"
            placeholder={t("Puntos")}
            value={nuevoNivel.puntos}
            onChange={(e) => setNuevoNivel({ ...nuevoNivel, puntos: e.target.value })}
            className="border p-1 w-24"
          />
          <button onClick={agregarNivel} className="bg-[#C10B67] text-white px-3 rounded">
            {t("Agregar")}
          </button>
        </div>
        <ul className="text-sm">
          {niveles.map((n) => (
            <li key={n.id}>⭐ {n.nivel} = {n.puntos} pts</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Configuracion;
