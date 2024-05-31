from flask import Flask, render_template, request, jsonify, make_response

from src.routers.data_router import DataRouter
from src.services.analysis import example_model
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.add_url_rule('/data', view_func=DataRouter().render_view)

@app.route("/")
def initial_view():
    return render_template('index.html')

@app.route('/api/data')
def get_data_for_wednesday():
    prediction = example_model()
    return jsonify({'content': prediction })

if __name__ == "__main__":
    app.run()
