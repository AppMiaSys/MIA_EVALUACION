import React, { useEffect, useState } from "react";
import { getSucursales, addSucursal, updateSucursal, getAreas, addArea, updateArea } from "../services/api";
import { useTranslation } from "react-i18next";
import Sucursales from './Sucursales';
import Areas from './Areas';
import {
  ClipboardList,
  Settings,
  User,
  BarChart2,
  CircleHelp,
  Users,
  FileText,
  SquareCheckBig,
  LayoutDashboard,
  Building2,
  FileEdit,
  ListChecks,
  ScrollText,
  CircleUserRound
} from 'lucide-react';



const LocalesAreas = () => {;
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Locales y Áreas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Sucursales</h2>
          <Sucursales />
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Áreas</h2>
          <Areas />
        </div>
      </div>
    </div>
  );
};


  const cargarDatos = async () => {
    const [resSucursales, resAreas] = await Promise.all([
      getSucursales(),
      getAreas(),
    ]);
    setSucursales(resSucursales.data);
    setAreas(resAreas.data);
  };

  const guardarSucursal = async () => {
    if (!sucursalNombre.trim()) return;
    await addSucursal({ nombre: sucursalNombre });
    setSucursalNombre("");
    cargarDatos();
  };

  const guardarArea = async () => {
    if (!areaNombre.trim()) return;
    await addArea({ nombre: areaNombre });
    setAreaNombre("");
    cargarDatos();
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold text-mia">{t("Locales y Áreas")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold">{t("Sucursales")}</h2>
          <div className="flex gap-2 mb-2">
            <input
              value={sucursalNombre}
              onChange={(e) => setSucursalNombre(e.target.value)}
              placeholder={t("Nueva sucursal")}
              className="border p-2 rounded w-full"
            />
            <button onClick={guardarSucursal} className="bg-mia text-white px-4 rounded">
              {t("Agregar")}
            </button>
          </div>
          <ul className="divide-y bg-white rounded shadow">
            {sucursales.map((s) => (
              <li key={s.id} className="p-2">{s.nombre}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold">{t("Áreas")}</h2>
          <div className="flex gap-2 mb-2">
            <input
              value={areaNombre}
              onChange={(e) => setAreaNombre(e.target.value)}
              placeholder={t("Nueva área")}
              className="border p-2 rounded w-full"
            />
            <button onClick={guardarArea} className="bg-mia text-white px-4 rounded">
              {t("Agregar")}
            </button>
          </div>
          <ul className="divide-y bg-white rounded shadow">
            {areas.map((a) => (
              <li key={a.id} className="p-2">{a.nombre}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocalesAreas;
