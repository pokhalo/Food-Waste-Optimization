from sqlalchemy import text
import pandas as pd

def insert_df_to_db(name:str, df, engine):
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
    def __init__(self, db_connection=None):
        self.database_connection = db_connection

    def insert_biowaste(self, filepath="src/data/basic_mvp_data/Biowaste.csv"):
        """Function to insert biowaste data from csv file to database.
        Requires csv file which is modified to allow datapoints to be float: repl "," -> "."
        Will append new data to old, if old exists.

        Args:
            filepath (str, optional): filepath of biowaste data. Defaults to "src/data/basic_mvp_data/Biowaste.csv".
        """
        df = pd.read_csv(filepath, sep=";")
        df.index = pd.to_datetime(df.pop("Date"), format="%d.%m.%Y")
        try:
            df.iloc[:,-4:] = df.iloc[:,-4:].astype(float)
            df.to_sql(name="biowaste", con=self.database_connection, if_exists="append")
        except Exception as error:
            print("Error in inserting biowaste data into database. The file might be the wrong format. Try replacing ',' with '.':", error)

    def insert_sold_lunches(self, filepath="src/data/basic_mvp_data/Sold lunches.csv"):
        """Function to insert sold lunches data from csv file to database.
        Requires a specific csv file. Will append new data if old is found.

        Args:
            filepath (str, optional): filepath of sold lunches data. Defaults to "src/data/basic_mvp_data/Sold lunches.csv".
        """
        df = pd.read_csv(filepath, sep=";")
        try:
            df = df.drop(columns=["Unnamed: 6", "Unnamed: 7", "Unnamed: 8"])
            df.to_sql(name="sold_lunches", con=self.database_connection, if_exists="append")
        except KeyError as error:
            print("Error in inserting sold lunches into database. The file might be the wrong format.", error)
        
        
        
        