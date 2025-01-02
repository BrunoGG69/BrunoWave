# BrunoWave -  The Sound You Have Never Heard Before

### This is a Music Service I am working on. It features a unique and stylish UI. Visit it on https://wave.brunogg.in/play

## Technologies used:
- HTML
- CSS
- JavaScript
- Python (For downloading songs)
- Tailwind CSS
- Framer Motion (Animation)
- React

## Resources used:
- https://dev.to/documatic/building-a-music-player-in-react-2aa4 (music player part [some parts of it])
- https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API (for the media session API)

## Features
- Play/Pause
- Next/Previous
- Automatic Download of music
- Sync with the OS / Browser

## How to run the project locally (I recommend visiting it on https://wave.brunogg.in/play)
1. Clone the repository
    ```bash
    git clone <url of repository>
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
   
## How to load own music automatically
1. Setup a Firebase Project
2. Go to Realtime Database and create one
3. From there download the credentials file and put them in **server/credentials.json**
4. Create a .env file and put in the database URL in the format 
    ```bash
    DATABASE_URL=<URL>
    ```
5. Change the directories in the script.py file to the directories where your music is stored
6. Run the file script.py
    ```bash
    python script.py
    ```

## BrunoWave © 2024 by Prathamesh Prabhakar is licensed under CC BY-NC-ND 4.0 

This project development was **Aided** by AI tools, specifically:

* **GitHub Copilot:** For mild code suggestions.
* **ChatGPT:** For aiding in repetitive tasks and code cleanup. In this instance, it was used a little bit for the backend of the music player but most was made with the help of the resource mentioned above.

However, the design and implementation of the project are entirely original and based on the resources listed above.
