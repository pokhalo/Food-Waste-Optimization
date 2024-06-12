from ..routers.data_router import DataRouter
from ..app.db import db
from ..repositories import data_repository
from sqlalchemy import text, create_engine
from flask import render_template, jsonify
import os

def init_routes(app):
    @app.route("/dbtest")
    def db_conn_test():
        data = data_repository.DataRepository()
        df = data.get_df_from_stationary_data()
        roll = data.roll_means()
        engine = create_engine(app.config["SQLALCHEMY_DATABASE_URI"])

        df.to_sql(name="dataframe", con=engine, if_exists='replace')
        roll.to_sql(name="rolleddata", con=engine, if_exists='replace')

        rs = db.session.execute(text("SELECT * FROM dataframe;"))
        result = rs.fetchall()
        rs2 = db.session.execute(text("SELECT * FROM  rolleddata;"))
        result2 = rs2.fetchall()
        return (str(result), str(result2))

    @app.route("/")
    @app.route("/fwowebserver")
    def initial_view():
        return render_template('index.html')

    @app.route('/api/data')
    def get_data_for_wednesday():
        with open('src/data/predicted.txt', mode='r') as file:
            prediction = file.readline()
            return jsonify({'content': prediction })

    app.add_url_rule('/data', view_func=DataRouter().render_view)
