import axios from "axios";

// Base de usuario logueado
const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

// Login
export const login = (credenciales) => axios.post("/api/login", credenciales);

// Evaluaciones
export const enviarEvaluacion = (evaluacion) => axios.post("/api/evaluaciones", evaluacion);
export const obtenerEvaluaciones = () => axios.get("/api/evaluaciones");

// Configuración
export const obtenerPreguntas = () => axios.get("/api/preguntas");
export const agregarPregunta = (data) => axios.post("/api/preguntas", data);

export const obtenerNiveles = () => axios.get("/api/niveles");
export const agregarNivel = (data) => axios.post("/api/niveles", data);

export const obtenerEmpleados = () => axios.get("/api/empleados");
export const agregarEmpleado = (data) => axios.post("/api/empleados", data);

// Dashboard
export const obtenerDashboard = () => axios.get("/api/dashboard");

// Ayuda
export const obtenerAyuda = () => axios.get("/api/ayuda");

// Idiomas
export const obtenerIdiomas = () => axios.get("/api/idiomas");
