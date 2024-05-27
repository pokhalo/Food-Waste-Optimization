from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

class LinearRegressionModel:
    """Class for linear regression. Uses
    sklearn model.
    """
    def __init__(self, data):
        self.data = data
        self.train_x = None
        self.test_x = None
        self.train_y = None
        self.test_y = None
        self.model = LinearRegression(fit_intercept=True, positive=True)

    def center_data(self):
        self.data = self.data.apply(lambda x: x - x.mean(), axis=0)

    def learn(self):
        y = self.data["Huomisen Jäte"]
        X = self.data.drop(["Huomisen Jäte"], axis=1)

        self.train_x, self.test_x, self.train_y, self.test_y = train_test_split(X, y, test_size=0.05, random_state=None, shuffle=True, stratify=None)
        self.model.fit(X=self.train_x, y=self.train_y)

    def predict(self, weekday=0):
        features = self.data.iloc[[-1]].reset_index(drop=True)
        features = features.drop(["Huomisen Jäte"], axis="columns")
        features["Weekday"] = weekday
        return self.model.predict(features)[0]


    def test(self):
        # does not work properly
        y_pred = [self.predict(self.test_x["Weekday"].values[0])]
        test_y = self.test_y.values
        mse = mean_squared_error(test_y, y_pred)
        mae = mean_absolute_error(test_y, y_pred)
        r2 = r2_score(test_y, y_pred)
        
        return mse, mae, r2

    def visualize(self):
        plt.figure(figsize = (8, 8))
        plt.scatter(x = np.arange(len(self.train_y.values)), y = self.train_y.values, c = 'green')
        plt.plot(np.arange(len(self.train_y.values)), self.model.predict(self.train_x))
        plt.ylabel('Ruokajäte')
        plt.title('Scatter')
        plt.show()
