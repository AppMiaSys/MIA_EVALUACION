import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/login", { dni, password });
      const { role, nombre } = res.data;
      localStorage.setItem("usuario", JSON.stringify({ dni, role, nombre }));
      navigate("/app/dashboard");
    } catch (err) {
      setError(t("Credenciales incorrectas"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mia-yellow p-6">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-sm w-full space-y-4 text-center">
        <img src="/logo.svg" alt="Logo Mia" className="h-14 mx-auto" />
        <h2 className="text-2xl font-bold text-mia">{t("Iniciar sesión")}</h2>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input
          type="text"
          placeholder={t("DNI")}
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder={t("Contraseña")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-mia text-white py-2 rounded hover:opacity-90"
        >
          {t("Ingresar")}
        </button>
        <p className="text-xs mt-2 text-gray-600">
          {t("Bienvenido al sistema de evaluación de desempeño de Mia")}
        </p>
      </div>
    </div>
  );
};

export default Login;

