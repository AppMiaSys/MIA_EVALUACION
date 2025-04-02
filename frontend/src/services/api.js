import axios from "axios";

const API = "https://mia-backend.onrender.com/api";

// Empleados
export const getEmpleados = () => axios.get(`${API}/empleados`);
export const addEmpleado = (data) => axios.post(`${API}/empleados`, data);
export const updateEmpleado = (data) => axios.put(`${API}/empleados`, data);

// Asignaciones
export const getAsignaciones = (dni) => axios.get(`${API}/asignaciones/${dni}`);
export const postAsignaciones = (data) => axios.post(`${API}/asignaciones`, data);

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
export const getCategoriasByEvaluacion = (evaluacionId) =>
  axios.get(`${API}/evaluaciones/${evaluacionId}/categorias`);

// Preguntas
export const getPreguntas = () => axios.get(`${API}/preguntas`);
export const addPregunta = (data) => axios.post(`${API}/preguntas`, data);
export const updatePregunta = (data) => axios.put(`${API}/preguntas`, data);
export const getPreguntasByEvaluacion = (evaluacionId) =>
  axios.get(`${API}/evaluaciones/${evaluacionId}/preguntas`);

// Niveles de calificación
export const getNiveles = () => axios.get(`${API}/niveles`);
export const addNivel = (data) => axios.post(`${API}/niveles`, data);
export const updateNivel = (data) => axios.put(`${API}/niveles`, data);
export const getNivelesByEvaluacion = (evaluacionId) =>
  axios.get(`${API}/evaluaciones/${evaluacionId}/niveles`);

// Evaluaciones
export const enviarEvaluacion = (data) => axios.post(`${API}/evaluaciones`, data);
export const getEvaluaciones = () => axios.get(`${API}/evaluaciones`);
export const addEvaluacion = (data) => axios.post(`${API}/evaluaciones/nueva`, data);
export async function updateEvaluacion(id, data) {
  const response = await axios.put(`${BASE_URL}/evaluaciones/${id}`, data);
  return response.data;
}


// Sucursales
export const getSucursales = () => axios.get(`${API}/sucursales`).then(res => res.data);
export const addSucursal = (data) => axios.post(`${API}/sucursales`, data);
export const updateSucursal = (data) => axios.put(`${API}/sucursales`, data);
export const deleteSucursal = (id) => axios.delete(`${API}/sucursales/${id}`);

// Áreas
export const getAreas = () => axios.get(`${API}/areas`).then(res => res.data);
export const addArea = (data) => axios.post(`${API}/areas`, data);
export const updateArea = (data) => axios.put(`${API}/areas`, data);
export const deleteArea = (id) => axios.delete(`${API}/areas/${id}`);


