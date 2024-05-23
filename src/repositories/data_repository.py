import pandas as pd
import numpy as np

class DataRepository:
    """Class to handle connection to data stream
    """

    def get_df_from_stationary_data(self):
        """Get the stationary data from the folder 'data'.
        Requires the necessary files under the folder 'data'.
        Takes only data from Exactum.

        Useful for testing and basic MVP. 

        Returns: pandas dataframe
        """
        hourly_customer = pd.read_excel(io="src/data/basic_mvp_data/Tuntikohtainen asiakasmäärä v2.xlsx", index_col=0)
        hourly_customer_exactum = hourly_customer[hourly_customer["Ravintola"] == "620 Exactum"]
        receipts_by_date_exactum = hourly_customer_exactum.groupby("Date").sum()["Kuitti kpl"]

        customer_data = self.merge_multiple_excel_sheets("src/data/basic_mvp_data/Kopio_Kumpula asiakasdataa.xlsx")
        supersight_data = self.get_people_flow_by_date("src/data/basic_mvp_data/supersight-raw-data.csv")

        data = pd.merge(receipts_by_date_exactum, customer_data, on="Date")

        #data = pd.concat([supersight_data, data])
        data = pd.merge(data, supersight_data, on="Date")

        print(data)


    
    def get_people_flow_by_date(self, filename):
        data = pd.read_csv(filepath_or_buffer=filename, sep=",")
        data["Date"] = pd.to_datetime(data["dateCreated"])
        data.set_index("Date", inplace=True)
        
        daily_sum_diff = data.resample('D').sum()['countIn'] - data.resample('D').sum()['countOut']

        daily_sum_diff.name = "People flow diff"

        return daily_sum_diff.tz_convert(None)
    

    def merge_multiple_excel_sheets(self, filename):
        """Combines multiple excel sheets into one pandas dataframe.

        Args:
            filename (_type_): _description_
        """
        excel_data = pd.read_excel(io=filename, sheet_name=None, skiprows=1, index_col=0)

        sold_meals_exactum = excel_data["Myydyt lounaat"]["620 Exactum"][1:]
        
        cols_for_exactum = excel_data["Myytyjen lounaiden suhde"].columns[-14:]
        dist_sold_meals_exactum = excel_data["Myytyjen lounaiden suhde"][cols_for_exactum][1:]

        cols_for_exactum = excel_data["Biojäte"].columns[10:-5]
        biowaste_exactum = excel_data["Biojäte"][cols_for_exactum]

        # set up new header for biowaste
        new_header = biowaste_exactum.iloc[0]
        biowaste_exactum = biowaste_exactum[2:]
        biowaste_exactum.columns = new_header

        # merge based on index, which is date
        combined_data = pd.merge(sold_meals_exactum, dist_sold_meals_exactum, left_index=True, right_index=True, how="inner")
        combined_data = pd.merge(combined_data, biowaste_exactum, left_index=True, right_index=True, how="inner")

        # create date object
        np.insert(combined_data.columns.values, 0, "Date")
        combined_data["Date"] = pd.to_datetime(combined_data.index.values, dayfirst=True)
        combined_data = combined_data.set_index(keys="Date")

        return combined_data


a = DataRepository()

b = a.get_df_from_stationary_data()

print(b)



