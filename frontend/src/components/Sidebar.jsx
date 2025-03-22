import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BarChart2,
  ClipboardList,
  Settings,
  HelpCircle
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isActive = (path) => location.pathname.includes(path);

  const cambiarIdioma = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between font-inter">
      <div>
        <h1 className="text-2xl font-bold text-mia mb-6">Mia Evaluación</h1>
        <nav className="space-y-4 text-sm">
          <Link
            to="/app/dashboard"
            className={`flex items-center gap-2 ${isActive("dashboard") ? "text-mia font-semibold" : "text-gray-700"}`}
          >
            <BarChart2 size={18} /> {t("Dashboard")}
          </Link>
          <Link
            to="/app/evaluacion"
            className={`flex items-center gap-2 ${isActive("evaluacion") ? "text-mia font-semibold" : "text-gray-700"}`}
          >
            <ClipboardList size={18} /> {t("Evaluar")}
          </Link>
          <Link
            to="/app/configuracion"
            className={`flex items-center gap-2 ${isActive("configuracion") ? "text-mia font-semibold" : "text-gray-700"}`}
          >
            <Settings size={18} /> {t("Configuración")}
          </Link>
          <Link
            to="/app/ayuda"
            className={`flex items-center gap-2 ${isActive("ayuda") ? "text-mia font-semibold" : "text-gray-700"}`}
          >
            <HelpCircle size={18} /> {t("Ayuda")}
          </Link>
        </nav>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <p className="font-medium">{t("Idioma")}:</p>
        <div className="flex gap-3">
          <button onClick={() => cambiarIdioma("es")} className="hover:underline">ES</button>
          <button onClick={() => cambiarIdioma("en")} className="hover:underline">EN</button>
          <button onClick={() => cambiarIdioma("pt")} className="hover:underline">PT</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
