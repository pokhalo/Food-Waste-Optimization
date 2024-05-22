from flask import Flask, render_template
from routers.data_router import DataRouter

app = Flask(__name__)
app.add_url_rule('/data', view_func=DataRouter().render_view)

@app.route("/")
def initial_view():
    return render_template('index.html')


if __name__ == "__main__":
    app.run()
