from flask import Flask, render_template
from routers.data_router import DataRouter
import os
from config import set_configuration


app = Flask(__name__)

configuration_mode = os.getenv('FLASK_ENV')
app.config.from_object(set_configuration(configuration_mode))

print('Mode: ', app.config["CONFIG_MODE"], flush=True)
print('Key: ', app.config["SECRET_KEY"], flush=True)


app.add_url_rule('/data', view_func=DataRouter().render_view)


@app.route("/")
def initial_view():
    return render_template('index.html')


if __name__ == "__main__":
    app.run()

