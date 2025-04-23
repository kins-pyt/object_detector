import random
import datetime

print(datetime.datetime.now())


objects = ["😺 Kucing", "🐶 Anjing", "🐦 Burung", "🍞 Roti", "🤖 Robot", "🪄 Petasan"]
for i in range(5):
    objek = random.choice(objects)
    print(f"Robot berpikir: {objek}")
    confidence = random.randint(50,100)
    print(f"Yakin {confidence}% ini adalah {objek}")

with open("data_robox.txt", "w") as file:
    file.write("Ini memori robotmu!")

