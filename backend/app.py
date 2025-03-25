# ✅ backend/app.py completo y actualizado

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

# ✅ Empleados

@app.route("/api/empleados", methods=["GET"])
def get_empleados():
    rows = query_db("SELECT dni, nombre, sucursal, area, contrasena, nivel_acceso FROM empleados")
    return jsonify([{
        "dni": r[0],
        "nombre": r[1],
        "sucursal": r[2],
        "area": r[3],
        "contrasena": r[4],
        "nivel_acceso": r[5]
    } for r in rows])

@app.route("/api/empleados", methods=["POST"])
def add_empleado():
    data = request.json
    query_db("INSERT INTO empleados (dni, nombre, sucursal, area, contrasena, nivel_acceso) VALUES (?, ?, ?, ?, ?, ?)",
             (data["dni"], data["nombre"], data.get("sucursal", ""), data.get("area", ""), data.get("contrasena", ""), data.get("nivel_acceso", 1)))
    return jsonify({"status": "ok"})

@app.route("/api/empleados", methods=["PUT"])
def update_empleado():
    data = request.json
    query_db("UPDATE empleados SET nombre = ?, sucursal = ?, area = ?, contrasena = ?, nivel_acceso = ? WHERE dni = ?",
             (data["nombre"], data["sucursal"], data["area"], data["contrasena"], data.get("nivel_acceso", 1), data["dni"]))
    return jsonify({"status": "updated"})

# Puedes agregar aquí más rutas (preguntas, niveles, asignaciones, evaluación, etc.) según lo que ya tenías

if __name__ == "__main__":
    app.run(debug=True)
