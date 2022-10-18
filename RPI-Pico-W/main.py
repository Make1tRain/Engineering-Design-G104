#imports
from pca import PCA9685
from machine import I2C, Pin
from servo import Servos
import utime, network
import socket, json

#connections
sda=Pin(0) 
scl=Pin(1)
id=0
i2c = I2C(id=id, sda=sda, scl=scl)

#variables
pca = PCA9685(i2c=i2c)
servo= Servos(i2c=i2c)
wlan = network.WLAN(network.STA_IF)

SERVER_IP = "" 
PORT = 5555 # random 
machine_id = "A2D2Z9g58esfsGwtcJysNxwR"
client = socket.socket(socket.AF_INET6, socket.SOCK_STREAM)

plastic_index = 0
paper_index = 1
glass_index = 2

#flags
start = True

#functions

def servo_rotation(n):
    servo.position(index = n, degrees = 80)
    utime.sleep(3)
    servo.position(index = n, degrees = 0)
    
#part of the main code
wlan.active(True)
wlan.connect("", "") #wifi_adress + code
while wlan.isconnected() == False:
    pass

client.connect((SERVER_IP, PORT ))

 
while start:
    msg = client.recv(1024)
        # properly decrypt the message 
    if msg == "glass": 
            servo_rotation(glass_index)
    if msg == "plastic": 
            open_plastic(plastic_index)
    if msg == "paper": 
            open_paper(paper_index)
