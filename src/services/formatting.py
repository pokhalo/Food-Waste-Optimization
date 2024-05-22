
"""To format data to be displayed on Jinja2 Templates
"""

def get_dummy_data():
    """function to return some dummy data for /data router and data.html template
    Returns:
        data: list including labels and data
    """
    column_labels = ["Mon", "Tue", "Wed", "Thu", "Fri"]
    label_for_on_mouse_over = 'Predicted Bio Waste / kg'
    data = [22.5, 43.2, 55.6, 23.7, 36.4]
    data_for_data_router = [column_labels, label_for_on_mouse_over, data]
    return data_for_data_router


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