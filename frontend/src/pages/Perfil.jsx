// ✅ src/pages/Perfil.jsx

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Perfil = () => {
  const { t } = useTranslation();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const [perfil, setPerfil] = useState(usuario);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil({ ...perfil, [name]: value });
  };

  const handleGuardar = () => {
    localStorage.setItem("usuario", JSON.stringify(perfil));
    alert(t("Perfil actualizado"));
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-mia">{t("Mi Perfil")}</h1>

      <input
        type="text"
        name="nombre"
        value={perfil.nombre || ""}
        onChange={handleChange}
        placeholder={t("Nombre completo")}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        name="sucursal"
        value={perfil.sucursal || ""}
        onChange={handleChange}
        placeholder={t("Sucursal")}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        name="area"
        value={perfil.area || ""}
        onChange={handleChange}
        placeholder={t("Área")}
        className="border p-2 rounded w-full"
      />

      <button onClick={handleGuardar} className="bg-mia text-white px-4 py-2 rounded">
        {t("Guardar cambios")}
      </button>

      <button
        onClick={handleCerrarSesion}
        className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
      >
        {t("Cerrar sesión")}
      </button>
    </div>
  );
};

export default Perfil;
