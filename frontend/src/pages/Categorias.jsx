// ✅ src/pages/Categorias.jsx

import React, { useEffect, useState } from "react";
import { getCategorias, addCategoria } from "../services/api";
import { useTranslation } from "react-i18next";

const Categorias = () => {
  const { t } = useTranslation();
  const [categorias, setCategorias] = useState([]);
  const [nueva, setNueva] = useState("");

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    const res = await getCategorias();
    setCategorias(Array.isArray(res.data) ? res.data : []);
  };

  const handleAdd = async () => {
    if (!nueva.trim()) return;
    await addCategoria({ nombre: nueva });
    setNueva("");
    cargarCategorias();
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-mia">{t("Categorías de Preguntas")}</h1>

      <div className="flex gap-2">
        <input
          type="text"
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          placeholder={t("Nueva categoría")}
          className="border p-1 rounded flex-1"
        />
        <button onClick={handleAdd} className="bg-mia text-white px-4 rounded">
          {t("Agregar")}
        </button>
      </div>

      <ul className="bg-white rounded shadow divide-y">
        {categorias.map((cat) => (
          <li key={cat.id} className="p-2">{cat.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categorias;
