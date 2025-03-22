CREATE TABLE IF NOT EXISTS usuarios (
    dni TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    nombre TEXT NOT NULL,
    rol TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS empleados (
    dni TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    sucursal TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS preguntas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria TEXT NOT NULL,
    texto TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS niveles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nivel TEXT NOT NULL,
    puntos INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS evaluaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    evaluador_dni TEXT,
    evaluado_dni TEXT,
    categoria TEXT,
    nivel TEXT,
    comentario TEXT,
    fecha TEXT
);

INSERT OR IGNORE INTO usuarios VALUES ('admin', 'admin123', 'Administrador General', 'admin');
INSERT OR IGNORE INTO usuarios VALUES ('12345678', 'empleado123', 'Empleado Demo', 'empleado');
INSERT OR IGNORE INTO empleados VALUES ('12345678', 'Empleado Demo', 'Sucursal A');
