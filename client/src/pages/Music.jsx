import { useState } from "react";
import audioPlayerLogic from "../hooks/audioPlayerLogic.js";
import {titles} from '../constants/titles.js';

const Music = () => {
    const {
        trackDaSongThatPlaying,
        IsItPlayingDaSong,
        progress,
        currentTime,
        duration,
        togglePlay,
        goToPreviousTrack,
        goToNextTrack,
        skipTime,
        setTrackDaSongThatPlaying,
    } = audioPlayerLogic(0, titles);

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredTitles, setFilteredTitles] = useState(titles);

    const currentTrack = titles[trackDaSongThatPlaying];

    const searchForSongs = (e) => {
        const search = e.target.value.toLowerCase();
        setSearchQuery(search);
        if (search) {
            setFilteredTitles(
                titles.filter(
                    (track) =>
                        track.title.toLowerCase().includes(search) ||
                        track.artist.toLowerCase().includes(search)
                )
            );
        } else {
            setFilteredTitles(titles);
        }
    };

    const handleTrackSelection = (index) => {
        setTrackDaSongThatPlaying(index);
    };

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="relative h-screen w-screen overflow-hidden">
                <div className="fixed top-0 left-0 w-full z-50">
                    <label
                        htmlFor="my-drawer"
                        className={`absolute top-4 left-4 flex items-center gap-2 p-3 border-2 border-black bg-[${currentTrack.colorCode}] text-black rounded-full hover:bg-opacity-90 transition-colors drawer-button`}
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
                    className={`absolute w-full h-full object-cover object-bottom`}
                />
                <div className={`absolute inset-0 flex items-center justify-center ${currentTrack.color}`}>
                    <div
                        className={`w-[90%] md:w-[75%] h-[90%] md:h-[75%] bg-black/30 backdrop-blur-lg rounded-[2rem] overflow-hidden flex flex-col md:flex-row`}>
                        <div
                            className={`w-full md:w-[40%] h-[40%] md:h-full relative overflow-hidden order-1 md:order-2`}>
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

                            <div className="flex justify-center items-center space-x-2 md:space-x-4 mb-4">
                                <button
                                    onClick={goToPreviousTrack}
                                    className={`${currentTrack.color} hover:text-white transition-colors`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8"
                                         fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M12.067 11.2a1 1 0 000 1.6l5.333 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4z"/>
                                    </svg>
                                </button>
                                <button
                                    onClick={() => skipTime(-10)}
                                    className={`${currentTrack.color} hover:text-white transition-colors`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8"
                                         fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"/>
                                    </svg>
                                </button>
                                <button
                                    onClick={togglePlay}
                                    className={`${currentTrack.color} hover:text-white transition-colors`}
                                >
                                    {IsItPlayingDaSong ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12"
                                             fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12"
                                             fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    )}
                                </button>
                                <button
                                    onClick={() => skipTime(10)}
                                    className={`${currentTrack.color} hover:text-white transition-colors`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8"
                                         fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"/>
                                    </svg>
                                </button>
                                <button
                                    onClick={goToNextTrack}
                                    className={`${currentTrack.color} hover:text-white transition-colors`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8"
                                         fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4z"/>
                                    </svg>
                                </button>
                            </div>

                            <div className={`relative w-full h-2 bg-white/20 rounded-full`}>
                                <div
                                    className={`absolute left-0 top-0 h-full ${currentTrack.bgColor} rounded-full`}
                                    style={{width: `${progress}%`}}
                                />
                            </div>
                            <div className="flex justify-between text-sm text-white/60 mt-2">
                                <span>{currentTime}</span>
                                <span>{duration}</span>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-bold text-white mb-2">Available Songs</h3>
                                <ul className="space-y-2 max-h-[18rem] overflow-y-auto">
                                    {titles.map((track, index) => (
                                        <li
                                            key={track.id}
                                            onClick={() => handleTrackSelection(index)}
                                            className={`p-2 cursor-pointer rounded-md transition-colors ${index === trackDaSongThatPlaying ? track.bgColor : 'hover:bg-white/20'}`}>
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

             {/*Drawer*/}
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                {/*Drawer Content*/}
                <ul className="menu bg-black/60 backdrop-blur-md min-h-full rounded-l-3xl w-[65%] lg:w-[30%] p-5">
                    {/*Search for a track*/}
                    <div className="relative flex items-center space-x-2 bg-black rounded-3xl p-2 my-5">
                        {/*Search Input*/}
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={searchForSongs}
                            className={`flex-grow bg-transparent text-white rounded-3xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200`}
                            style={{ border: `2px solid ${currentTrack.colorCode}`, boxShadow: `0 0 0 3px ${currentTrack.colorCode}50` }}
                            placeholder="Search for a track"
                        />
                    </div>

                    {/*Filtered Tracks*/}
                    {filteredTitles.map((track, index) => (
                        <li
                            key={track.id}
                            onClick={() => handleTrackSelection(index)}
                            className={`m-1 cursor-pointer rounded-2xl transition-colors ${index === trackDaSongThatPlaying ? track.bgColor : 'hover:bg-white/20'}`}>
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