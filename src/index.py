from flask import Flask, render_template
from routers.data_router import DataRouter
import os
from config import SECRET_KEY
from config import config

key = SECRET_KEY
print('key: ', key, flush=True)

print(config)

app = Flask(__name__)
configuration_mode = os.getenv('FLASK_ENV')
print('here: ', configuration_mode, flush=True)
app.config.from_object(config[configuration_mode])



app.add_url_rule('/data', view_func=DataRouter().render_view)


@app.route("/")
def initial_view():
    return render_template('index.html')


if __name__ == "__main__":
    app.run()

# 'development': <class 'config.DevelopmentConfiguration'>, 'testing': 'TestingConfiguration', 'production': 'ProductionConfiguration', 'default': 'DefaultConfiguration'}

