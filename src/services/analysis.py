from linear_regression import LinearRegressionModel


class ModelService:
    """Class for handling the connection
    between models and the app.
    """
    def __init__(self, data):
        self.data = data
        self.model = LinearRegressionModel(data=self.data)

    def learn(self):
        self.model.learn()

    def predict(self, feature):
        return self.model.predict(feature)

