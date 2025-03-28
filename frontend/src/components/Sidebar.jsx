// ✅ src/components/Sidebar.jsx reorganizado por secciones

import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart2 } from "lucide-react";


const Sidebar = () => {
const menu = [
  { title: "Dashboard", to: "/dashboard" },
  {
    title: "Configuraciones",
    children: [
      { to: "/niveles-acceso", label: "Niveles de Acceso" },
      { to: "/empleados", label: "Usuarios" },
      { to: "/asignaciones", label: "Asignaciones" },
      { to: "/sucursales", label: "Sucursales" },
      { to: "/areas", label: "Áreas" },
    ],
  },
  {
    title: "Evaluaciones",
    children: [
      { to: "/evaluaciones-config", label: "Configuración de evaluaciones" },
      { to: "/categorias", label: "Categorías de preguntas" },
      { to: "/preguntas", label: "Preguntas" },
      { to: "/niveles", label: "Niveles de Evaluación" }, // ✅ agregado correctamente aquí
      { to: "/mis-evaluaciones", label: "Mis evaluaciones" },
      { to: "/evaluar", label: "Evaluar" },
    ],
  },
  { title: "Perfil", to: "/perfil" },
  { title: "Ayuda", to: "/ayuda" },
];
  return (
    <aside className="w-64 bg-white border-r p-4 space-y-2 overflow-y-auto">
      <h2 className="text-xl font-bold text-mia mb-4">Mia Evaluación</h2>

      {menu.map((item) =>
        item.children ? (
          <div key={item.title} className="mb-2">
            <h3 className="text-sm font-semibold text-gray-500 mb-1 px-2">{item.title}</h3>
            <div className="space-y-1">
              {item.children.map((child) => (
                <NavLink
                  key={child.to}
                  to={child.to}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded hover:bg-mia hover:text-white ${
                      isActive ? "bg-mia text-white" : "text-gray-700"
                    }`
                  }
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          </div>
        ) : (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-mia hover:text-white ${
                isActive ? "bg-mia text-white" : "text-gray-700"
              }`
            }
          >
            {item.title}
          </NavLink>
        )
      )}
    </aside>
  );
};

export default Sidebar;

