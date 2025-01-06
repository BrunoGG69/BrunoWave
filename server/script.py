from yt_dlp import YoutubeDL # used to download audio and thumbnail
import firebase_admin # Used for interacting with Firebase
from firebase_admin import credentials, db # Used for authenticating with Firebase and interacting with the database
from dotenv import load_dotenv # Used for loading environment variables from a .env file
import os # Used for interacting with the operating system
from colorama import Fore, init # Used for colored output in console
import urllib.request # Used for downloading thumbnail images
from addDataToFirebase import mainScript # Used to add music to Firebase Database

from PIL import Image # Used to crop the thumbnail images

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

music = {}

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

# Function that sets all the download parameters in the db to 1 to download everything again
def set_data_to_one():
    ref = db.reference('/')
    songs = ref.get()

    for songData, data in songs.items():
        data['downloadAudio'] = 1
        data['downloadThumbnail'] = 1
        data['cropImage'] = 1
        ref.child(songData).update(data)

    print(f"{Fore.GREEN}All downloads have been set to 1.")

# Function to download audio files
def download_audio(songs, output_path):
    audio_extensions = {}
    ref = db.reference('/')
    musics = ref.get()

    # Loop through the songs and download the audio files
    for songData, data in musics.items():
        if data['downloadAudio'] == 1:
            for name, url in songs.items():
                if url != "not available" and name[0] == songData:
                    song_title = name[0].lower().replace(' ', '').replace('-', '').replace('+','plus')
                    ydl_opts = {
                        'format': 'bestaudio/best',
                        'outtmpl': os.path.join(output_path, f"{song_title}.%(ext)s"),
                        'quiet': False,
                        'noplaylist': True,
                    }
                    print(f"{Fore.GREEN}Downloading audio: {name[0]} by {name[1]}")
                    with YoutubeDL(ydl_opts) as ydl:
                        info_dict = ydl.extract_info(url, download=True)
                        file_extension = info_dict.get('ext', 'mp3')
                        audio_extensions[name] = file_extension
                    print(f"{Fore.BLUE}{name[0]} by {name[1]} downloaded successfully.")

                    data['downloadAudio'] = 0
                    ref.child(songData).update(data)
                    break
        else:
            print(f"{Fore.YELLOW}SONG {songData} is NOT MARKED FOR DOWNLOAD.")

    return audio_extensions

# Function to download thumbnail images
def download_thumbnail(songs, output_path):
    ref = db.reference('/')
    musics = ref.get()

    # Loop through the songs and download the thumbnail images
    for songData, data in musics.items():
        if data.get('downloadThumbnail') == 1:
            for name, url in songs.items():
                if url != "not available" and name[0] == songData:
                    print(f"{Fore.GREEN}Downloading thumbnail for {name[0]} by {name[1]}")
                    ydl_opts = {'quiet': True}
                    with YoutubeDL(ydl_opts) as ydl:
                        info_dict = ydl.extract_info(url, download=False)
                        thumbnail_url = info_dict.get('thumbnail', None)
                        if thumbnail_url:
                            song_title = name[0].lower().replace(' ', '').replace('-', '').replace('+','plus')
                            filename = os.path.join(output_path, f"{song_title}.jpeg")
                            urllib.request.urlretrieve(thumbnail_url, filename)
                            print(f"{Fore.GREEN}Thumbnail DOWNLOADED SUCCESSFULLY for {name[0]} by {name[1]}.")
                            data['downloadThumbnail'] = 0
                            ref.child(songData).update(data)
                        else:
                            print(f"{Fore.RED}No thumbnail found for {name[0]} by {name[1]}.")
                    break
        else:
            print(f"{Fore.CYAN}Thumbnail for {songData} is NOT MARKED FOR DOWNLOAD.")

# After Image Downloads, crop the image to remove the excess colors from the side
def crop_image(songs, output_path):
    ref = db.reference('/')
    musics = ref.get()

    for songData, data in musics.items():
        if data.get('cropImage') == 1:
            for name, url in songs.items():
                if url != "not available" and name[0] == songData:
                    print(f"{Fore.GREEN}Cropping Image for {name[0]} by {name[1]}")
                    song_title = songData.lower().replace(' ', '').replace('-', '').replace('+','plus')
                    filename = f"{output_path}/{song_title}.jpeg"
                    img = Image.open(filename)
                    width, height = img.size
                    left = 280
                    right = width - 280
                    crop_box = (left, 0, right, height)
                    cropped_img = img.crop(crop_box)
                    cropped_img.save(filename, "JPEG")
                    print(f"{Fore.GREEN}Cropped image saved as {song_title}.jpeg")
                    data['cropImage'] = 0
                    ref.child(songData).update(data)
                    break
        else:
            print(f"{Fore.MAGENTA}Thumbnail for {songData} is NOT MARKED FOR CROPPING.")


def create_array(songs, output_path, audio_extensions):
    with open(output_path, "w") as js_file:
        for name, _ in songs.items():
            title = name[0]
            song_extension = audio_extensions.get(name, 'webm')
            if title != "Funk Universo":
                js_file.write(
                    f"import {title.lower().replace(' ', '').replace('-', '').replace('+','plus')}Audio from '../assets/music/audio/{title.lower().replace(' ', '').replace('-', '').replace('+','plus')}.{song_extension}';\n")
            else:
                js_file.write(
                    f"import {title.lower().replace(' ', '').replace('-', '').replace('+','plus')}Audio from '../assets/music/audio/{title.lower().replace(' ', '').replace('-', '').replace('+','plus')}.mp3';\n")
            js_file.write(
                f"import {title.lower().replace(' ', '').replace('-', '').replace('+','plus')} from '../assets/music/image/{title.lower().replace(' ', '').replace('-', '').replace('+','plus')}.jpeg';\n")

        js_file.write("export const titles = [\n")
        for i, (name, url) in enumerate(songs.items(), start=1):
            title, artist, color = name
            js_file.write("  {\n")
            js_file.write(f"    id: {i},\n")
            js_file.write(f"    audio: {title.lower().replace(' ', '').replace('-', '').replace('+','plus')}Audio,\n")
            js_file.write(f"    image: {title.lower().replace(' ', '').replace('-', '').replace('+','plus')},\n")
            js_file.write(f"    title: '{title}',\n")
            js_file.write(f"    artist: '{artist}',\n")
            js_file.write(f"    color: 'text-[{color}]',\n")
            js_file.write(f"    bgColor: 'bg-[{color}]',\n")
            js_file.write(f"    colorCode: '{color}',\n")
            js_file.write("  },\n")

        js_file.write("];\n")

    print(f"{Fore.BLUE}JS array created successfully.")

# The main function
def main():
    confirmation = input("Do you want to add music to the database? (y/n): ") # Ask the user if they want to add music to the database
    # confirmation = 'n'
    # If the user confirms, run the mainScript function
    if confirmation.lower() == 'y':
        mainScript()
    else:
        print(f"{Fore.RED}No music added to the database.")

    # The retrieval download, and storing values in array
    retrieve_data_from_firebase()
    audio_extensions = download_audio(music, song_output_path)
    download_thumbnail(music, thumbnail_output_path)
    crop_image(music, thumbnail_output_path)
    create_array(music, array_output_path, audio_extensions)


if __name__ == "__main__":
    main()
    # set_data_to_one()