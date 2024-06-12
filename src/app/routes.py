from ..routers.data_router import DataRouter
from ..app.db import db, init_engine
from ..repositories import data_repository
from ..repositories import db_repository as dbrepo
from flask import render_template, jsonify
import os

def init_routes(app):
    @app.route("/dbtest")
    def db_conn_test():
        data = data_repository.DataRepository()
        df = data.get_df_from_stationary_data()
        roll = data.roll_means()

        engine = init_engine(app)

        dbrepo.insert_df_to_db("dataframe", df, engine)
        dbrepo.insert_df_to_db("rolleddata",roll, engine)

        rs = dbrepo.lookup_table_from_db(db, name="dataframe")
        rs2 = dbrepo.lookup_table_from_db(db, name="rolleddata")
        return (str(rs), str(rs2))

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
