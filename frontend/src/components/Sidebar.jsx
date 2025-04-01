import { Home, Settings, Users, ClipboardList, LayoutList, BookOpenCheck, UserCheck, BarChart2, HelpCircle, MapPin, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { HomeIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SidebarItem } from './SidebarItem' // <== aquí podría faltar el ;

const Sidebar = () => { label: "Locales y Áreas", icon: <HomeIcon />, path: "/locales-areas";
  return (
    <div className="bg-[#C10B67] text-white w-64 min-h-screen p-4 text-sm">
      <h2 className="text-xl font-bold mb-6">Mia Evaluación</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="flex items-center space-x-2 hover:underline">
            <Home size={18} /> <span>Dashboard</span>
          </Link>
        </li>

        <li className="mt-4 font-semibold">Configuraciones</li>
        <li>
          <Link to="/niveles-acceso" className="flex items-center space-x-2 hover:underline">
            <Settings size={18} /> <span>Niveles de Acceso</span>
          </Link>
        </li>
        <li>
          <Link to="/empleados" className="flex items-center space-x-2 hover:underline">
            <Users size={18} /> <span>Usuarios</span>
          </Link>
        </li>
        <li>
          <Link to="/asignaciones" className="flex items-center space-x-2 hover:underline">
            <ClipboardList size={18} /> <span>Asignaciones</span>
          </Link>
        </li>
        <li>
          <Link to="/locales-areas" className="flex items-center space-x-2 hover:underline">
            <MapPin size={18} /> <span>Locales y Áreas</span>
          </Link>
        </li>

        <li className="mt-4 font-semibold">Evaluaciones</li>
        <li>
          <Link to="/evaluaciones-config" className="flex items-center space-x-2 hover:underline">
            <LayoutList size={18} /> <span>Configuración de Evaluaciones</span>
          </Link>
        </li>
        <li>
          <Link to="/categorias" className="flex items-center space-x-2 hover:underline">
            <Layers size={18} /> <span>Categorías de Preguntas</span>
          </Link>
        </li>
        <li>
          <Link to="/preguntas" className="flex items-center space-x-2 hover:underline">
            <BookOpenCheck size={18} /> <span>Preguntas</span>
          </Link>
        </li>
        <li>
          <Link to="/mis-evaluaciones" className="flex items-center space-x-2 hover:underline">
            <UserCheck size={18} /> <span>Mis Evaluaciones</span>
          </Link>
        </li>
        <li>
          <Link to="/evaluacion" className="flex items-center space-x-2 hover:underline">
            <BarChart2 size={18} /> <span>Evaluar</span>
          </Link>
        </li>

        <li className="mt-4 font-semibold">Perfil</li>
        <li>
          <Link to="/perfil" className="flex items-center space-x-2 hover:underline">
            <Users size={18} /> <span>Mi Perfil</span>
          </Link>
        </li>

        <li className="mt-4 font-semibold">Ayuda</li>
        <li>
          <Link to="/ayuda" className="flex items-center space-x-2 hover:underline">
            <HelpCircle size={18} /> <span>Ayuda</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
