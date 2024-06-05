from src.services.ml_model import ML_Model
from sklearn.neural_network import MLPRegressor
from matplotlib import pyplot as plt

class NeuralNetwork(ML_Model):
    """Multilayer Perceptron doing
    regression.
    """
    def setup_model(self):
        self.model = MLPRegressor(hidden_layer_sizes=2000, activation="relu", solver="sgd", learning_rate="adaptive", learning_rate_init=0.001, max_iter=1000)

    def setup_data(self):
        y = self.data["620 Exactum"].values
        X = self.data.drop("620 Exactum", axis="columns").values

        self.split_data(X, y)


    def learn(self):
        self.train_x = self.scaler.fit_transform(self.train_x)

        self.model.fit(X=self.train_x, y=self.train_y)
        
        print(self.model.best_loss_)

        plt.plot(range(len(self.model.loss_curve_)), self.model.loss_curve_)
        plt.show()


    def predict(self, weekday=0):
        features = self.get_avg_of_last_days(20)
        features = features.drop(["620 Exactum"], axis="columns")
        features.at[0,"Weekday"] = weekday

        features = self.scaler.transform(features.values)

        return int(self.model.predict(features)[0])

