import axios from "axios";

const API = "https://mia-backend.onrender.com/api"; // Cambiar si estás en local

export const getEmpleados = async () => axios.get(`${API}/empleados`);
export const addEmpleado = async (data) => axios.post(`${API}/empleados`, data);
export const updateEmpleado = async (data) => axios.put(`${API}/empleados`, data);

export const getCategorias = async () => axios.get(`${API}/categorias`);
export const addCategoria = async (data) => axios.post(`${API}/categorias`, data);

export const getPreguntas = async () => axios.get(`${API}/preguntas`);
export const addPregunta = async (data) => axios.post(`${API}/preguntas`, data);
export const updatePregunta = async (data) => axios.put(`${API}/preguntas`, data);

export const getNiveles = async () => axios.get(`${API}/niveles`);
export const addNivel = async (data) => axios.post(`${API}/niveles`, data);
export const updateNivel = async (data) => axios.put(`${API}/niveles`, data);

export const getAsignaciones = async (dni) => axios.get(`${API}/asignaciones/${dni}`);
export const asignarEvaluados = async (evaluador, evaluados) =>
  axios.post(`${API}/asignaciones`, { evaluador, evaluados });

export const enviarEvaluacion = async (data) => axios.post(`${API}/evaluacion`, data);
export const getResultadosPorEmpleado = async (dni) => axios.get(`${API}/resultados/${dni}`);
