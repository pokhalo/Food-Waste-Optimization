from flask import Flask, render_template, request, jsonify, make_response

from src.routers.data_router import DataRouter
from src.services.analysis import ModelService
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.add_url_rule('/data', view_func=DataRouter().render_view)

@app.route("/")
def initial_view():
    return render_template('index.html')

# Testing requests between React and Flask starts here: 
@app.route("/react")
def testing_react():
    return jsonify({ 'content': 'random string to test requests from react' })

if __name__ == "__main__":
    app.run()
