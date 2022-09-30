from fastapi import FastAPI
import sqlite3
import pandas as pd
import json 
""" 
To Run the API: 
uvicorn api:app --reload 
"""

app = FastAPI()

def get_type(barcode):
    conn = sqlite3.connect("./database/database")
    query = f'SELECT type FROM products WHERE barcode = "{barcode}"'
    return pd.read_sql_query(query, conn).iloc[0]["type"]


@app.get("/products/{barcode}")
async def get_product_type(barcode: str):
    # to not get an sql injection attack, we must check the inputs before sending the data to the db
    if len(barcode) == 6:
        pass

    itemType = get_type(barcode)

    with open("data.json", "w") as file: 
       file.write(json.dumps({"response":"True", "type":itemType}))

    return {"type": itemType}
