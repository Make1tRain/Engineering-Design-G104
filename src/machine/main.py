import socket, json 
""" 
We only need to send data to the server so, 
there is only write function and no listen function 
"""


# CONSTANTS 
SERVER_IP = "localhost" 
PORT = 5555 # random 
machine_id = "A2D2Z9g58esfsGwtcJysNxwR" 




client = socket.socket(socket.AF_INET6, socket.SOCK_STREAM)
client.connect((SERVER_IP, PORT))


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