from linear_regression import LinearRegressionModel
from repositories.data_repository import data_repository


class ModelService:
    """Class for handling the connection
    between models and the app.
    """
    def __init__(self):
        self.data = data_repository.get_df_from_stationary_data()
        self.model = LinearRegressionModel(data=self.data)

    def learn(self):
        self.model.learn()

    def predict(self, feature):
        return self.model.predict(feature)

s = ModelService()

print(s.data)
