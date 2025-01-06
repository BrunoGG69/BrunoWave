import firebase_admin # Used for interacting with Firebase
from firebase_admin import credentials, db # Used for authenticating with Firebase and interacting with the database
from dotenv import load_dotenv # Used for loading environment variables from a .env file
import os # Used for interacting with the operating system
from colorama import Fore, init # Used for colored output in console
from PIL import Image # Used to crop the thumbnail images

music = {}

load_dotenv() # Load environment variables from a .env file
init(autoreset=True) # Initialize colorama

# Initialize Firebase Admin SDK
db_url = os.getenv("DATABASE_URL")
cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': db_url
})

# Path to save the files
song_output_path = os.getenv("SONG_OUTPUT_PATH")
thumbnail_output_path = os.getenv("THUMBNAIL_OUTPUT_PATH")
array_output_path = os.getenv("ARRAY_OUTPUT_PATH")

# Function to retrieve data from Firebase
def retrieve_data_from_firebase():
    global music
    ref = db.reference('/')
    songs = ref.get()

    # Loop through the songs and store the data in the music dictionary
    for song, data in songs.items():
        artist, color, url, downloadAudio, downloadThumbnail = data['artist'], data['color'], data['url'], data['downloadAudio'], data['downloadThumbnail']
        if downloadAudio == 1:
            music[(song, artist, color)] = url
        else:
            music[(song, artist, color)] = "not available"

    print(f"{Fore.GREEN}Data retrieved successfully.")

# def crop_image(output_path = thumbnail_output_path):
#     ref = db.reference('/')
#     musics = ref.get()
#
#     for songData, data in musics.items():
#         song_title = songData.lower().replace(' ', '').replace('-', '').replace('+','plus')
#         filename = f"{output_path}/{song_title}.jpeg"
#         img = Image.open(filename)
#         width, height = img.size
#         left = 280
#         right = width - 280
#         crop_box = (left, 0, right, height)
#         cropped_img = img.crop(crop_box)
#         cropped_img.save(filename, "JPEG")
#         print(f"{Fore.GREEN}Cropped image saved as {filename}")

retrieve_data_from_firebase()
# crop_image()