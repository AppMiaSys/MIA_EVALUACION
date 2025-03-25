// ✅ src/services/api.js actualizado

import axios from "axios";

const API = "https://mia-backend.onrender.com/api";

export const getEmpleados = () => axios.get(`${API}/empleados`);
export const addEmpleado = (data) => axios.post(`${API}/empleados`, data);
export const updateEmpleado = (data) => axios.put(`${API}/empleados`, data);

export const getCategorias = () => axios.get(`${API}/categorias`);
export const addCategoria = (data) => axios.post(`${API}/categorias`, data);
export const updateCategoria = (data) => axios.put(`${API}/categorias`, data);

export const getPreguntas = () => axios.get(`${API}/preguntas`);
export const addPregunta = (data) => axios.post(`${API}/preguntas`, data);
export const updatePregunta = (data) => axios.put(`${API}/preguntas`, data);

export const getNiveles = () => axios.get(`${API}/niveles`);
export const addNivel = (data) => axios.post(`${API}/niveles`, data);
export const updateNivel = (data) => axios.put(`${API}/niveles`, data);

export const getAsignaciones = (dni) => axios.get(`${API}/asignaciones/${dni}`);
export const asignarEvaluados = (data) => axios.post(`${API}/asignaciones`, data);

export const enviarEvaluacion = (data) => axios.post(`${API}/evaluaciones`, data);
export const getResultadosPorEmpleado = (dni) => axios.get(`${API}/resultados/${dni}`);

export const getNivelesAcceso = () => axios.get(`${API}/niveles-acceso`);
export const addNivelAcceso = (data) => axios.post(`${API}/niveles-acceso`, data);
export const updateNivelAcceso = (data) => axios.put(`${API}/niveles-acceso`, data);

