from services.ml_model import ML_Model
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.preprocessing import StandardScaler
from sklearn.utils import resample
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

class LinearRegressionModel(ML_Model):
    """Class for linear regression. Uses
    sklearn model.
    """
    def setup_model(self):
        self.model = LinearRegression(fit_intercept=True, positive=False, copy_X=True)

    def learn(self):
        y = self.data["620 Exactum"]
        X = self.data.drop("620 Exactum", axis="columns")

        self.train_x, self.test_x, self.train_y, self.test_y = train_test_split(X, y, test_size=0.02, random_state=None, shuffle=True, stratify=None)
        
        self.train_x = self.scaler.fit_transform(self.train_x)
        
        self.model.fit(X=self.train_x, y=self.train_y)

