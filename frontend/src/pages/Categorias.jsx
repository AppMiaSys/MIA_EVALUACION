// ✅ src/pages/Categorias.jsx

import React, { useEffect, useState } from "react";
import { getCategorias, addCategoria } from "../services/api";
import { useTranslation } from "react-i18next";

const Categorias = () => {
  const { t } = useTranslation();
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");

  const cargar = async () => {
    const res = await getCategorias();
    setCategorias(res.data);
  };

  const guardar = async () => {
    if (!nombre.trim()) return;
    await addCategoria({ nombre });
    setNombre("");
    cargar();
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-mia">{t("Categorías de Preguntas")}</h1>
      <div className="flex gap-2">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder={t("Nombre de categoría")}
          className="border p-2 rounded w-full"
        />
        <button onClick={guardar} className="bg-mia text-white px-4 rounded">{t("Agregar")}</button>
      </div>
      <ul className="bg-white divide-y rounded shadow">
        {categorias.map((c) => (
          <li key={c.id} className="p-2">{c.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categorias;
