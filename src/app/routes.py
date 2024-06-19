from ..services import model_service
from flask import render_template, jsonify, make_response
from ..app.app import app


model = model_service.ModelService()
model.load_model()


@app.route("/dbtest")
def db_conn_test():
    return "not testing database connection"


@app.route("/")
@app.route("/fwowebserver")
def initial_view():
    resp = make_response(render_template('index.html'))
    resp.headers['Accept-Ranges'] = 'none'

    return resp

@app.route('/api/data')
def get_data_for_wednesday():
    with open('src/data/predicted.txt', mode='r') as file:
        prediction = file.readline()
        return jsonify({'content': prediction })
    
@app.route('/data/occupancy')
def occupancy_data():
    data = model.predict_occupancy()
    return data

@app.route('/data/biowaste')
def biowaste_data():
    data = model.predict_waste_by_week()
    data_customer = data["Asiakasbiojäte. tiski (kg) per Kuitti kpl (kg)"]["600 Chemicum"]
    data_customer = [{'Chemicum': data["Asiakasbiojäte. tiski (kg) per Kuitti kpl (kg)"]["600 Chemicum"]},
                        {'Exactum': data['Asiakasbiojäte. tiski (kg) per Kuitti kpl (kg)']["620 Exactum"]},
                        {'Physicum': data['Asiakasbiojäte. tiski (kg) per Kuitti kpl (kg)']["610 Physicum"]}
                        ]
    data_coffee = [{'Chemicum': data["Biojäte kahvi. porot (kg) per Kuitti kpl (kg)"]["600 Chemicum"]},
                    {'Exactum': data['Biojäte kahvi. porot (kg) per Kuitti kpl (kg)']["620 Exactum"]},
                    {'Physicum': data['Biojäte kahvi. porot (kg) per Kuitti kpl (kg)']["610 Physicum"]}
                    ]
    data_kitchen = [{'Chemicum': data["Keittiön biojäte (ruoanvalmistus) (kg) per Kuitti kpl (kg)"]["600 Chemicum"]},
                    {'Exactum': data['Keittiön biojäte (ruoanvalmistus) (kg) per Kuitti kpl (kg)']["620 Exactum"]},
                    {'Physicum': data['Keittiön biojäte (ruoanvalmistus) (kg) per Kuitti kpl (kg)']["610 Physicum"]}
                    ]
    data_dining = [{'Chemicum': data["Salin biojäte (jämät) (kg) per Kuitti kpl (kg)"]["600 Chemicum"]},
                    {'Exactum': data['Salin biojäte (jämät) (kg) per Kuitti kpl (kg)']["620 Exactum"]},
                    {'Physicum': data['Salin biojäte (jämät) (kg) per Kuitti kpl (kg)']["610 Physicum"]}
                    ]
    return jsonify({'customerBiowaste': data_customer, 'coffeeBiowaste': data_coffee, 'kitchenBiowaste': data_kitchen, 'hallBiowaste': data_dining})
