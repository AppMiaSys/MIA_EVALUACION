import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/mia-logo.svg";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (dni === "admin" && password === "admin123") {
      localStorage.setItem("usuario", JSON.stringify({ dni: "admin", nombre: "Administrador" }));
      navigate("/dashboard");
    } else {
      setError(t("DNI o contraseña incorrectos"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md space-y-4">
        <div className="text-center">
          <img src={logo} alt="Mia Logo" className="w-24 mx-auto mb-2" />
          <h1 className="text-xl font-bold text-mia">Mia Evaluación</h1>
          <p className="text-sm text-gray-500">{t("Tu evaluación mejora el futuro")}</p>
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <input
          type="text"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          placeholder={t("Contraseña")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-mia text-white py-2 rounded hover:opacity-90"
        >
          {t("Ingresar")}
        </button>
      </div>
    </div>
  );
};

export default Login;
