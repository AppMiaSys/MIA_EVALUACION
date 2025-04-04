import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/mia-logo.svg";
import { API } from "../services/api";

const Login = () => {
  const { t } = useTranslation();
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await fetch(API+"/empleados");
      const data = await res.json();
      const usuario = data.find(
        (u) => u.dni === dni && u.contrasena === password
      );
      if (usuario) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
        window.location.reload(); // ✅ fuerza recarga para que App.jsx reconozca sesión
      } else {
        setError(t("DNI o contraseña incorrectos"));
      }
    } catch {
      setError(t("Error al iniciar sesión"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md space-y-4">
        <div className="text-center">
          <img src={logo} alt="Mia Logo" className="w-24 mx-auto mb-2" />
          <h1 className="text-xl font-bold text-mia">Mia Evaluación</h1>
          <p className="text-sm text-gray-500">
            {t("Tu evaluación mejora el futuro")}
          </p>
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
