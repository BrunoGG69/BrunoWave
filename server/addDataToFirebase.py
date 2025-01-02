from firebase_admin import credentials, db # Used for authenticating with Firebase and interacting with the database
from dotenv import load_dotenv # Used for loading environment variables from a .env file

load_dotenv() # Load environment variables from a .env file

# Dictionary containing the music data
music = {
        ("Funk Luminar", "Irokz", "#60d5ff"): "https://youtu.be/4GiZ2iNBHj4",
        ("Funk Universo", "Irokz", "#50C878"): "not available",
        ("Slay", "Irokz", "#f06beb"): "https://youtu.be/XPn4njeBLB4",
        ("Aura", "Ogryzek", "#9faeff"): "https://youtu.be/CgXFHAEVJtA",
        ("Empire", "Ogryzek", "#d98531"): "https://youtu.be/L8H7J8VANQo",
        ("Glory", "Ogryzek", "#e41b1d"): "https://youtu.be/lBHTwcqTdLI",
        ("ET", "QUATTROTEQUE", "#df8fed"): "https://youtu.be/ABSTXM8d_zE",
        ("O Beliya", "Darshan Rawal", "#d4a47d"): "https://youtu.be/W4GSXdmfHms",
        ("SugarCrash 2", "Bemax", "#fad3ca"): "https://youtu.be/5RWesxKj_24",
        ("Chanakya", "Rishab Rikhiram Sharma", "#ffdf2c"): "https://youtu.be/2dBHTz6g5AM",
        ("Tandav", "Hirender Singh", "#fab23f"): "https://youtu.be/5emXMmpprKM",
        ("Indian Phonk Eki", "Neuki", "#ff8494"): "https://youtu.be/Sc_R18M19Ns",
        ("Mexican Phonk Eki", "Neuki", "#eb5013"): "https://youtu.be/_J18Yh4NCuQ",
    }

# Function to add music to Firebase using the CLI
def add_music_to_firebase(song, artist, url, color):
    ref = db.reference('/')
    ref.child(song).set({
        'artist': artist,
        'url': url,
        'color': color,
        'downloadAudio' : 1,
        'downloadThumbnail' : 1
    })
    print(f'Added song {song} by {artist} to Firebase.')

# Function to add music to Firebase using a dictionary
def add_music_to_firebase_using_dictionary(music):
    for name, url in music.items():
        title, artist, color = name
        add_music_to_firebase(title, artist, url, color)

# Main function
def mainScript():
    n = int(input('Enter the number of songs you want to add: '))

    for i in range(n):
        song = input('Enter the name of the song: ')
        artist = input('Enter the name of the artist: ')
        url = input('Enter the URL of the song: ')
        color = input('Enter the color of the song: ')

        add_music_to_firebase(song, artist, url, color)

if __name__ == '__main__':
    mainScript()