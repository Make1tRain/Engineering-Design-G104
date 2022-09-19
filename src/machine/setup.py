import rsa, time, os 

SERVER_PUBLIC_KEY = """-----BEGIN RSA PUBLIC KEY-----
MIIChwKCAn4AlMbpwGAr0wtPWK8ePMIGSZTQau+VUa9rSqJYZujGjPD3E1FKCStv
ts2fRtMmhVEKDVTDZGEhjpp/T02+KYUUmZO9VLioLN8FvHhkNpxbZ0NBDBn97z5v
mUNy5rVVh0P3gI6plfUSwIfGhIjSjJhTes6S1B9IjUF15C+ISedcpgHHQjhntSyu
IxHmheBDzCIGihsImcblHk0AALo5jUkBp8nBnFIRYs4mDZXkyOikKjaTKo8/MkiS
suzoD2fdsnQFm5N+V2SZbcDWreCBCxEb4exX9mrFHWqdl6SDmP6BEfgUvT9JfZ/Z
8e2NGEL8HqeAh9gkQg7V/hxRoC+MfIRvjnFk+jA1ZTDEMcBk/5KRikaJi1fFKNpO
R1tapr4LeEGZCTbv2KqmECl6UuzVN5GeUJargdy0xX5ozwKHCKZfsTuQQcqQTp8N
B7i60iyGBarBTAyeSIoDPNS+O4SgLXK23MO1FHis3BxKqZ2K6tUITyzC6x2Sl+cZ
tXYZfXDEYV6MxW4yV5arfGCbDm+kZFt/hllV9f+Kwn7AxmvNodf1u9NYLyyr2bsu
GrQWmAirHojqz1JJEdzsoTcDarPEoFws25r11u4MCi3WpiN+F/191KRMhNNcP3BP
lfWvVt60VMsVEEPiBlbPIddh8jmgrgipTJxNSYk59L9CRO3+HnbicoYdexqJetCU
S1iDwV+xpofkxLR2PMTes4uORBFaVk3W4CXtKGwpD6Ou6XB+0RuzNXDUL2JZ5tDu
Kz0i04OOu5taWSstg2l86gHQQAkqwZSBe50ZA6gOrghfSg+QI3W6YEKpJqq/OqUP
MKftYf6aOBSBfz4nIjRyCudFYa0qvQIDAQAB
-----END RSA PUBLIC KEY-----"""

def key_generation():
    print("[+] Generating Keys ...")
    print("[i] This may take around 30 or more seconds")
    start = time.time()

    


    pubKey, privKey = rsa.newkeys(5096)

    if os.path.exists("./keys") == False: 
        os.mkdir("keys")

    # WRITE CLIENT KEYS 
    with open("keys/_publickey.txt","wb") as file: file.write(pubKey.save_pkcs1())
    with open("keys/_privatekey.txt","wb") as file: file.write(privKey.save_pkcs1())

    # WRITE SERVER KEY
    with open("keys/_serverPublickey.txt","w") as file: file.write(SERVER_PUBLIC_KEY)

    end = time.time()
    print("[+] Keys Generated")
    print(f"Key generation Time: {end-start}")

key_generation()