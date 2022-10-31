import  socket, json

# CREATION OF THE SERVER (LISTENER)
SERVER_IP = socket.gethostbyname(socket.gethostname())  # localhost for testing purposes 
PORT = 5555
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((SERVER_IP,PORT))




def handle_client(conn):
    while True: 
        with open("data.json","r") as file: 
            print("read")
            raw_data = file.read()
            if type(raw_data) != str:
                raw_data.decode()
            data = json.loads(raw_data)
        
        if bool(data["response"]) == True: 
            print("sent")
            conn.send((data["material"]).encode()) # plastic, carton or 


        with open("data.json","w") as file: 
            data = json.dumps({"response":"False", "material":""})
            file.write(data)

    

def main(): 
    print("[i] Server Listening")
    
    server.listen()
    conn, addr = server.accept()
    
    print("[i] Connection Made")
    
    handle_client(conn)

main()