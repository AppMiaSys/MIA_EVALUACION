# ✅ backend/app.py actualizado para evaluaciones configurables

from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)
DB_PATH = os.path.join(os.path.dirname(__file__), 'mia_evaluacion.db')

# Función utilitaria

def query_db(query, args=(), one=False):
    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()
    cur.execute(query, args)
    con.commit()
    rv = cur.fetchall()
    con.close()
    return (rv[0] if rv else None) if one else rv

# Empleados
@app.route("/api/empleados", methods=["GET"])
def get_empleados():
    rows = query_db("SELECT dni, nombre, sucursal, area, contrasena, nivel_acceso FROM empleados")
    return jsonify([{
        "dni": r[0], "nombre": r[1], "sucursal": r[2], "area": r[3],
        "contrasena": r[4], "nivel_acceso": r[5]
    } for r in rows])

@app.route("/api/empleados", methods=["POST"])
def add_empleado():
    d = request.json
    query_db("INSERT INTO empleados (dni, nombre, sucursal, area, contrasena, nivel_acceso) VALUES (?, ?, ?, ?, ?, ?)",
             (d["dni"], d["nombre"], d.get("sucursal", ""), d.get("area", ""), d.get("contrasena", ""), d.get("nivel_acceso", 1)))
    return jsonify({"status": "ok"})

@app.route("/api/empleados", methods=["PUT"])
def update_empleado():
    d = request.json
    query_db("UPDATE empleados SET nombre=?, sucursal=?, area=?, contrasena=?, nivel_acceso=? WHERE dni=?",
             (d["nombre"], d["sucursal"], d["area"], d["contrasena"], d["nivel_acceso"], d["dni"]))
    return jsonify({"status": "updated"})

# Evaluaciones configurables
@app.route("/api/evaluaciones", methods=["GET"])
def get_evaluaciones():
    rows = query_db("SELECT id, nombre, descripcion, estado, fecha_inicio, fecha_fin FROM evaluaciones_config")
    return jsonify([{
        "id": r[0], "nombre": r[1], "descripcion": r[2], "estado": r[3],
        "fecha_inicio": r[4], "fecha_fin": r[5]
    } for r in rows])

@app.route("/api/evaluaciones", methods=["POST"])
def add_evaluacion():
    d = request.json
    query_db("INSERT INTO evaluaciones_config (nombre, descripcion, estado, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?)",
             (d["nombre"], d.get("descripcion", ""), d.get("estado", "activo"), d.get("fecha_inicio", ""), d.get("fecha_fin", "")))
    return jsonify({"status": "ok"})

@app.route("/api/categorias/<int:evalid>", methods=["GET"])
def get_categorias_by_eval(evalid):
    rows = query_db("SELECT id, nombre FROM categorias WHERE evaluacion_id = ?", (evalid,))
    return jsonify([{"id": r[0], "nombre": r[1]} for r in rows])

@app.route("/api/preguntas/<int:evalid>", methods=["GET"])
def get_preguntas_by_eval(evalid):
    rows = query_db("SELECT p.id, p.texto, p.categoria_id FROM preguntas p JOIN categorias c ON p.categoria_id = c.id WHERE c.evaluacion_id = ?", (evalid,))
    return jsonify([{"id": r[0], "texto": r[1], "categoria_id": r[2]} for r in rows])

@app.route("/api/niveles/<int:evalid>", methods=["GET"])
def get_niveles_by_eval(evalid):
    rows = query_db("SELECT id, nivel, puntos FROM niveles WHERE evaluacion_id = ?", (evalid,))
    return jsonify([{"id": r[0], "nivel": r[1], "puntos": r[2]} for r in rows])

if __name__ == "__main__":
    app.run(debug=True)
