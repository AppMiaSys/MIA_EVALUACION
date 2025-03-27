BEGIN TRANSACTION;
CREATE TABLE areas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT
);
CREATE TABLE asignaciones (
    evaluador_dni TEXT,
    evaluado_dni TEXT
);
CREATE TABLE categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    evaluacion_id INTEGER
);
CREATE TABLE empleados (
    dni TEXT PRIMARY KEY,
    nombre TEXT,
    sucursal TEXT,
    area TEXT,
    contrasena TEXT,
    nivel_acceso INTEGER
);
INSERT INTO "empleados" VALUES('45596517','Super Admin','Central','Administración','123456',1);
CREATE TABLE evaluacion_usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    evaluacion_id INTEGER,
    empleado_dni TEXT
);
CREATE TABLE evaluaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT
);
CREATE TABLE evaluaciones_resultado (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    evaluador_dni TEXT,
    evaluado_dni TEXT,
    evaluacion_id INTEGER,
    categoria_id INTEGER,
    pregunta_id INTEGER,
    puntuacion INTEGER,
    fecha TEXT
);
CREATE TABLE niveles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    puntaje INTEGER,
    evaluacion_id INTEGER
);
CREATE TABLE niveles_acceso (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    permisos TEXT
);
CREATE TABLE preguntas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT,
    categoria_id INTEGER,
    evaluacion_id INTEGER
);
CREATE TABLE sucursales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT
);
DELETE FROM "sqlite_sequence";
COMMIT;
