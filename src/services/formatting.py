
"""To format data to be displayed on Jinja2 Templates
"""

def get_dummy_data():
    """function to return some dummy data for /data router and data.html template
    Returns:
        data: list including labels and data
    """
    column_labels = ["Mon", "Tue", "Wed", "Thu", "Fri"]
    label_for_on_mouse_over = 'Predicted Bio Waste / kg'
    data_for_chemicum = [22.5, 43.2, 55.6, 23.7, 36.4]
    data_for_exactum = [13.6, 31.3, 18.9, 42.2, 11.7]
    data_total = count_total([data_for_chemicum, data_for_exactum])
    data_for_data_router = [column_labels, label_for_on_mouse_over, data_for_chemicum, data_for_exactum, data_total]
    return data_for_data_router


def count_total(lists: list):
    """helper function to calculate total food waste from lists containing numbers
    Args:
        lists (list): list containing lists
    Returns:
        list: sums of food waste per day
    """
    total = []
    i = 0
    while i < len(lists[0]):
        amount = 0
        for list_of_data in lists:
            amount += list_of_data[i]
        total.append(round(amount, 1))
        i += 1
    return total
