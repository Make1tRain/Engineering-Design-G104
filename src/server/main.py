import rsa
import json 
import datetime 
import os 

# CONSTANTS 
with open("keys/_privatekey.txt", "r") as file:
    SERVER_PRIV_KEY = rsa.PrivateKey.load_pkcs1((file.read().encode()))
with open("keys/_publicKey.txt", "r") as file:
    SERVER_PUBLIC_KEY = rsa.PublicKey.load_pkcs1((file.read().encode()))




def listen(): 
    pass 

def send(): 
    pass 

def get_data_from_database(): 
    pass # create a trial database to work on it 


def handle_client(): 
    msg = listen()
    info = rsa.decrypt(msg, )

