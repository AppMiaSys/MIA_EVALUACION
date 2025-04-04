import axios from "axios";

const BASE_URL = "https://mia-backend.onrender.com/api";

// -----------------------------
// EVALUACIONES
// -----------------------------
export const getEvaluaciones = () => axios.get(`${BASE_URL}/evaluaciones`);

export const addEvaluacion = (data) =>
  axios.post(`${BASE_URL}/evaluaciones/nueva`, data);

export const updateEvaluacion = (id, data) =>
  axios.put(`${BASE_URL}/evaluaciones/${id}`, data);

export const deleteEvaluacion = (id) =>
  axios.delete(`${BASE_URL}/evaluaciones/${id}`);

// -----------------------------

// -----------------------------
// ASIGNACIONES
// -----------------------------
export const getAsignaciones = (dni) =>
  axios.get(`${BASE_URL}/asignaciones/${dni}`);

export const postAsignaciones = (data) =>
  axios.post(`${BASE_URL}/asignaciones`, data);

// EMPLEADOS
// -----------------------------
export const getEmpleados = () => axios.get(`${BASE_URL}/empleados`);

export const addEmpleado = (data) => axios.post(`${BASE_URL}/empleados`, data);

export const updateEmpleado = (data) => axios.put(`${BASE_URL}/empleados`, data);

// -----------------------------
// NIVELES DE ACCESO
// -----------------------------
export const getNivelesAcceso = () =>
  axios.get(`${BASE_URL}/niveles-acceso`);

export const addNivelAcceso = (data) =>
  axios.post(`${BASE_URL}/niveles-acceso`, data);

export const updateNivelAcceso = (data) =>
  axios.put(`${BASE_URL}/niveles-acceso`, data);

// -----------------------------
// SUCURSALES Y ÁREAS
// -----------------------------
export const getSucursales = () => axios.get(`${BASE_URL}/sucursales`);
export const addSucursal = (data) => axios.post(`${BASE_URL}/sucursales`, data);
export const updateSucursal = (data) =>
  axios.put(`${BASE_URL}/sucursales`, data);

export const getAreas = () => axios.get(`${BASE_URL}/areas`);
export const addArea = (data) => axios.post(`${BASE_URL}/areas`, data);
export const updateArea = (data) => axios.put(`${BASE_URL}/areas`, data);

// -----------------------------
// PREGUNTAS Y CATEGORÍAS
// -----------------------------
export const getPreguntas = () => axios.get(`${BASE_URL}/preguntas`);
export const addPregunta = (data) => axios.post(`${BASE_URL}/preguntas`, data);
export const updatePregunta = (data) =>
  axios.put(`${BASE_URL}/preguntas`, data);

export const getCategorias = () => axios.get(`${BASE_URL}/categorias`);
export const addCategoria = (data) =>
  axios.post(`${BASE_URL}/categorias`, data);

// -----------------------------
// NIVELES DE CALIFICACIÓN
// -----------------------------
export const getNiveles = () => axios.get(`${BASE_URL}/niveles`);
export const addNivel = (data) => axios.post(`${BASE_URL}/niveles`, data);
export const updateNivel = (data) => axios.put(`${BASE_URL}/niveles`, data);
