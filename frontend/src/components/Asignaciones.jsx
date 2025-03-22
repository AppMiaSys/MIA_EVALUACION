import React, { useState, useEffect } from "react";
import { getAsignaciones, saveAsignaciones } from "../services/api";
import { useTranslation } from "react-i18next";

const Asignaciones = ({ empleados }) => {
  const { t } = useTranslation();
  const [dniSeleccionado, setDniSeleccionado] = useState("");
  const [asignados, setAsignados] = useState([]);
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    if (dniSeleccionado) {
      cargarAsignaciones(dniSeleccionado);
    } else {
      setAsignados([]);
    }
  }, [dniSeleccionado]);

  const cargarAsignaciones = async (dni) => {
    const res = await getAsignaciones(dni);
    setAsignados(res.data || []);
  };

  const toggleAsignado = (dni) => {
    if (asignados.includes(dni)) {
      setAsignados(asignados.filter((e) => e !== dni));
    } else {
      setAsignados([...asignados, dni]);
    }
  };

  const handleGuardar = async () => {
    await saveAsignaciones({
      evaluador_dni: dniSeleccionado,
      evaluado_dnis: asignados
    });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  return (
    <div className="space-y-4">
      <select
        className="border p-2 rounded w-full md:w-auto"
        value={dniSeleccionado}
        onChange={(e) => setDniSeleccionado(e.target.value)}
      >
        <option value="">{t("Seleccione un evaluador")}</option>
        {empleados.map((e) => (
          <option key={e.dni} value={e.dni}>
            {e.nombre} ({e.dni})
          </option>
        ))}
      </select>

      {dniSeleccionado && (
        <div className="bg-white p-4 rounded shadow space-y-2">
          <h4 className="font-medium">{t("Selecciona a quién puede evaluar")}:</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {empleados
              .filter((e) => e.dni !== dniSeleccionado)
              .map((e) => (
                <li key={e.dni}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={asignados.includes(e.dni)}
                      onChange={() => toggleAsignado(e.dni)}
                    />
                    {e.nombre} ({e.dni})
                  </label>
                </li>
              ))}
          </ul>

          <button
            onClick={handleGuardar}
            className="mt-2 bg-mia text-white px-4 py-1 rounded"
          >
            {t("Guardar asignaciones")}
          </button>

          {guardado && (
            <p className="text-green-600 mt-2">{t("Asignaciones guardadas con éxito")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Asignaciones;
