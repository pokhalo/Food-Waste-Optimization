from sqlalchemy import text


def insert_df_to_db(name: str, df, engine):
    df.to_sql(name=name, con=engine, if_exists='replace')
    return


def lookup_table_from_db(db, name):
    sql = text(f"SELECT * FROM {name};")
    rs = db.session.execute(sql)
    result = rs.fetchall()
    return result
