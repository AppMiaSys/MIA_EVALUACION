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
    try:
        rows = query_db("SELECT dni, nombre, sucursal, area, contrasena, nivel_acceso FROM empleados")
        return jsonify([{
            "dni": r[0], "nombre": r[1], "sucursal": r[2], "area": r[3],
            "contrasena": r[4], "nivel_acceso": r[5]
        } for r in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/empleados", methods=["POST"])
def add_empleado():
    try:
        d = request.json
        query_db(
            "INSERT INTO empleados (dni, nombre, sucursal, area, contrasena, nivel_acceso) VALUES (?, ?, ?, ?, ?, ?)",
            (d["dni"], d["nombre"], d.get("sucursal", ""), d.get("area", ""), d["contrasena"], d.get("nivel_acceso", 1))
        )
        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/empleados", methods=["PUT"])
def update_empleado():
    try:
        d = request.json
        query_db(
            "UPDATE empleados SET nombre=?, sucursal=?, area=?, contrasena=?, nivel_acceso=? WHERE dni=?",
            (d["nombre"], d["sucursal"], d["area"], d["contrasena"], d["nivel_acceso"], d["dni"])
        )
        return jsonify({"status": "updated"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
# EVALUACIONES
# -----------------------------
@app.route("/api/evaluaciones", methods=["GET"])
def get_evaluaciones():
    rows = query_db("SELECT id, nombre FROM evaluaciones")
    return jsonify([{"id": r[0], "nombre": r[1]} for r in rows])

@app.route("/api/evaluaciones/nueva", methods=["POST"])
def add_evaluacion():
    d = request.json
    query_db("INSERT INTO evaluaciones (nombre) VALUES (?)", (d["nombre"],))
    return jsonify({"status": "ok"})

@app.route("/api/evaluaciones", methods=["POST"])
def enviar_evaluacion():
    d = request.json
    query_db(
        "INSERT INTO evaluaciones_resultado (evaluador_dni, evaluado_dni, evaluacion_id, categoria_id, pregunta_id, puntuacion, fecha) VALUES (?, ?, ?, ?, ?, ?, CURRENT_DATE)",
        (d["evaluador"], d["evaluado"], d["evaluacion_id"], d["categoria_id"], d["pregunta_id"], d["puntuacion"])
    )
    return jsonify({"status": "ok"})

@app.route("/api/evaluaciones/<int:evaluacion_id>/participantes", methods=["GET"])
def get_participantes_by_evaluacion(evaluacion_id):
    rows = query_db("""
        SELECT e.dni, e.nombre 
        FROM empleados e
        JOIN evaluaciones_participantes ep ON e.dni = ep.empleado_dni
        WHERE ep.evaluacion_id = ?
    """, (evaluacion_id,))
    return jsonify([{"dni": r[0], "nombre": r[1]} for r in rows])

@app.route("/api/evaluaciones/<int:evaluacion_id>/asignaciones", methods=["GET"])
def get_asignaciones_by_evaluacion(evaluacion_id):
    rows = query_db("""
        SELECT evaluador_dni, evaluado_dni 
        FROM evaluaciones_asignaciones 
        WHERE evaluacion_id = ?
    """, (evaluacion_id,))
    return jsonify([{"evaluador_dni": r[0], "evaluado_dni": r[1]} for r in rows])

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

# -----------------------------
# CATEGORIAS
# -----------------------------
@app.route("/api/categorias", methods=["GET"])
def get_categorias():
    rows = query_db("SELECT id, nombre FROM categorias")
    return jsonify([{"id": r[0], "nombre": r[1]} for r in rows])

@app.route("/api/categorias", methods=["POST"])
def add_categoria():
    d = request.json
    query_db("INSERT INTO categorias (nombre) VALUES (?)", (d["nombre"],))
    return jsonify({"status": "ok"})

@app.route("/api/evaluaciones/<int:evaluacion_id>/categorias", methods=["GET"])
def get_categorias_by_evaluacion(evaluacion_id):
    rows = query_db("SELECT id, nombre FROM categorias WHERE evaluacion_id = ?", (evaluacion_id,))
    return jsonify([{"id": r[0], "nombre": r[1]} for r in rows])

# -----------------------------
# PREGUNTAS
# -----------------------------
@app.route("/api/preguntas", methods=["GET"])
def get_preguntas():
    rows = query_db("SELECT id, texto, categoria_id FROM preguntas")
    return jsonify([{"id": r[0], "texto": r[1], "categoria_id": r[2]} for r in rows])

@app.route("/api/preguntas", methods=["POST"])
def add_pregunta():
    d = request.json
    query_db("INSERT INTO preguntas (texto, categoria_id) VALUES (?, ?)", (d["texto"], d["categoria_id"]))
    return jsonify({"status": "ok"})

@app.route("/api/preguntas", methods=["PUT"])
def update_pregunta():
    d = request.json
    query_db("UPDATE preguntas SET texto = ?, categoria_id = ? WHERE id = ?", (d["texto"], d["categoria_id"], d["id"]))
    return jsonify({"status": "updated"})

@app.route("/api/evaluaciones/<int:evaluacion_id>/preguntas", methods=["GET"])
def get_preguntas_by_evaluacion(evaluacion_id):
    try:
        rows = query_db("""
            SELECT p.id, p.texto, p.categoria_id
            FROM preguntas p
            JOIN categorias c ON p.categoria_id = c.id
            WHERE c.evaluacion_id = ?
        """, (evaluacion_id,))
        return jsonify([{"id": r[0], "texto": r[1], "categoria_id": r[2]} for r in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500



# -----------------------------
# NIVELES DE CALIFICACION
# -----------------------------
@app.route("/api/niveles", methods=["POST"])
def add_nivel():
    try:
        d = request.json
        query_db("INSERT INTO niveles (nombre, puntaje) VALUES (?, ?)", (d["nombre"], d["puntaje"]))
        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/niveles", methods=["POST"])
def add_nivel():
    d = request.json
    query_db("INSERT INTO niveles (nombre, puntaje) VALUES (?, ?)", (d["nombre"], d["puntaje"]))
    return jsonify({"status": "ok"})

@app.route("/api/niveles", methods=["PUT"])
def update_nivel():
    d = request.json
    query_db("UPDATE niveles SET nombre = ?, puntaje = ? WHERE id = ?", (d["nombre"], d["puntaje"], d["id"]))
    return jsonify({"status": "updated"})

@app.route("/api/evaluaciones/<int:evaluacion_id>/niveles", methods=["GET"])
def get_niveles_by_evaluacion(evaluacion_id):
    rows = query_db("SELECT id, nombre, puntaje FROM niveles WHERE evaluacion_id = ?", (evaluacion_id,))
    return jsonify([{"id": r[0], "nombre": r[1], "puntaje": r[2]} for r in rows])

if __name__ == "__main__":
    app.run(debug=True)

# -----------------------------
# SUCURSALES
# -----------------------------
@app.route("/api/sucursales", methods=["GET"])
def get_sucursales():
    try:
        rows = query_db("SELECT id, nombre FROM sucursales")
        return jsonify([{"id": r[0], "nombre": r[1]} for r in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/sucursales", methods=["POST"])
def add_sucursal():
    d = request.json
    query_db("INSERT INTO sucursales (nombre) VALUES (?)", (d["nombre"],))
    return jsonify({"status": "ok"})

@app.route("/api/sucursales", methods=["PUT"])
def update_sucursal():
    d = request.json
    query_db("UPDATE sucursales SET nombre = ? WHERE id = ?", (d["nombre"], d["id"]))
    return jsonify({"status": "updated"})

# -----------------------------
# AREAS
# -----------------------------
@app.route("/api/areas", methods=["GET"])
def get_areas():
    rows = query_db("SELECT id, nombre FROM areas")
    return jsonify([{"id": r[0], "nombre": r[1]} for r in rows])

@app.route("/api/areas", methods=["POST"])
def add_area():
    d = request.json
    query_db("INSERT INTO areas (nombre) VALUES (?)", (d["nombre"],))
    return jsonify({"status": "ok"})

@app.route("/api/areas", methods=["PUT"])
def update_area():
    d = request.json
    query_db("UPDATE areas SET nombre = ? WHERE id = ?", (d["nombre"], d["id"]))
    return jsonify({"status": "updated"})
