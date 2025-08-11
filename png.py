from PIL import Image
import requests
from io import BytesIO

# Rasm URL dan yuklab olish
image_url = "https://upload.wikimedia.org/wikipedia/commons/9/97/Super_Baraban_Shou_logo.png"
response = requests.get(image_url)
img = Image.open(BytesIO(response.content)).convert("RGBA")

# Har bir pikselni tekshirib, fonni shaffof qilish
datas = img.getdata()
newData = []
for item in datas:
    if item[0] > 200 and item[1] > 200 and item[2] > 200:
        newData.append((255, 255, 255, 0))  # Shaffof
    else:
        newData.append(item)

img.putdata(newData)
img.save("super_baraban_transparent.png", "PNG")
print("Shaffof fonli fayl saqlandi.")
