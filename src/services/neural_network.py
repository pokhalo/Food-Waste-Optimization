from services.ml_model import ML_Model
from sklearn.neural_network import MLPRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.preprocessing import StandardScaler
from sklearn.utils import resample
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd


class NeuralNetwork(ML_Model):
    """Multilayer Perceptron doing
    regression.
    """
    def setup_model(self):
        self.model = MLPRegressor()
