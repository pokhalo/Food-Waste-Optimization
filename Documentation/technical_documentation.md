# Technical and structural documentation

## General structure
The sourcecode is divided into two separate structures, frontend and backend. Code in the frontend is intended to display the website for the user. There is a "bridge" from the backend to the frontend (_src/app/routes.py_) which is created using Flask. The backend consists of 2 main parts. There is a model for predictions (described later) and a database (schema in _Documentation/db/_). The whole project is run on Megasense server using Docker.

## ML model
- There are currently two possible models to use: Linear Regression and a Neural Network. A NN is used so text input is possible. The linear model is simple and does not need separate explaining. It probably wont work. 

### How the NN works
First the data is fetched from the database (db_repository), then it is combined into a desired dataframe (data_repository). Then, the menu items are encoded as one hot encoding (language processor). Then it is turned into numpy matrices of X (meaning feature matrix) and y (the correct value). Then it is split into training and testing data. 

When calling _learn, it will take training data, it will scale it and start fitting. Fitting algos etc. are done by the library itself. 

NeuralNetwork class is a subclass of ML_Model, this is so there can be multiple models efficiently. 

## Model Service
The idea of _model service_ is to be the connection point between frontend and backend (called using the bridge _routes.py_). The routes file will call functions from the model service class and should __not__ call any other class' functions. 

Model service will call functions in the _model's class_ itself(e.g. _NeuralNetwork_). This is so the application does not know which model is used, or how, just gets the values _model service_ provides

The model will then call functions from the class _data_repository_. This class is meant to be the bridge between the application and the database. The database (using _database_repository_) gives "raw" data and the data_repo will process it for the model. 

## Language processor
_Language_processor.py_ uses NLP techiques to process menu items (strings) into lemmas. The lemmas are encoded as numerals using [one-hot-encoding.](https://en.wikipedia.org/wiki/One-hot) This allows the AI model to handle text-based data as well. _Process_learn_ function reads a large set of menu items, saves their encodings to database and returns a list of encodings that correspond to given menu items. _Process_ function reads a smaller set of menu items (a week), fetches their matching encodings from the database and returns a list of the corresponding encodings. 

## Data_repository
The main idea behind data_repository is that the database will store data in a __raw__ format. We must process the data for it to be useful for the model. 

For example, the database gives us data using timestamps, but the model expects them as hourly counts. Data repository will then make the adjustments to the data. It is also easier to make changes this way if, for example, we would want to predict hourly counts instead.

The _data repository_ calls functions from the _database repository_ and is called by _model service_. 

## Database_repository
