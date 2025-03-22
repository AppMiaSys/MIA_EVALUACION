from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_db():
    conn = sqlite3.connect("mia_evaluacion.db")
    conn.row_factory = sqlite3.Row
    return conn

# === EMPLEADOS ===

@app.route("/api/empleados", methods=["GET", "POST", "PUT"])
def empleados():
    conn = get_db()
    if request.method == "GET":
        empleados = conn.execute("SELECT * FROM empleados").fetchall()
        conn.close()
        return jsonify([dict(e) for e in empleados])
    elif request.method == "POST":
        data = request.json
        conn.execute("INSERT INTO empleados (dni, nombre, sucursal, area) VALUES (?, ?, ?, ?)",
                     (data["dni"], data["nombre"], data["sucursal"], data["area"]))
        conn.commit()
        return jsonify({"status": "ok"})
    elif request.method == "PUT":
        data = request.json
        conn.execute("UPDATE empleados SET nombre=?, sucursal=?, area=? WHERE dni=?",
                     (data["nombre"], data["sucursal"], data["area"], data["dni"]))
        conn.commit()
        return jsonify({"status": "updated"})

# === CATEGORÍAS DE PREGUNTAS ===

@app.route("/api/categorias", methods=["GET", "POST"])
def categorias():
    conn = get_db()
    if request.method == "GET":
        categorias = conn.execute("SELECT * FROM categorias").fetchall()
        conn.close()
        return jsonify([dict(c) for c in categorias])
    elif request.method == "POST":
        data = request.json
        conn.execute("INSERT INTO categorias (nombre) VALUES (?)", (data["nombre"],))
        conn.commit()
        return jsonify({"status": "ok"})

# === PREGUNTAS ===

@app.route("/api/preguntas", methods=["GET", "POST", "PUT"])
def preguntas():
    conn = get_db()
    if request.method == "GET":
        preguntas = conn.execute("""
            SELECT p.id, p.texto, p.categoria_id, c.nombre AS categoria 
            FROM preguntas p 
            JOIN categorias c ON p.categoria_id = c.id
        """).fetchall()
        conn.close()
        return jsonify([dict(p) for p in preguntas])
    elif request.method == "POST":
        data = request.json
        conn.execute("INSERT INTO preguntas (texto, categoria_id) VALUES (?, ?)",
                     (data["texto"], data["categoria_id"]))
        conn.commit()
        return jsonify({"status": "ok"})
    elif request.method == "PUT":
        data = request.json
        conn.execute("UPDATE preguntas SET texto=?, categoria_id=? WHERE id=?",
                     (data["texto"], data["categoria_id"], data["id"]))
        conn.commit()
        return jsonify({"status": "updated"})

# === NIVELES DE CALIFICACIÓN ===

@app.route("/api/niveles", methods=["GET", "POST", "PUT"])
def niveles():
    conn = get_db()
    if request.method == "GET":
        niveles = conn.execute("SELECT * FROM niveles").fetchall()
        conn.close()
        return jsonify([dict(n) for n in niveles])
    elif request.method == "POST":
        data = request.json
        conn.execute("INSERT INTO niveles (nivel, puntos) VALUES (?, ?)",
                     (data["nivel"], data["puntos"]))
        conn.commit()
        return jsonify({"status": "ok"})
    elif request.method == "PUT":
        data = request.json
        conn.execute("UPDATE niveles SET nivel=?, puntos=? WHERE id=?",
                     (data["nivel"], data["puntos"], data["id"]))
        conn.commit()
        return jsonify({"status": "updated"})

# === ASIGNACIONES DE EVALUACIONES ===

@app.route("/api/asignaciones", methods=["GET", "POST"])
def asignaciones():
    conn = get_db()
    if request.method == "GET":
        evaluador = request.args.get("dni")
        asignados = conn.execute("SELECT evaluado_dni FROM asignaciones WHERE evaluador_dni=?",
                                 (evaluador,)).fetchall()
        conn.close()
        return jsonify([a["evaluado_dni"] for a in asignados])
    elif request.method == "POST":
        data = request.json
        dni = data["evaluador_dni"]
        lista = data["evaluado_dnis"]
        conn.execute("DELETE FROM asignaciones WHERE evaluador_dni=?", (dni,))
        for evaluado in lista:
            conn.execute("INSERT INTO asignaciones (evaluador_dni, evaluado_dni) VALUES (?, ?)",
                         (dni, evaluado))
        conn.commit()
        return jsonify({"status": "ok"})

# === EVALUACIONES (crear + ver resultados por empleado) ===

@app.route("/api/evaluaciones", methods=["POST", "GET"])
def evaluaciones():
    conn = get_db()
    if request.method == "POST":
        data = request.json
        conn.execute("""
            INSERT INTO evaluaciones (evaluador_dni, evaluado_dni, categoria, nivel, comentario, fecha)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (data["evaluador_dni"], data["evaluado_dni"], data["categoria"],
              data["nivel"], data["comentario"], data["fecha"]))
        conn.commit()
        return jsonify({"status": "ok"})
    elif request.method == "GET":
        evaluaciones = conn.execute("SELECT * FROM evaluaciones").fetchall()
        conn.close()
        return jsonify([dict(e) for e in evaluaciones])

@app.route("/api/empleado/resultados/<dni>")
def resultados_empleado(dni):
    conn = get_db()
    resultados = conn.execute("""
        SELECT categoria, nivel, fecha 
        FROM evaluaciones 
        WHERE evaluado_dni=?
    """, (dni,)).fetchall()
    conn.close()
    return jsonify([dict(r) for r in resultados])

if __name__ == "__main__":
    app.run(debug=True)
