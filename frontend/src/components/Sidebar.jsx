// ✅ src/components/Sidebar.jsx actualizado para incluir Evaluaciones Config

import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/empleados", label: "Empleados" },
    { to: "/categorias", label: "Categorías" },
    { to: "/preguntas", label: "Preguntas" },
    { to: "/niveles", label: "Niveles" },
    { to: "/asignaciones", label: "Asignaciones" },
    { to: "/evaluar", label: "Evaluar" },
    { to: "/mis-evaluaciones", label: "Mis Evaluaciones" },
    { to: "/perfil", label: "Perfil" },
    { to: "/niveles-acceso", label: "Niveles de Acceso" },
    { to: "/evaluaciones-config", label: "Evaluaciones Config" }, // ✅ nueva opción
    { to: "/ayuda", label: "Ayuda" }
  ];

  return (
    <aside className="w-64 bg-white border-r p-4 space-y-2">
      <h2 className="text-xl font-bold text-mia mb-4">Mia Evaluación</h2>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-mia hover:text-white ${
              isActive ? "bg-mia text-white" : "text-gray-700"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
