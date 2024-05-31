from flask import Flask, render_template, request, jsonify, make_response
from src.routers.data_router import DataRouter
from src.services.analysis import example_model
import os
from config import set_configuration
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

configuration_mode = os.getenv('FLASK_ENV')
app.config.from_object(set_configuration(configuration_mode))

print('Mode: ', app.config["CONFIG_MODE"], flush=True)
print('Key: ', app.config["SECRET_KEY"], flush=True)

app.add_url_rule('/data', view_func=DataRouter().render_view)


@app.route("/")
def initial_view():
    return render_template('index.html')

# Testing requests between React and Flask starts here: 
@app.route("/react")
def testing_react():
    return jsonify({ 'content': 'random string to test requests from react' })

@app.route('/api/data')
def get_data_for_wednesday():
    prediction = example_model()
    return jsonify({'content': prediction })

if __name__ == "__main__":
    app.run()
