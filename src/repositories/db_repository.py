from sqlalchemy import text
from ..app.db import db, engine
import pandas as pd
import numpy as np

def get_test_value():
    sql = text("SELECT name FROM test")
    result = db.session.execute(sql,)
    value = result.fetchone()[0]
    return value

def insert_df_to_db(name: str, df, engine):
    df.to_sql(name=name, con=engine, if_exists='replace')
    return


def lookup_table_from_db(db, name):
    sql = text(f"SELECT * FROM {name};")
    rs = db.session.execute(sql)
    result = rs.fetchall()
    return result

class DatabaseRepository:
    """Class to insert data into database. Can be
    used to initialize with data and add data to 
    existing database.
    """
    def __init__(self):
        self.database_connection = engine

    def insert_biowaste(self, filepath="src/data/basic_mvp_data/Biowaste.csv"):
        """Function to insert biowaste data from csv file to database.
        Requires csv file which is modified to allow datapoints to be float: repl "," -> "."
        Will append new data to old, if old exists.

        Args:
            filepath (str, optional): filepath of biowaste data. Defaults to "src/data/basic_mvp_data/Biowaste.csv".
        """

        # try to load biowaste file and create DateTime object to it
        try:
            df = pd.read_csv(filepath, sep=";")
            df.index = pd.to_datetime(df.pop("Date"), format="%d.%m.%Y")
        except Exception as err:
            print("Error in trying to load biowaste file or creating DateTime object from it:", err)

        # try to process data str -> float and insert into database
        try:
            df.iloc[:,-4:] = df.iloc[:,-4:].astype(float)
            df.to_sql(name="biowaste", con=self.database_connection, if_exists="append")
        except Exception as err:
            print("Error in inserting biowaste data into database. The file might be the wrong format. Try replacing ',' with '.':", err)

    def insert_sold_lunches(self, filepath="src/data/basic_mvp_data/Sold lunches.csv"):
        """Function to insert sold lunches data from csv file to database.
        Requires a specific csv file. Will append new data if old is found.

        Args:
            filepath (str, optional): filepath of sold lunches data. Defaults to "src/data/basic_mvp_data/Sold lunches.csv".
        """
        
        # create a dataframe from the file and create DateTime object from timestamps
        try:
            df = pd.read_csv(filepath, sep=";", low_memory=False)
            df['DateTime'] = pd.to_datetime(df['Date'] + ' ' + df['Receipt time'], format="%d.%m.%Y %H:%M")
            df = df.drop(columns=["Date", "Receipt time", "Unnamed: 6", "Unnamed: 7", "Unnamed: 8"])
        except KeyError as err:
            print("Error in trying to create a datetime object from dataframe:", err)

        # split dataframe into separate Series objects for specific processing, names become ids
        try:
            df["Restaurant"] = self.insert_restaurants(df["Restaurant"])
            df["normalized CO2"] = df["Hiilijalanjälki"] / df["pcs"]
            df = df.drop(columns="Hiilijalanjälki")
            print(df)
            df["Dish"] = self.insert_dishes(df["Dish", "normalized CO2"])

            # category can be dropped, not needed in database
            self.insert_food_categories(df.pop("Food Category"))
        except KeyError as err:
            print("Error in splitting data into separate Series objects:", err)

        # insert remaining dataframe into database
        try:
            df.to_sql(name="sold_lunches", con=self.database_connection, if_exists="append")
        except Exception as err:
            print("Error in inserting sold lunches into database. The file might be the wrong format.", err)
        print(df)
    
    def insert_restaurants(self, restaurants: pd.Series):
        """Function to insert restaurants to database. If exists,
        skip, if new, append to old. Will create ids from restaurant names
        and return them. Restaurant id is 600, 610 etc.

        Args:
            restaurants (pd.Series): restaurants, e.g. 600 Chemicum

        Returns:
            restaurant ids (pd.Series): ids as int, e.g. 600
        """
        try:
            split_values = np.char.split(restaurants.values.astype(str), " ")
            values = [(item[0], item[1]) for item in split_values]
            ids = np.array([value[0] for value in split_values]).astype(int)
        except Exception as err:
            print("Processing restaurant data caused an error:", err)

        try:
            df = pd.DataFrame(values, columns=["id", "restaurant"])
            df.to_sql("restaurants", con=self.database_connection, if_exists="append")
        except Exception as err:
            print("Error in inserting restaurant data into database:", err)
            
        return ids
        
    def insert_food_categories(self, categories: pd.Series):
        """Function to insert food categories to database.
        After inserting into database, ids are fetched from 
        database and returned.

        Args:
            categories (pd.Series): categories of food, e.g. meat, fish

        Returns:
            ids : ids to replace the name representation of the category in a pd.Series
        """
        categories = categories.astype(str)
        try :
            categories.to_sql("categories", con=self.database_connection, if_exists="append")
        except Exception as err:
            print("Error in inserting food category data into database:", err)
        return self.get_id_from_db(table_name="categories", names=categories)

    def insert_dishes(self, dishes: pd.Series):
        """Function to insert dishes and their CO2 emissions (e.g. Nakkikastike 0.56) to database.
        After inserting into database, ids are fetched from 
        database and returned.

        Args:
            categories (pd.Series): names of dishes, e.g. Nakkikastike CO2Emissions

        Returns:
            ids : ids to replace the name representation of the dish name in a pd.Series
        """
        print(dishes)
        dishes = dishes.astype(str)
        try :
            dishes.to_sql("dishes", con=self.database_connection, if_exists="append")
        except Exception as err:
            print("Error in inserting dish data into database:", err)
        return self.get_id_from_db(table_name="dishes", names=dishes)


    def get_id_from_db(self, table_name: str, names: pd.Series):
        test_id = 1
        test_text = f"FROM {table_name} SELECT *"
        dish_names = test_id
        return dish_names

if __name__ == "__main__":
    db_repo = DatabaseRepository()
    db_repo.insert_sold_lunches()