from src.services.ml_model import ML_Model
from sklearn.neural_network import MLPRegressor
from matplotlib import pyplot as plt

class NeuralNetwork(ML_Model):
    """Multilayer Perceptron doing
    regression.
    """
    def setup_model(self):
        self.model = MLPRegressor(hidden_layer_sizes=(10000, 5000, 2500, 1000), 
                                  batch_size="auto", 
                                  activation="relu", 
                                  solver="adam", 
                                  learning_rate="invscaling", 
                                  learning_rate_init=0.001, 
                                  max_iter=10_000, 
                                  early_stopping=False,
                                  shuffle=True)

    def setup_data(self):
        y = self.data["Total.2"].values
        X = self.data.drop("Total.2", axis="columns").values

        self.split_data(X, y)


    def learn(self):
        self.train_x = self.scaler.fit_transform(self.train_x)

        self.model.fit(X=self.train_x, y=self.train_y)
        
        print("Best loss:", self.model.best_loss_)

        plt.plot(range(len(self.model.loss_curve_)), self.model.loss_curve_)
        plt.show()
