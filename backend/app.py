from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sqlite3

app = Flask(__name__)
CORS(app)

DB_PATH = "mia_evaluacion.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    conn = get_db()
    user = conn.execute("SELECT * FROM usuarios WHERE dni = ? AND password = ?", (data['dni'], data['password'])).fetchone()
    conn.close()
    if user:
        return jsonify({"success": True, "role": user['rol'], "nombre": user['nombre']})
    return jsonify({"success": False}), 401

@app.route("/api/evaluaciones", methods=["GET", "POST"])
def evaluaciones():
    conn = get_db()
    if request.method == "POST":
        data = request.json
        conn.execute("INSERT INTO evaluaciones (evaluador_dni, evaluado_dni, categoria, nivel, comentario, fecha) VALUES (?, ?, ?, ?, ?, ?)",
                     (data['evaluador_dni'], data['evaluado_dni'], data['categoria'], data['nivel'], data['comentario'], data['fecha']))
        conn.commit()
        return jsonify({"status": "Evaluación registrada"})
    else:
        rows = conn.execute("SELECT * FROM evaluaciones").fetchall()
        conn.close()
        return jsonify([dict(r) for r in rows])

@app.route("/api/preguntas", methods=["GET", "POST"])
def preguntas():
    conn = get_db()
    if request.method == "POST":
        data = request.json
        conn.execute("INSERT INTO preguntas (categoria, texto) VALUES (?, ?)", (data['categoria'], data['texto']))
        conn.commit()
        return jsonify({"status": "Pregunta creada"})
    preguntas = conn.execute("SELECT * FROM preguntas").fetchall()
    conn.close()
    return jsonify([dict(p) for p in preguntas])

@app.route("/api/niveles", methods=["GET", "POST"])
def niveles():
    conn = get_db()
    if request.method == "POST":
        data = request.json
        conn.execute("INSERT INTO niveles (nivel, puntos) VALUES (?, ?)", (data['nivel'], data['puntos']))
        conn.commit()
        return jsonify({"status": "Nivel creado"})
    niveles = conn.execute("SELECT * FROM niveles").fetchall()
    conn.close()
    return jsonify([dict(n) for n in niveles])

@app.route("/api/empleados", methods=["GET", "POST"])
def empleados():
    conn = get_db()
    if request.method == "POST":
        data = request.json
        conn.execute("INSERT INTO empleados (dni, nombre, sucursal) VALUES (?, ?, ?)", (data['dni'], data['nombre'], data['sucursal']))
        conn.commit()
        return jsonify({"status": "Empleado agregado"})
    empleados = conn.execute("SELECT * FROM empleados").fetchall()
    conn.close()
    return jsonify([dict(e) for e in empleados])

@app.route("/api/dashboard", methods=["GET"])
def dashboard():
    conn = get_db()
    por_categoria = conn.execute("""
        SELECT categoria, AVG(n.puntos) AS promedio
        FROM evaluaciones e
        JOIN niveles n ON e.nivel = n.nivel
        GROUP BY categoria
    """).fetchall()

    por_empleado = conn.execute("""
        SELECT evaluado_dni, AVG(n.puntos) AS promedio
        FROM evaluaciones e
        JOIN niveles n ON e.nivel = n.nivel
        GROUP BY evaluado_dni
    """).fetchall()

    por_sucursal = conn.execute("""
        SELECT emp.sucursal, AVG(n.puntos) AS promedio
        FROM evaluaciones e
        JOIN empleados emp ON e.evaluado_dni = emp.dni
        JOIN niveles n ON e.nivel = n.nivel
        GROUP BY emp.sucursal
    """).fetchall()

    conn.close()
    return jsonify({
        "por_categoria": [dict(r) for r in por_categoria],
        "por_empleado": [dict(r) for r in por_empleado],
        "por_sucursal": [dict(r) for r in por_sucursal]
    })

@app.route("/api/idiomas", methods=["GET"])
def idiomas():
    return jsonify(["es", "en", "pt"])

@app.route("/api/ayuda", methods=["GET"])
def ayuda():
    return jsonify({"mensaje": "Bienvenido a Mia Evaluación. Si necesitas ayuda, escribe a soporte@mia.com"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

