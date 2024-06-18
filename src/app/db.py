from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text, create_engine


db = SQLAlchemy()

def init_engine(app):
    engine = create_engine(app.config["SQLALCHEMY_DATABASE_URI"])
    return engine
