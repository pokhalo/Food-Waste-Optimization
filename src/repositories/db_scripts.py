import pandas as pd


class DatabaseScript:
    """Class to import data to database.
    Should not be imported to anything, but
    run on it's own once to init database.
    """

    def __init__(self, db_connection=None):
        self.database_connection = db_connection

    def import_biowaste(self, filepath="src/data/basic_mvp_data/Biowaste.csv"):
        """Function to insert biowaste data from csv file to database.
        Requires specific csv file which is modified to allow datapoints to be float: repl "," -> "."

        Args:
            filepath (str, optional): filepath of biowaste data. Defaults to "src/data/basic_mvp_data/Biowaste.csv".
        """
        df = pd.read_csv(filepath, sep=";")
        df.index = pd.to_datetime(df.pop("Date"), format="%d.%m.%Y")
        df.iloc[:, -4:] = df.iloc[:, -4:].astype(float)

        df.to_sql(name="biowaste", con=self.database_connection,
                  if_exists="replace")


if __name__ == "__main__":
    script = DatabaseScript()
    script.import_biowaste()

