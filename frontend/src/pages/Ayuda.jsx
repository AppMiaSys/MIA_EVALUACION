import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Ayuda = () => {
  const { t } = useTranslation();
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchAyuda = async () => {
      const res = await axios.get("/api/ayuda");
      setMensaje(res.data.mensaje);
    };
    fetchAyuda();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[#C10B67]">{t("Centro de Ayuda")}</h1>

      <p className="text-gray-700">{mensaje}</p>

      <div className="space-y-4 mt-6">
        <h2 className="text-lg font-semibold">{t("Preguntas Frecuentes")}</h2>

        <div>
          <p className="font-semibold">{t("¿Cómo inicio sesión?")}</p>
          <p className="text-sm text-gray-600">{t("Usa tu número de DNI y tu contraseña entregada por RRHH.")}</p>
        </div>

        <div>
          <p className="font-semibold">{t("¿A quién debo evaluar?")}</p>
          <p className="text-sm text-gray-600">{t("Solo aparecerán las personas asignadas a ti por tu jefe o área.")}</p>
        </div>

        <div>
          <p className="font-semibold">{t("¿Qué hago si olvidé mi contraseña?")}</p>
          <p className="text-sm text-gray-600">{t("Comunícate con soporte@mia.com o acércate al área de sistemas.")}</p>
        </div>

        <div>
          <p className="font-semibold">{t("¿Puedo editar una evaluación enviada?")}</p>
          <p className="text-sm text-gray-600">{t("No. Una vez enviada, la evaluación queda registrada.")}</p>
        </div>
      </div>
    </div>
  );
};

export default Ayuda;
