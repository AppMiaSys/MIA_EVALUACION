import axios from "axios";

const API = axios.create({
  baseURL: "/api"
});

// === EMPLEADOS ===
export const getEmpleados = () => API.get("/empleados");
export const addEmpleado = (data) => API.post("/empleados", data);
export const updateEmpleado = (data) => API.put("/empleados", data);

// === CATEGORÍAS ===
export const getCategorias = () => API.get("/categorias");
export const addCategoria = (data) => API.post("/categorias", data);

// === PREGUNTAS ===
export const getPreguntas = () => API.get("/preguntas");
export const addPregunta = (data) => API.post("/preguntas", data);
export const updatePregunta = (data) => API.put("/preguntas", data);

// === NIVELES ===
export const getNiveles = () => API.get("/niveles");
export const addNivel = (data) => API.post("/niveles", data);
export const updateNivel = (data) => API.put("/niveles", data);

// === ASIGNACIONES ===
export const getAsignaciones = (dni) => API.get(`/asignaciones?dni=${dni}`);
export const saveAsignaciones = (data) => API.post("/asignaciones", data);

// === EVALUACIONES ===
export const enviarEvaluacion = (data) => API.post("/evaluaciones", data);
export const getEvaluaciones = () => API.get("/evaluaciones");
export const getResultadosPorEmpleado = (dni) =>
  API.get(`/empleado/resultados/${dni}`);
