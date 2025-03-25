# ✅ backend/app.py — extendido con niveles de acceso

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

# --- Empleados / Evaluación / Configuración omitidos para brevedad ---

# 📌 Niveles de Acceso

@app.route("/api/niveles-acceso", methods=["GET"])
def get_niveles_acceso():
    rows = query_db("SELECT id, nombre, permisos FROM niveles_acceso")
    return jsonify([{"id": r[0], "nombre": r[1], "permisos": r[2]} for r in rows])

@app.route("/api/niveles-acceso", methods=["POST"])
def add_nivel_acceso():
    data = request.json
    query_db("INSERT INTO niveles_acceso (nombre, permisos) VALUES (?, ?)",
             (data["nombre"], data["permisos"]))
    return jsonify({"status": "ok"})

@app.route("/api/niveles-acceso", methods=["PUT"])
def update_nivel_acceso():
    data = request.json
    query_db("UPDATE niveles_acceso SET nombre = ?, permisos = ? WHERE id = ?",
             (data["nombre"], data["permisos"], data["id"]))
    return jsonify({"status": "updated"})

if __name__ == "__main__":
    app.run(debug=True)
