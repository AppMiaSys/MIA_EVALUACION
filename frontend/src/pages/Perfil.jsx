// ✅ src/pages/Perfil.jsx

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Perfil = () => {
  const { t } = useTranslation();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [form, setForm] = useState({ ...usuario });

  useEffect(() => {
    if (usuario?.dni) {
      setForm({ ...usuario });
    }
  }, [usuario]);

  const handleSave = () => {
    localStorage.setItem("usuario", JSON.stringify(form));
    alert(t("Datos actualizados"));
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-mia">{t("Perfil del Usuario")}</h1>

      <input
        className="border p-2 w-full rounded"
        placeholder="Nombre"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />
      <input
        className="border p-2 w-full rounded"
        placeholder="Sucursal"
        value={form.sucursal}
        onChange={(e) => setForm({ ...form, sucursal: e.target.value })}
      />
      <input
        className="border p-2 w-full rounded"
        placeholder="Área"
        value={form.area}
        onChange={(e) => setForm({ ...form, area: e.target.value })}
      />

      <button
        onClick={handleSave}
        className="bg-mia text-white px-4 py-2 rounded"
      >
        {t("Guardar cambios")}
      </button>

      <button
        onClick={handleLogout}
        className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
      >
        {t("Cerrar sesión")}
      </button>
    </div>
  );
};

export default Perfil;
