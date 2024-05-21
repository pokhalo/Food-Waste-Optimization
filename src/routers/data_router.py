from flask import render_template
from services.formatting import get_dummy_data

class DataRouter:
    """Class to handle /data requests
    """
    def __init__(self):
        self.data = get_dummy_data()
        self.labels = self.data[0]
        self.single_label = self.data[1]
        self.data_for_template = self.data[2]

    def get_data(self):
        return self.data 
    
    def render_view(self):
        return render_template('data.html', singleLabelFromDataRouter = self.single_label, dataFromDataRouter = self.data_for_template, labelsFromDataRouter = self.labels)


# For Reference:
#
# Variables injected on data.html - template:
#
#    const injectedLabels = JSON.parse('{{ labelsFromDataRouter | tojson }}')
#    const injectedData = JSON.parse('{{ dataFromDataRouter | tojson }}')
#    const injectedLabel = '{{ singleLabelFromDataRouter | safe }}'
#
# Injected variables used on a template:
#
#   data: {
#       labels: injectedLabels,
#       datasets: [{
#           label: injectedLabel,
#           data: injectedData,
#           borderWidth: 1
#         }]
#       }
