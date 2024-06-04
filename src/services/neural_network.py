from services.ml_model import ML_Model
from sklearn.neural_network import MLPRegressor


class NeuralNetwork(ML_Model):
    """Multilayer Perceptron doing
    regression.
    """
    def setup_model(self):
        self.model = MLPRegressor()
