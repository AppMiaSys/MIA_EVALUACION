from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)
DB_PATH = os.path.join(os.path.dirname(__file__), 'mia_evaluacion.db')

def query_db(query, args=(), one=False):
    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()
    cur.execute(query, args)
    con.commit()
    rv = cur.fetchall()
    con.close()
    return (rv[0] if rv else None) if one else rv

# -----------------------------
# EMPLEADOS
# -----------------------------
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
    query_db(
        "INSERT INTO empleados (dni, nombre, sucursal, area, contrasena, nivel_acceso) VALUES (?, ?, ?, ?, ?, ?)",
        (d["dni"], d["nombre"], d.get("sucursal", ""), d.get("area", ""), d["contrasena"], d.get("nivel_acceso", 1))
    )
    return jsonify({"status": "ok"})

@app.route("/api/empleados", methods=["PUT"])
def update_empleado():
    d = request.json
    query_db(
        "UPDATE empleados SET nombre=?, sucursal=?, area=?, contrasena=?, nivel_acceso=? WHERE dni=?",
        (d["nombre"], d["sucursal"], d["area"], d["contrasena"], d["nivel_acceso"], d["dni"])
    )
    return jsonify({"status": "updated"})

# -----------------------------
# NIVELES DE ACCESO
# -----------------------------
@app.route("/api/niveles-acceso", methods=["GET"])
def get_niveles_acceso():
    rows = query_db("SELECT id, nombre, permisos FROM niveles_acceso")
    return jsonify([{"id": r[0], "nombre": r[1], "permisos": r[2]} for r in rows])

@app.route("/api/niveles-acceso", methods=["POST"])
def add_nivel_acceso():
    d = request.json
    query_db("INSERT INTO niveles_acceso (nombre, permisos) VALUES (?, ?)", (d["nombre"], d["permisos"]))
    return jsonify({"status": "ok"})

@app.route("/api/niveles-acceso", methods=["PUT"])
def update_nivel_acceso():
    d = request.json
    query_db("UPDATE niveles_acceso SET nombre = ?, permisos = ? WHERE id = ?", (d["nombre"], d["permisos"], d["id"]))
    return jsonify({"status": "updated"})

# -----------------------------
# ASIGNACIONES
# -----------------------------
@app.route("/api/asignaciones/<dni>", methods=["GET"])
def get_asignaciones_por_evaluador(dni):
    rows = query_db("SELECT evaluado_dni FROM asignaciones WHERE evaluador_dni = ?", (dni,))
    return jsonify([r[0] for r in rows])

@app.route("/api/asignaciones", methods=["POST"])
def post_asignaciones():
    d = request.json
    evaluador = d["evaluador"]
    evaluados = d["evaluados"]
    query_db("DELETE FROM asignaciones WHERE evaluador_dni = ?", (evaluador,))
    for ev in evaluados:
        query_db("INSERT INTO asignaciones (evaluador_dni, evaluado_dni) VALUES (?, ?)", (evaluador, ev))
    return jsonify({"status": "ok"})

# -----------------------------
# EVALUACION USUARIOS
# -----------------------------
@app.route("/api/evaluaciones/<int:evaluacion_id>/evaluados", methods=["POST"])
def set_evaluados_por_evaluacion(evaluacion_id):
    dnis = request.json.get("empleados", [])
    query_db("DELETE FROM evaluacion_usuarios WHERE evaluacion_id = ?", (evaluacion_id,))
    for dni in dnis:
        query_db("INSERT INTO evaluacion_usuarios (evaluacion_id, empleado_dni) VALUES (?, ?)", (evaluacion_id, dni))
    return jsonify({"status": "ok"})

@app.route("/api/evaluaciones/<int:evaluacion_id>/evaluados", methods=["GET"])
def get_evaluados_por_evaluacion(evaluacion_id):
    rows = query_db("SELECT empleado_dni FROM evaluacion_usuarios WHERE evaluacion_id = ?", (evaluacion_id,))
    return jsonify([r[0] for r in rows])

if __name__ == "__main__":
    app.run(debug=True)
