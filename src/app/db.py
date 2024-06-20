"""Initialize SQLAlchemy database connection for Flask app using environment variables to set database URI.
    """
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text, create_engine
from ..app.app import app
from os import getenv


# db = SQLAlchemy()

# def init_engine(app):
#     engine = create_engine(app.config["SQLALCHEMY_DATABASE_URI"])
#     return engine

app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
db = SQLAlchemy(app)
engine = create_engine(app.config["SQLALCHEMY_DATABASE_URI"])
