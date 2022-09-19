import rsa, os 


def key_generation():
    print("[+] Generating Keys ...")
    print("[i] This may take around 30 or more seconds")

    pubKey, privKey = rsa.newkeys(5096)

    if os.path.exists("./keys") == False: 
        os.mkdir("keys")
    with open("keys/_publickey.txt","wb") as file: file.write(pubKey.save_pkcs1())
    with open("keys/_privatekey.txt","wb") as file: file.write(privKey.save_pkcs1())

    print("[+] Keys Generated")

key_generation()