import sqlite3
import pandas as pd 


# connect to the database
def create_database(db_name:str, xlsx_relative_path:str) -> None: 
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor() 
    cursor.execute("CREATE TABLE IF NOT EXISTS products (Product text, Barcode, Type)")
    conn.commit() 
    df = pd.read_excel(xlsx_relative_path)
    df.to_sql("products",conn, if_exists='replace', index=False)

# create_database("database","data.xlsx")
