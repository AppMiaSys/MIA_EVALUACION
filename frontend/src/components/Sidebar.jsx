// ✅ src/components/Sidebar.jsx

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 bg-white border-r shadow-sm h-full p-4">
      <h2 className="text-xl font-bold text-mia mb-4">Mia Evaluación</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/dashboard" className="hover:text-mia">Dashboard</Link>
        <Link to="/empleados" className="hover:text-mia">Empleados</Link>
        <Link to="/categorias" className="hover:text-mia">Categorías</Link>
        <Link to="/preguntas" className="hover:text-mia">Preguntas</Link>
        <Link to="/niveles" className="hover:text-mia">Niveles</Link>
        <Link to="/asignaciones" className="hover:text-mia">Asignaciones</Link>
        <Link to="/evaluar" className="hover:text-mia">Realizar Evaluación</Link>
        <Link to="/mis-evaluaciones" className="hover:text-mia">Mis Evaluaciones</Link>
        <Link to="/perfil" className="hover:text-mia">Mi Perfil</Link>
        <Link to="/niveles-acceso" className="hover:text-mia">Niveles de Acceso</Link>
        <Link to="/ayuda" className="hover:text-mia">Ayuda</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
