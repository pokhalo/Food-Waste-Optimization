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

    def test_model(self):
        mse, mae, r2 = self.model.test()
        return f"Mean squared error: {mse}\nMean absolute error: {mae}\nR^2: {r2}"


# HOW TO USE

s = ModelService()

# After defining the class the model must be fitted using
s.learn()
# The data is fetched automatically and now it is ready to make predictions

# Predict using a weekday, e.g. monday = 0, tuesday = 1 ...
print(s.predict(2)) # Prediction is a float representing estimated waste for the given day in kgs

#print(s.test_model()) # this shows info about the accuracy of the model, does not really work yet

# This will visualize the fit using matplotlib
s.model.visualize()
