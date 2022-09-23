import rsa, socket, os, json, sqlite3
import utils 


# CONSTANTS 
# SERVER KEYS 
with open("keys/_privatekey.txt", "r") as file:
    SERVER_PRIV_KEY = rsa.PrivateKey.load_pkcs1((file.read().encode()))
with open("keys/_publicKey.txt", "r") as file:
    SERVER_PUBLIC_KEY = rsa.PublicKey.load_pkcs1((file.read().encode()))

# MACHINE PUBLIC KEYS 
importedKeyID = os.listdir("./keys/bin_keys")
importedKeys = []
for a in importedKeyID: 
    with open(f"keys/bin_keys/{a}") as file: 
        importedKeys.append(rsa.PublicKey.load_pkcs1((file.read().encode())))
keys = list(zip([a[:-4] for a in importedKeyID], importedKeys))

# CREATION OF THE SERVER (LISTENER)
SERVER_IP = "localhost" # localhost for testing purposes 
PORT = 55555 
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((SERVER_IP,PORT))

# connection to the database 
databaseName = "x.db" # this will change
conn_db = sqlite3.connect(databaseName)
query = 'SELECT' # this will be modified according to the input given by the barcode 



def handle_client(conn):
    while True: 
        with open("data.json","r") as file: 
            data = json.loads(file.read())
        
        if bool(data["response"]) == True: 
            conn.send(data["material"]) # plastic, carton or aaaaa

    

def main(): 
    print("[i] Server Listening")
    
    server.listen()
    conn, addr = server.accept()
    
    print("[i] Connection Made")

    data = rsa.decrypt(conn.recv(1024),SERVER_PRIV_KEY)

    # the machine will send its id in the first message 
    if data[0:2] == "id": 
        trashCan = utils.Bin(data[3:26], conn)
    
    # handle_client(conn)
