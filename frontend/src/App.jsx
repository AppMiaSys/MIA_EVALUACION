// ✅ src/App.jsx actualizado con sesión reactiva

import React, { useEffect, useState } from "react";
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
import Login from "./pages/Login";

const App = () => {
  const [usuario, setUsuario] = useState(() => JSON.parse(localStorage.getItem("usuario")));

  useEffect(() => {
    const listener = () => {
      const user = JSON.parse(localStorage.getItem("usuario"));
      setUsuario(user);
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, []);

  return (
    <Router>
      {usuario ? (
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-4">
            <Routes>
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
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
