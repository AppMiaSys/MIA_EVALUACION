// ✅ src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Empleados from "./pages/Empleados";
import Categorias from "./pages/Categorias";
import Preguntas from "./pages/Preguntas";
import Niveles from "./pages/Niveles";
import Asignaciones from "./pages/Asignaciones";
import Evaluacion from "./pages/Evaluacion";
import MisEvaluaciones from "./pages/MisEvaluaciones";
import Perfil from "./pages/Perfil";
import NivelesAcceso from "./pages/NivelesAcceso";
import Ayuda from "./pages/Ayuda";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/preguntas" element={<Preguntas />} />
            <Route path="/niveles" element={<Niveles />} />
            <Route path="/asignaciones" element={<Asignaciones />} />
            <Route path="/evaluar" element={<Evaluacion />} />
            <Route path="/mis-evaluaciones" element={<MisEvaluaciones />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/niveles-acceso" element={<NivelesAcceso />} />
            <Route path="/ayuda" element={<Ayuda />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
