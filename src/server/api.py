from fastapi import FastAPI
import sqlite3
import pandas as pd
import json 
import socket
import uvicorn
""" 
To Run the API: 
uvicorn api:app --reload 
"""

app = FastAPI()

# Constants
ip = socket.gethostbyname(socket.gethostname()) 
port = "8000"

def get_type(barcode):
    conn = sqlite3.connect("./database/database")
    query = f'SELECT type FROM products WHERE barcode = {barcode}'
    return pd.read_sql_query(query, conn).iloc[0]["type"]


@app.get("/products/{barcode}")
async def get_product_type(barcode: str):
    # to not get an sql injection attack, we must check the inputs before sending the data to the db

    itemType = get_type(barcode)
    
    print(barcode, itemType)
    with open("data.json", "w") as file: 
       file.write(json.dumps({"response":"True", "material":itemType}))

    return json.dumps({"type": itemType})

if __name__ == "__main__": 
    uvicorn.run(app, host=ip, port=port)