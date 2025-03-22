import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // IMPORTANTE para cargar estilos
import App from "./App";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Evaluacion from "./pages/Evaluacion";
import Configuracion from "./pages/Configuracion";
import Ayuda from "./pages/Ayuda";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./i18n"; // Para idiomas

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<App />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="evaluacion" element={<Evaluacion />} />
          <Route path="configuracion" element={<Configuracion />} />
          <Route path="ayuda" element={<Ayuda />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
