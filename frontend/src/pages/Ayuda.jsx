import React from "react";
import { useTranslation } from "react-i18next";

const Ayuda = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-mia">{t("Preguntas Frecuentes / Ayuda")}</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-lg">{t("¿Cómo ingreso al sistema?")}</h2>
        <p>{t("Utiliza tu DNI y contraseña proporcionada por el administrador.")}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-lg">{t("¿Cómo realizo una evaluación?")}</h2>
        <p>{t("Dirígete a la sección 'Realizar Evaluación', elige al colaborador y responde cada pregunta.")}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-lg">{t("¿Puedo cambiar de idioma?")}</h2>
        <p>{t("Sí, en la parte superior derecha puedes cambiar entre Español, Inglés y Portugués.")}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-lg">{t("¿Qué pasa después de evaluar?")}</h2>
        <p>{t("Una vez enviada tu evaluación, se notificará al administrador y se guardará en el historial.")}</p>
      </div>
    </div>
  );
};

export default Ayuda;
