from yt_dlp import YoutubeDL
import firebase_admin
from firebase_admin import credentials, db
from dotenv import load_dotenv
import os
from colorama import Fore, init
import urllib.request

load_dotenv()
init(autoreset=True)

db_url = os.getenv("DATABASE_URL")
cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': db_url
})

song_output_path = "C:/Users/prath/OneDrive/Coding/React Website/BrunoWave-MusicService/client/src/assets/music/audio"
thumbnail_output_path = "C:/Users/prath/OneDrive/Coding/React Website/BrunoWave-MusicService/client/src/assets/music/image"

music = {}

def retrieve_data_from_firebase():
    global music
    ref = db.reference('/')
    songs = ref.get()
    for song, data in songs.items():
        artist, color, url, downloadAudio, downloadThumbnail = data['artist'], data['color'], data['url'], data['downloadAudio'], data['downloadThumbnail']
        if downloadAudio == 1:
            music[(song, artist, color)] = url
        else:
            music[(song, artist, color)] = "not available"

    print(f"{Fore.GREEN}Data retrieved successfully.")

def download_audio(songs, output_path):
    audio_extensions = {}
    ref = db.reference('/')
    musics = ref.get()

    for songData, data in musics.items():
        if data['downloadAudio'] == 1:
            for name, url in songs.items():
                if url != "not available" and name[0] == songData:
                    song_title = name[0].lower().replace(" ", "-")
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
            print(f"{Fore.RED}Song {songData} is NOT MARKED FOR DOWNLOAD.")

    return audio_extensions


def download_thumbnail(songs, output_path):
    ref = db.reference('/')
    musics = ref.get()

    for songData, data in musics.items():
        if data['downloadThumbnail'] == 1:
            for name, url in songs.items():
                if url != "not available" and name[0] == songData:
                    ydl_opts = {'quiet': True}
                    with YoutubeDL(ydl_opts) as ydl:
                        info_dict = ydl.extract_info(url, download=False)
                        thumbnail_url = info_dict.get('thumbnail', None)
                        if thumbnail_url:
                            song_title = name[0].replace(" ", "-").lower()
                            filename = os.path.join(output_path, f"{song_title}.jpeg")
                            urllib.request.urlretrieve(thumbnail_url, filename)
                            print(f"{Fore.GREEN}Thumbnail DOWNLOADED SUCCESSFULLY for {name[0]} by {name[1]}.")

                            data['downloadThumbnail'] = 0
                            ref.child(songData).update(data)
                        else:
                            print(f"{Fore.RED}No thumbnail found for {name[0]} by {name[1]}.")
                    break
        else:
            print(f"{Fore.RED}Thumbnail for {songData} is NOT MARKED FOR DOWNLOAD.")


def create_json(songs, output_path, audio_extensions):
    with open(output_path, "w") as js_file:
        for name, _ in songs.items():
            title = name[0]
            song_extension = audio_extensions.get(name, 'webm')  # Get the correct extension
            js_file.write(
                f"import {title.lower().replace(' ', '')}Audio from '../assets/music/audio/{title.lower().replace(' ', '-')}.{song_extension}';\n")
            js_file.write(
                f"import {title.lower().replace(' ', '')} from '../assets/music/image/{title.lower().replace(' ', '-')}.jpeg';\n")

        js_file.write("export const titles = [\n")
        for i, (name, url) in enumerate(songs.items(), start=1):
            title, artist, color = name
            js_file.write("  {\n")
            js_file.write(f"    id: {i},\n")
            js_file.write(f"    audio: {title.lower().replace(' ', '')}Audio,\n")
            js_file.write(f"    image: {title.lower().replace(' ', '')},\n")
            js_file.write(f"    title: '{title}',\n")
            js_file.write(f"    artist: '{artist}',\n")
            js_file.write(f"    color: 'text-[{color}]',\n")
            js_file.write(f"    bgColor: 'bg-[{color}]',\n")
            js_file.write(f"    colorCode: '{color}',\n")
            js_file.write("  },\n")

        js_file.write("];\n")

    print(f"{Fore.BLUE}JS array created successfully.")


def main():
    retrieve_data_from_firebase()
    audio_extensions = download_audio(music, song_output_path)
    download_thumbnail(music, thumbnail_output_path)
    create_json(music, "C:/Users/prath/OneDrive/Coding/React Website/BrunoWave-MusicService/client/src/constants/titles.js", audio_extensions)


if __name__ == "__main__":
    main()
