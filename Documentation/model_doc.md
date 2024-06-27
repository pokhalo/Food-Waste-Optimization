# Documentation for the ML model, its dependencies and more


## ML model
- There are currently two possible models to use: Linear Regression and a Neural Network. A NN is used so text input is possible. The linear model is simple and does not need separate explaining. It probably wont work. 

### How the NN works
First the data is fetched from the database (db_repository), then it is combined into a desired dataframe (data_repository). Then, the menu items are encoded as one hot encoding (language processor). Then it is turned into numpy matrices of X (meaning feature matrix) and y (the correct value). Then it is split into training and testing data. 

When calling _learn, it will take training data, it will scale it and start fitting. Fitting algos etc. are done by the library itself. 

NeuralNetwork class is a subclass of ML_Model, this is so there can be multiple models efficiently. 

