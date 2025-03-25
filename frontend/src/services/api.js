// ✅ src/services/api.js actualizado con funciones para evaluaciones configurables

import axios from "axios";

const API = "https://mia-backend.onrender.com/api";

// Empleados
export const getEmpleados = () => axios.get(`${API}/empleados`);
export const addEmpleado = (data) => axios.post(`${API}/empleados`, data);
export const updateEmpleado = (data) => axios.put(`${API}/empleados`, data);

// Categorías
export const getCategorias = () => axios.get(`${API}/categorias`);
export const addCategoria = (data) => axios.post(`${API}/categorias`, data);
export const updateCategoria = (data) => axios.put(`${API}/categorias`, data);

// Preguntas
export const getPreguntas = () => axios.get(`${API}/preguntas`);
export const addPregunta = (data) => axios.post(`${API}/preguntas`, data);
export const updatePregunta = (data) => axios.put(`${API}/preguntas`, data);

// Niveles
export const getNiveles = () => axios.get(`${API}/niveles`);
export const addNivel = (data) => axios.post(`${API}/niveles`, data);
export const updateNivel = (data) => axios.put(`${API}/niveles`, data);

// Asignaciones
export const getAsignaciones = (dni) => axios.get(`${API}/asignaciones/${dni}`);
export const asignarEvaluados = (data) => axios.post(`${API}/asignaciones`, data);

// Evaluaciones realizadas
export const enviarEvaluacion = (data) => axios.post(`${API}/evaluaciones`, data);
export const getResultadosPorEmpleado = (dni) => axios.get(`${API}/resultados/${dni}`);

// Niveles de acceso
export const getNivelesAcceso = () => axios.get(`${API}/niveles-acceso`);
export const addNivelAcceso = (data) => axios.post(`${API}/niveles-acceso`, data);
export const updateNivelAcceso = (data) => axios.put(`${API}/niveles-acceso`, data);

// Evaluaciones configurables
export const getEvaluaciones = () => axios.get(`${API}/evaluaciones`);
export const addEvaluacion = (data) => axios.post(`${API}/evaluaciones`, data);
export const getCategoriasByEvaluacion = (id) => axios.get(`${API}/categorias/${id}`);
export const getPreguntasByEvaluacion = (id) => axios.get(`${API}/preguntas/${id}`);
export const getNivelesByEvaluacion = (id) => axios.get(`${API}/niveles/${id}`);

// ✅ src/services/api.js actualizado

import axios from "axios";

const API = "https://mia-backend.onrender.com/api";

export const getEmpleados = () => axios.get(`${API}/empleados`);
export const addEmpleado = (data) => axios.post(`${API}/empleados`, data);
export const updateEmpleado = (data) => axios.put(`${API}/empleados`, data);

export const getNivelesAcceso = () => axios.get(`${API}/niveles-acceso`);
export const addNivelAcceso = (data) => axios.post(`${API}/niveles-acceso`, data);
export const updateNivelAcceso = (data) => axios.put(`${API}/niveles-acceso`, data);

export const getAsignaciones = (dni) => axios.get(`${API}/asignaciones/${dni}`);
export const guardarAsignaciones = (data) => axios.post(`${API}/asignaciones`, data);

// Evaluaciones (futuro si se desea guardar evaluados seleccionados)
// export const guardarEvaluadosPorEvaluacion = (idEvaluacion, data) => axios.post(`${API}/evaluaciones/${idEvaluacion}/evaluados`, data);
