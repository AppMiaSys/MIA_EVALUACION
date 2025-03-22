# __init__.py

from flask import Flask
from flask_cors import CORS
import sqlite3
import os

def create_app():
    app = Flask(__name__)
    CORS(app)

    DB_PATH = os.getenv("DB_PATH", "mia_evaluacion.db")

    def get_db():
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        return conn

    app.config["get_db"] = get_db

    return app
