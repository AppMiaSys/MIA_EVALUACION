from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)
DB_PATH = os.path.join(os.path.dirname(__file__), 'mia_evaluacion.db')

# Utilidad

def query_db(query, args=(), one=False):
    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()
    cur.execute(query, args)
    con.commit()
    rv = cur.fetchall()
    con.close()
    return (rv[0] if rv else None) if one else rv

# Endpoints

@app.route("/api/empleados", methods=["GET"])
def get_empleados():
    rows = query_db("SELECT dni, nombre, sucursal, area FROM empleados")
    return jsonify([{"dni": r[0], "nombre": r[1], "sucursal": r[2], "area": r[3]} for r in rows])

@app.route("/api/empleados", methods=["POST"])
def add_empleado():
    data = request.json
    query_db("INSERT INTO empleados (dni, nombre, sucursal, area) VALUES (?, ?, ?, ?)",
             (data["dni"], data["nombre"], data["sucursal"], data["area"]))
    return jsonify({"status": "ok"})

@app.route("/api/empleados", methods=["PUT"])
def update_empleado():
    data = request.json
    query_db("UPDATE empleados SET nombre = ?, sucursal = ?, area = ? WHERE dni = ?",
             (data["nombre"], data["sucursal"], data["area"], data["dni"]))
    return jsonify({"status": "updated"})

@app.route("/api/categorias", methods=["GET"])
def get_categorias():
    rows = query_db("SELECT id, nombre FROM categorias")
    return jsonify([{"id": r[0], "nombre": r[1]} for r in rows])

@app.route("/api/categorias", methods=["POST"])
def add_categoria():
    data = request.json
    query_db("INSERT INTO categorias (nombre) VALUES (?)", (data["nombre"],))
    return jsonify({"status": "ok"})

@app.route("/api/preguntas", methods=["GET"])
def get_preguntas():
    rows = query_db("SELECT p.id, p.texto, c.nombre FROM preguntas p JOIN categorias c ON p.categoria_id = c.id")
    return jsonify([{"id": r[0], "texto": r[1], "categoria": r[2]} for r in rows])

@app.route("/api/preguntas", methods=["POST"])
def add_pregunta():
    data = request.json
    query_db("INSERT INTO preguntas (texto, categoria_id) VALUES (?, ?)",
             (data["texto"], data["categoria_id"]))
    return jsonify({"status": "ok"})

@app.route("/api/preguntas", methods=["PUT"])
def update_pregunta():
    data = request.json
    query_db("UPDATE preguntas SET texto = ?, categoria_id = ? WHERE id = ?",
             (data["texto"], data["categoria_id"], data["id"]))
    return jsonify({"status": "updated"})

@app.route("/api/niveles", methods=["GET"])
def get_niveles():
    rows = query_db("SELECT id, nivel, puntos FROM niveles")
    return jsonify([{"id": r[0], "nivel": r[1], "puntos": r[2]} for r in rows])

@app.route("/api/niveles", methods=["POST"])
def add_nivel():
    data = request.json
    query_db("INSERT INTO niveles (nivel, puntos) VALUES (?, ?)", (data["nivel"], data["puntos"]))
    return jsonify({"status": "ok"})

@app.route("/api/niveles", methods=["PUT"])
def update_nivel():
    data = request.json
    query_db("UPDATE niveles SET nivel = ?, puntos = ? WHERE id = ?",
             (data["nivel"], data["puntos"], data["id"]))
    return jsonify({"status": "updated"})

@app.route("/api/asignaciones/<dni>", methods=["GET"])
def get_asignaciones(dni):
    rows = query_db("SELECT evaluado_dni FROM asignaciones WHERE evaluador_dni = ?", (dni,))
    return jsonify([r[0] for r in rows])

@app.route("/api/asignaciones", methods=["POST"])
def set_asignaciones():
    data = request.json
    evaluador_dni = data["evaluador"]
    evaluados = data["evaluados"]
    query_db("DELETE FROM asignaciones WHERE evaluador_dni = ?", (evaluador_dni,))
    for evaluado in evaluados:
        query_db("INSERT INTO asignaciones (evaluador_dni, evaluado_dni) VALUES (?, ?)",
                 (evaluador_dni, evaluado))
    return jsonify({"status": "asignado"})

@app.route("/api/evaluacion", methods=["POST"])
def guardar_evaluacion():
    data = request.json
    query_db("INSERT INTO evaluaciones (evaluador_dni, evaluado_dni, categoria, nivel, comentario, fecha) VALUES (?, ?, ?, ?, ?, ?)",
             (data["evaluador_dni"], data["evaluado_dni"], data["categoria"], data["nivel"], data["comentario"], data["fecha"]))
    return jsonify({"status": "registrado"})

@app.route("/api/resultados/<dni>", methods=["GET"])
def resultados_empleado(dni):
    rows = query_db("SELECT fecha, categoria, nivel FROM evaluaciones WHERE evaluado_dni = ? ORDER BY fecha DESC", (dni,))
    return jsonify([{"fecha": r[0], "categoria": r[1], "nivel": r[2]} for r in rows])

if __name__ == "__main__":
    app.run(debug=True)
