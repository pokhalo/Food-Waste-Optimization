"""Creates ModelService class that allows requests to AI models.
    """
from ..repositories.data_repository import data_repo
from .neural_network import NeuralNetwork
from sklearn.exceptions import NotFittedError

# run with "poetry run python -m src.services.model_service"


class ModelService:
    """Class for handling the connection
    between models, data and the app.
    """

    def __init__(self):
        self.data = data_repo.get_model_fit_data()
        self.model = NeuralNetwork(
            data=self.data)


    def __predict(self, weekday: int, meal_plan: list):
        """This function will predict sold meals
        for a specific day and meal plan
        Args:
            weekday (int): day of prediction, 0 - monday, 1 - tuesday etc.
            meal_plan (list): dishes to be sold on that day
        Returns:
            int: number of sold meals
        """
        try:
            return self.model.predict(weekday=weekday, dishes=meal_plan)
        except NotFittedError as err:
            print("You must load or fit model first")

    def test_model(self):
        """First will try to load model, if unsuccessful,
        will fit and save a model. Then will run tests

        prints:
        Mean squared error
        Mean absolute error
        R^2 value
        """
        try:
            self.load_model()
        except NotFittedError as err:
            # no model to load
            print("Model could not be loaded, fitting instead:", err)
            self.fit_and_save()
        mse, mae, r2 = self.model.test()

        print(
            f"Mean squared error: {mse}\nMean absolute error: {mae}\nR^2: {r2}")

    def fit_and_save(self):
        """Will fit the model and the save into a file.
        If unsuccessful, will give error.
        """
        try:
            print("Fitting model")
            self.model.fit_and_save()
            print("Model fitted and saved")
        except Exception as err: # pylint: disable=W0718
            print("Model could not be fitted:", err)

    def load_model(self):
        """This function will load the model. First
        try to load a model and if no model is found,
        will give error.
        """
        try:
            self.model.load_model()
            print("Model loaded")
        except Exception as err: # pylint: disable=W0718
            print("Model could not be loaded:", err)

    def _predict_waste_by_week(self):
        """Predicts food waste for a week
        based on average food waste per customer
        and estimated amount of customers.

        Saves prediction to permanent storage
        and should be fetched from there.
        """
        waste = data_repo.get_avg_meals_waste_ratio()
        for waste_type in waste:
            for restaurant, weight in waste[waste_type].items():
                waste[waste_type][restaurant] = list(
                    map(lambda i: i*weight, self._predict_next_week()))
                
        data_repo.save_latest_biowaste_prediction(waste)

    def _predict_next_week(self, num_of_days: int, menu_plan: list):
        """Return a list of predictions
        for the next week from current date.

        num_of_days represents the length of week,
        or, how many days the restaurant is open.

        menu_plan represents the menus for the days.
        It should be a list of lists. The main list for each day
        and inner list for each dish.

        Data struct:
            list of int: list of predictions where index is offset from current day

        Is saved to permanent storage.
        """
        day_offset = list(range(0, num_of_days))
        pred = list(map(self.__predict, day_offset, menu_plan))
        data_repo.save_latest_weekly_prediction(pred)

    def _predict_occupancy(self):
        """Fetches the average occupancy by hour by day by restaurant
        for all restaurants as a dictionary.

        To get occupancy for a given restaurant and day, simply use 
        dict[restaurant_name][day_as_int] = [avg occupancy for hours 0-23]

        This is expected to change into a more dynamic prediction.
        """
        prediction = data_repo.get_average_occupancy()
        data_repo.save_latest_occupancy_prediction(prediction)

    def get_weekly_prediction(self):
        """Will use data_repository to fetch the latest
        prediction of sold meals stored in a desired place. Currently
        in a database. Is necessary to allow faster load
        times for the website.

        This should be used by the routes function.
        """
        return data_repo.get_latest_weekly_prediction()

    def get_biowaste_prediction(self):
        """Will use data_repository to fetch the latest
        biowaste prediction stored in a desired place. Currently
        in a database. Is necessary to allow faster load
        times for the website.
        
        This should be used by the routes function.
        """
        return data_repo.get_latest_biowaste_prediction()

    def get_occupancy_prediction(self):
        """Will use data_repository to fetch the latest
        prediction of occupancy stored in a desired place. Currently
        in a database. Is necessary to allow faster load
        times for the website.
        
        This should be used by the routes function.
        """
        return data_repo.get_latest_occupancy_prediction()




if __name__ == "__main__":
    model = ModelService()
    model.fit_and_save()
    model.test_model()
    