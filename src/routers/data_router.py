from flask import render_template
from services.formatting import get_dummy_data

class DataRouter:
    """Class to handle /data requests
    """
    def __init__(self):
        self.data = get_dummy_data()
        self.labels = self.data[0]
        self.single_label = self.data[1]
        self.data_chemicum = self.data[2]
        self.data_exactum = self.data[3]
        self.data_total = self.data[4]

    def get_data(self):
        return self.data 
    
    def render_view(self):
        return render_template('data.html', labelsFromDataRouter = self.labels, 
                               singleLabelFromDataRouter = self.single_label, 
                               dataFromDataRouterChemicum = self.data_chemicum,
                               dataFromDataRouterExactum = self.data_exactum, 
                               dataFromDataRouterTotal = self.data_total)

