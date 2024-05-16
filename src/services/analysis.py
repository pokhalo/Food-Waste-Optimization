import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression


HOURLY_CUSTOMER_COUNT = "~/Downloads/Tuntikohtainen asiakasmäärä.xlsx"
BOUGHT_MEALS = "~/Downloads/Kopio_Kumpula asiakasdataa.xlsx"


class Model:
    """Class for the statistical model
    """
    def __init__(self, data):
        self.data = data
        self.model = LinearRegression()

    def learn(self):
        self.model.fit(self.data["Daily customers"].to_frame(), self.data["Bought meals"])

    def predict(self, feature):
        return int(self.model.predict(feature))

hourly_customers = pd.read_excel(io=HOURLY_CUSTOMER_COUNT, skiprows=2, index_col=0)
bought_meals = pd.read_excel(io=BOUGHT_MEALS, skiprows=2, index_col=0)

cols = ["Chemicum", "Physicum", "Exactum", "All groups"]
hourly_customers.columns = cols
bought_meals.columns = cols

hourly_customers = hourly_customers

exa = hourly_customers.Exactum


comb = pd.merge(bought_meals.Exactum, hourly_customers.Exactum, on="Date").dropna()
comb.columns = ["Bought meals", "Daily customers"]

linreg = Model(comb)

linreg.learn()

print(linreg.predict(np.array([120]).reshape(-1,1)))

