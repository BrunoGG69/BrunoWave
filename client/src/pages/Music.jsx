import audioPlayerLogic from "../hooks/audioPlayerLogic.js"; // Importing the logic for audio player
import { titles } from '../constants/titles.js'; // This stores all the songs with their details
import { useSearchForASong } from '../hooks/searchForASong.js'; // Importing the search functionality for the songs
import { useState } from 'react'; // Importing the useState hook

import {
    NextButton,
    PlayPauseButton,
    PreviousButton, ProgressBar,
    SkipBackwardButton,
    SkipForwardButton
} from "../components/MusicComponents.jsx";

const Music = () => {
    // Importing the logic for the audio player
    const {
        trackDaSongThatPlaying,
        setTrackDaSongThatPlaying,
        IsItPlayingDaSong,
        progress,
        currentTime,
        duration,
        togglePlay,
        goToPreviousTrack,
        goToNextTrack,
        skipTime,
        playZaTrack,
    } = audioPlayerLogic(0, titles);

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const { searchQuery, filteredTracks, searchForASong } = useSearchForASong(titles, isSideMenuOpen);
    const currentTrack = titles[trackDaSongThatPlaying];

    // const searchForSongs = (e) => {
    //     const search = e.target.value.toLowerCase();
    //     setSearchQuery(search);
    //     if (search) {
    //         setFilteredTitles(
    //             titles.filter(
    //                 (track) =>
    //                     track.title.toLowerCase().includes(search) ||
    //                     track.artist.toLowerCase().includes(search)
    //             )
    //         );
    //     } else {
    //         setFilteredTitles(titles);
    //     }
    // };

    // Handles logic after track selected
    const handleTrackSelection = (index) => {
        const selectedTrack = filteredTracks[index];
        const originalTrack = titles.findIndex(track => track.id === selectedTrack.id);
        setTrackDaSongThatPlaying(originalTrack);
        playZaTrack();
    };

    // What happens after side menu is toggled
    const toggleSideMenu = () => {
        setIsSideMenuOpen((open) => !open);
    };

    return (
        <div className="drawer drawer-end">
            {/*Button To Open Side Menu*/}
            <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
                onChange={toggleSideMenu}
                checked={isSideMenuOpen}
            />
            <div className="relative h-screen w-screen overflow-hidden">
                <div className="fixed top-0 left-0 w-full z-50">
                    <label
                        htmlFor="my-drawer"
                        className={`absolute top-4 left-4 flex items-center gap-3 p-3 border-2 border-black bg-[${currentTrack.colorCode}] text-black rounded-full hover:bg-opacity-60 transition-colors drawer-button`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                        <span className="font-medium text-base">More Music</span>
                    </label>
                </div>

                <img
                    src={currentTrack.image}
                    alt=""
                    className={`absolute h-full w-full object-cover object-bottom`}
                />
                <div className={`absolute inset-0 flex items-center justify-center ${currentTrack.color}`}>
                    <div
                        className={`w-[90%] md:w-[75%] h-[90%] md:h-[75%] bg-black/30 backdrop-blur-lg rounded-[2rem] overflow-hidden flex flex-col md:flex-row`}
                    >
                        <div
                            className={`w-full md:w-[40%] h-[40%] md:h-full relative overflow-hidden order-1 md:order-2`}
                        >
                            <img
                                src={currentTrack.image}
                                alt=""
                                className="absolute h-full w-full object-cover object-center"
                            />
                        </div>

                        <div className="w-full md:w-[60%] p-4 md:p-8 flex flex-col justify-center order-2 md:order-1">
                            <h2 className={`${currentTrack.color} text-xl md:text-2xl mb-2`}>{currentTrack.artist}</h2>
                            <h1 className={`neon-white text-3xl md:text-6xl font-bold mb-4 md:mb-6`}>
                                {currentTrack.title.toUpperCase()}
                            </h1>

                            {/*Buttons*/}
                            <div className="flex justify-center items-center space-x-2 md:space-x-4 mb-4">
                                <PreviousButton onClick={goToPreviousTrack} color={currentTrack.color} />
                                <SkipBackwardButton onClick={() => skipTime(-10)} color={currentTrack.color} />
                                <PlayPauseButton onClick={togglePlay} color={currentTrack.color} isItPlaying={IsItPlayingDaSong} />
                                <SkipForwardButton onClick={() => skipTime(10)} color={currentTrack.color} />
                                <NextButton onClick={goToNextTrack} color={currentTrack.color} />
                            </div>

                            {/* Progress Bar */}
                            <div className={`relative w-full h-2 bg-white/20 rounded-full`}>
                                <ProgressBar ProgressOfAudio={progress} color={currentTrack.bgColor} />
                            </div>
                            <div className="flex justify-between text-sm text-white/60 mt-2">
                                <span>{currentTime}</span>
                                <span>{duration}</span>
                            </div>

                            {/* All the available songs. Not Much but it is something ig */}
                            <div className="mt-6">
                                <h3 className="text-lg font-bold text-white mb-2">Available Songs</h3>
                                <ul className="space-y-2 max-h-[18rem] overflow-y-auto">
                                    {titles.map((track, index) => (
                                        <li
                                            key={track.id}
                                            onClick={() => handleTrackSelection(index)}
                                            className={`p-2 cursor-pointer rounded-3xl transition-colors ${index === trackDaSongThatPlaying ? track.bgColor : 'hover:bg-white/20'}`}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={track.image}
                                                    alt=""
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div className={`text-white`}>
                                                    <p className="font-bold">{track.title}</p>
                                                    <p className="text-sm">{track.artist}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Drawer */}
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                {/*Drawer Content*/}
                <ul className="menu bg-black/60 backdrop-blur-md min-h-full rounded-l-3xl w-[65%] lg:w-[30%] p-5">
                    {/*Song List Text*/}
                    <h1
                        className="text-3xl  py-5 mx-auto font-bold"
                        style={{
                            color: currentTrack.colorCode,
                            textShadow: `0 0 5px ${currentTrack.colorCode}90, 0 0 10px ${currentTrack.colorCode}60`,
                        }}
                    >
                        Song List
                    </h1>
                    {/*Searchbar to search for a track*/}
                    <div className="relative flex items-center space-x-2 bg-black rounded-3xl p-2 mb-5">
                        {/*Input for Search. Well u annoyed me ngl*/}
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => searchForASong(e.target.value)}
                            className={`flex-grow bg-transparent text-white rounded-3xl px-4 py-2 focus:outline-none`}
                            style={{
                                border: `2px solid ${currentTrack.colorCode}`,
                                boxShadow: `0 0 0 3px ${currentTrack.colorCode}50`,
                            }}
                            placeholder="Search for a track"
                        />
                    </div>

                    {/*Filtered Tracks*/}
                    {filteredTracks.map((track, index) => (
                        <li
                            key={track.id}
                            onClick={() => handleTrackSelection(index)}
                            className={`m-1 cursor-pointer rounded-2xl transition-colors ${
                                index === trackDaSongThatPlaying ? track.bgColor : 'hover:bg-white/20'
                            }`}
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={track.image}
                                    alt=""
                                    className="w-12 h-12 rounded-lg object-cover transition-all hover:bg-black hover:opacity-60"
                                />
                                <div className={`text-white`}>
                                    <p className="font-bold">{track.title}</p>
                                    <p className="text-sm">{track.artist}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Music;

