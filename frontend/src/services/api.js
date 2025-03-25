// ✅ src/services/api.js actualizado con funciones de preguntas

import axios from "axios";

const API = "https://mia-backend.onrender.com/api";

// Empleados
export const getEmpleados = () => axios.get(`${API}/empleados`);
export const addEmpleado = (data) => axios.post(`${API}/empleados`, data);
export const updateEmpleado = (data) => axios.put(`${API}/empleados`, data);

// Asignaciones
export const getAsignaciones = (dni) => axios.get(`${API}/asignaciones/${dni}`);
export const asignarEvaluados = (data) => axios.post(`${API}/asignaciones`, data);

// Niveles de acceso
export const getNivelesAcceso = () => axios.get(`${API}/niveles-acceso`);
export const addNivelAcceso = (data) => axios.post(`${API}/niveles-acceso`, data);
export const updateNivelAcceso = (data) => axios.put(`${API}/niveles-acceso`, data);

// Evaluación usuarios por evaluación
export const guardarEvaluadosPorEvaluacion = (evaluacionId, empleados) =>
  axios.post(`${API}/evaluaciones/${evaluacionId}/evaluados`, { empleados });
export const obtenerEvaluadosPorEvaluacion = (evaluacionId) =>
  axios.get(`${API}/evaluaciones/${evaluacionId}/evaluados`);

// Categorías
export const getCategorias = () => axios.get(`${API}/categorias`);
export const addCategoria = (data) => axios.post(`${API}/categorias`, data);

// Preguntas
export const getPreguntas = () => axios.get(`${API}/preguntas`);
export const addPregunta = (data) => axios.post(`${API}/preguntas`, data);
export const updatePregunta = (data) => axios.put(`${API}/preguntas`, data);
