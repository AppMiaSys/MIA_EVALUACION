import { useEffect, useState } from "react";
import { getAreas, addArea, updateArea } from "../services/api";

export default function Areas() {
  const [areas, setAreas] = useState([]);
  const [form, setForm] = useState({ id: null, nombre: "" });

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await getAreas();
    setAreas(res.data);
  };

  const guardar = async () => {
    if (!form.nombre) return;
    if (form.id) await updateArea(form);
    else await addArea(form);
    setForm({ id: null, nombre: "" });
    cargar();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Áreas</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          placeholder="Nombre de área"
          className="border p-2 rounded w-full"
        />
        <button onClick={guardar} className="bg-mia text-white px-4 py-2 rounded">
          {form.id ? "Actualizar" : "Agregar"}
        </button>
      </div>
      <ul className="bg-white border rounded divide-y">
        {areas.map((a) => (
          <li key={a.id} className="p-2 flex justify-between">
            {a.nombre}
            <button onClick={() => setForm(a)} className="text-blue-600 text-sm">Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
