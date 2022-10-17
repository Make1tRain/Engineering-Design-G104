import socket, json 
""" 
We only need to send data to the server so, 
there is only write function and no listen function 
"""


# CONSTANTS 
SERVER_IP = "" 
PORT = 5555 # random 
machine_id = "A2D2Z9g58esfsGwtcJysNxwR" 

# import rsa
# with open("keys/_serverPubKey.txt","r") as file:
#     SERVER_PUBLIC_KEY = rsa.PublicKey.load_pkcs1(file.read())
# with open("keys/_privateKey.txt","r") as file:
#     PRIV_KEY = rsa.PrivateKey.load_pkcs1(file.read())
# with open("keys/_publicKey.txt","r") as file:
#     PUB_KEY = rsa.PublicKey.load_pkcs1(file.read())
# def write(message:str): # message is the barcode (number on it )
#     client.send(rsa.encrypt(message.encode(), SERVER_PUBLIC_KEY))


client = socket.socket(socket.AF_INET6, socket.SOCK_STREAM)
client.connect((SERVER_IP, PORT ))


def open_glass():
    pass  

def open_plastic():
    pass  

def open_paper(): 
    pass 

def error(): 
    pass 

def shutdown(): 
    pass 

def main(): 
    while True:
        msg = client.recv(1024)
        # properly decrypt the message 
        if msg == "glass": 
            open_glass()
        elif msg == "plastic": 
            open_plastic() 
        elif msg == "paper": 
            open_paper()
        elif msg == "shutdown": 
            shutdown() 
        else:
            error()

main()