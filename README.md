![Wavify Logo](https://cloud-cbc0bs50o-hack-club-bot.vercel.app/0audio_visualiser.svg)
# Wavify -  The Sound You Have Never Heard Before

----------------------------------------------------------------------------------------------------------------------------

### This is a **Music Service** that I am working on. It features a unique and modern UI and also allows you to put in your own songs using the python script. Visit the website [here](https://www.wavify.in)

## [Wavify Figma File](https://www.figma.com/design/kAo2e1IcoXenD282544u16/BrunoWave?node-id=3-2&t=ZDi4LpyWm1Byo1ta-1)
## Technologies used:
- HTML
- CSS
- JavaScript 
- Tailwind CSS (Styling)
- Python (Script used to download songs and thumbnail and store the data into a JS array)
- Framer Motion (Animations)
- React
- Firebase (For storing the music data)

## Resources used:
- [Music Player Part](https://dev.to/documatic/building-a-music-player-in-react-2aa4)
- [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API)

## Features
- Play/Pause
- Next/Previous
- Automatic Download of music
- Sync with the OS / Browser
- Modern UI
----------------------------------------------------------------------------------------------------------------------------
## How to run the project locally (I recommend visiting it [here](https://www.wavify.in)
1. Clone the repository
    ```bash
    git clone https://github.com/BrunoGG69/Wavify.git
    ```
2. Change the directory
    ```bash
    cd client
    ```
3. Run **npm install**
    ```bash
    npm install
    ```
4. Run **npm run dev**
    ```bash
    npm run dev
    ```
5.  Visit on
    ```bash
    localhost:5173/play
    ```
----------------------------------------------------------------------------------------------------------------------------
## How to load own music automatically
1. Setup a Firebase Project
2. Go to Realtime Database and create one
3. From there download the credentials file and put them in **server/credentials.json**
4. Create a .env file and put in the database URL in the format 
    `DATABASE_URL=<URL>`
5. Also add **the FULL path** for storing songs, thunbnail and the js  array file in the .env file
   ` SONG_OUTPUT_PATH=<PATH>
      THUMBNAIL_OUTPUT_PATH=<PATH> 
     ARRAY_OUTPUT_PATH=<PATH>`
6. Change the directories in the script.py file to the directories where your music is stored
7. Run the file script.py
    ```bash
    python script.py
    ```
8. Follow the instructions and you are done
----------------------------------------------------------------------------------------------------------------------------
## <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://www.wavify.in">Wavify</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://brunogg.in">Prathamesh Prabhakar</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-ND 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" alt=""></a></p>

This project development was **Aided** by AI tools, specifically:

* **GitHub Copilot:** For mild code suggestions.
* **ChatGPT:** For aiding in repetitive tasks and code cleanup. In this instance, it was used a little bit for the backend of the music player but most was made with the help of the resource mentioned above.

However, the design and implementation of the project are entirely original and based on the resources listed above.
