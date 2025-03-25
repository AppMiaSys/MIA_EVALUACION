// ✅ src/pages/Ayuda.jsx

import React from "react";
import { useTranslation } from "react-i18next";

const Ayuda = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-mia">{t("Preguntas Frecuentes")}</h1>

      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">{t("¿Cómo ingreso al sistema?")}</h2>
          <p>{t("Utiliza tu DNI y la contraseña proporcionada por el administrador para iniciar sesión.")}</p>
        </div>

        <div>
          <h2 className="font-semibold">{t("¿Cómo realizo una evaluación?")}</h2>
          <p>{t("Accede a la opción 'Realizar Evaluación', selecciona al colaborador y responde las preguntas.")}</p>
        </div>

        <div>
          <h2 className="font-semibold">{t("¿Qué pasa si no veo a quién debo evaluar?")}</h2>
          <p>{t("Comunícate con tu administrador para validar tus asignaciones.")}</p>
        </div>

        <div>
          <h2 className="font-semibold">{t("¿Cómo cambio el idioma?")}</h2>
          <p>{t("Puedes seleccionar el idioma en la parte superior derecha del sistema.")}</p>
        </div>
      </div>
    </div>
  );
};

export default Ayuda;
