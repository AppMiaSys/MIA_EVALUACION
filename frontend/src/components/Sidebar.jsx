import { LayoutDashboard, Settings, Users, ListChecks, FolderKanban, ClipboardCheck, FileSignature, UserCheck, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import miaLogo from '../assets/mia-logo.svg';

const menu = [
  { title: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard size={18} /> },
  {
    title: 'Configuraciones',
    children: [
      { to: '/niveles-acceso', label: 'Niveles de Acceso', icon: <Settings size={18} /> },
      { to: '/empleados', label: 'Usuarios', icon: <Users size={18} /> },
      { to: '/asignaciones', label: 'Asignaciones', icon: <ListChecks size={18} /> },
      { to: '/sucursales', label: 'Sucursales', icon: <FolderKanban size={18} /> },
      { to: '/areas', label: 'Áreas', icon: <FolderKanban size={18} /> },
    ]
  },
  {
    title: 'Evaluaciones',
    children: [
      { to: '/evaluaciones-config', label: 'Configuración de evaluaciones', icon: <Settings size={18} /> },
      { to: '/categorias', label: 'Categorías de preguntas', icon: <ListChecks size={18} /> },
      { to: '/preguntas', label: 'Preguntas', icon: <ClipboardCheck size={18} /> },
      { to: '/niveles', label: 'Niveles de Evaluación', icon: <ClipboardCheck size={18} /> },
      { to: '/mis-evaluaciones', label: 'Mis evaluaciones', icon: <UserCheck size={18} /> },
      { to: '/evaluar', label: 'Evaluar', icon: <FileSignature size={18} /> },
    ]
  },
  { title: 'Perfil', to: '/perfil', icon: <Users size={18} /> },
  { title: 'Ayuda', to: '/ayuda', icon: <HelpCircle size={18} /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-full md:w-64 bg-[#C10B67] text-white min-h-screen p-4">
      <div className="flex items-center mb-6">
        <img src={miaLogo} alt="Logo Mia" className="h-10 mr-2" />
        <h1 className="text-xl font-bold">Mia Evaluación</h1>
      </div>
      <nav>
        <ul className="space-y-4">
          {menu.map((item, idx) => (
            <li key={idx}>
              {item.children ? (
                <div>
                  <p className="uppercase text-sm font-semibold text-yellow-200 mb-1">{item.title}</p>
                  <ul className="ml-2 space-y-2">
                    {item.children.map((sub, i) => (
                      <li key={i}>
                        <Link to={sub.to} className={`flex items-center space-x-2 px-2 py-1 rounded hover:bg-[#a10b57] transition ${location.pathname === sub.to ? 'bg-[#a10b57]' : ''}`}>
                          {sub.icon}
                          <span>{sub.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link to={item.to} className={`flex items-center space-x-2 px-2 py-2 rounded hover:bg-[#a10b57] transition ${location.pathname === item.to ? 'bg-[#a10b57]' : ''}`}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
