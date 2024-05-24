from src.repositories.data_repository import data_repository
from src.services.linear_regression import LinearRegressionModel

# run with "poetry run python -m src.services.analysis"


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

s.model.learn()
print(s.model.predict(2))
print(s.model.test())
s.model.visualize()
