import audioPlayerLogic from "../hooks/audioPlayerLogic.js"; // Importing the logic for audio player
import {titles} from '../constants/titles.js'; // This stores all the songs with their details
import {useSearchForASong} from '../hooks/searchForASong.js'; // Importing the search functionality for the songs
import {useEffect, useRef, useState} from 'react'; // Importing the useState hook
import {AnimatePresence, motion} from 'motion/react'; // Importing the motion library for animations
import {
    NextButton,
    PlayPauseButton,
    PreviousButton,
    ProgressBar,
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
    const {searchQuery, filteredTracks, searchForASong} = useSearchForASong(titles, isSideMenuOpen);
    const currentTrack = titles[trackDaSongThatPlaying];

    const modalReference = useRef(null); // Reference for the modal

    const closeModalWindow = () => {
        const modal = document.getElementById('my_modal_1');
        if (modal) {
            modal.close();
            searchForASong('');
        }
    };

    // Handles when someone clicks outside the modal window
    // It'll close the modal window and reset the search query(Causing issues with track selection outside modal)
    useEffect(() => {
        const clicksOutside = (event) => {
            if (modalReference.current && !modalReference.current.contains(event.target)) {
                closeModalWindow();
            }
        };

        const modal = document.getElementById('my_modal_1');
        if (modal) {
            modal.addEventListener('click', clicksOutside);
        }

        return () => {
            if (modal) {
                modal.removeEventListener('click', clicksOutside);
            }
        };
    }, []);

    useEffect(() => {
        const handleShortcutKeys = (e) => {
            if (e.ctrlKey && e.code === 'Space') {
                document.getElementById('my_modal_1').showModal()
            }
        };
        window.addEventListener('keydown', handleShortcutKeys);

        return () => {
            window.removeEventListener('keydown', handleShortcutKeys);
        }
    }, []);

    // Handles logic after track selected
    const handleTrackSelection = (index) => {
        const selectedTrack = filteredTracks[index];
        const originalTrack = titles.findIndex(track => track.id === selectedTrack.id);
        setTrackDaSongThatPlaying(originalTrack);
        playZaTrack();
        searchForASong('');
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
            <div className={`relative h-screen w-screen overflow-hidden`}>
                <div className="fixed top-0 left-0 w-full z-50">
                    <motion.label
                        htmlFor="my-drawer"
                        className={`absolute top-4 left-4 flex items-center gap-3 p-3 border-2 border-black bg-[${currentTrack.colorCode}] text-black rounded-full drawer-button`}
                        whileTap={{scale: 0.95}}
                        whileHover={{scale: 1.1}}
                        transition={{type: "spring", stiffness: 400, damping: 17}}
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
                    </motion.label>
                </div>

                <motion.div
                    key={currentTrack.id}
                    initial={{opacity: 0, scale: 1, filter: 'blur(20px)'}}
                    animate={{opacity: 1, scale: 1, filter: 'blur(0px)'}}
                    exit={{opacity: 0, scale: 1.1, filter: 'blur(20px)'}}
                    transition={{duration: 0.8, ease: 'easeInOut'}}
                    className="absolute h-full w-full object-cover "
                >
                    <img
                        src={currentTrack.image}
                        alt=""
                        className={`h-full w-full object-cover object-center`}
                    />

                </motion.div>

                <div className={`absolute inset-0 flex items-center justify-center ${currentTrack.color}`}>

                    <div
                        className={`w-[90%] md:w-[75%] h-4/5 md:h-[75%] bg-black/30 backdrop-blur-lg rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl`}
                    >
                        <motion.div
                            key={currentTrack.id}
                            initial={{opacity: 0.4, scale: 1, filter: 'blur(20px)'}}
                            animate={{opacity: 1, scale: 1, filter: 'blur(0px)'}}
                            exit={{opacity: 0, scale: 1.1, filter: 'blur(20px)'}}
                            transition={{duration: 0.8, ease: 'easeInOut'}}
                            className={`w-full md:w-[40%] h-[40%] md:h-full relative overflow-hidden order-1 md:order-2`}
                        >
                            <img
                                src={currentTrack.image}
                                alt=""
                                className="absolute h-full w-full object-cover object-center"
                            />
                        </motion.div>

                        <div className="w-full md:w-[60%] p-4 md:p-8 flex flex-col justify-center order-2 md:order-1">
                            <h2 className={`${currentTrack.color} text-xl md:text-2xl mb-2`}>{currentTrack.artist}</h2>
                            <h1 className={`neon-white font-sans  md:text-6xl font-bold mb-4 md:mb-6`}>
                                {currentTrack.title.toUpperCase()}
                            </h1>

                            {/*Buttons*/}
                            <div className="flex justify-center items-center space-x-2 md:space-x-4 mb-4">
                                <PreviousButton onClick={goToPreviousTrack} color={currentTrack.color}/>
                                <SkipBackwardButton onClick={() => skipTime(-10)} color={currentTrack.color}/>
                                <PlayPauseButton onClick={togglePlay} color={currentTrack.color} isItPlaying={IsItPlayingDaSong}/>
                                <SkipForwardButton onClick={() => skipTime(10)} color={currentTrack.color}/>
                                <NextButton onClick={goToNextTrack} color={currentTrack.color}/>
                            </div>

                            {/* Progress Bar */}
                            <div className={`relative w-full h-2 bg-white/20 rounded-full`}>
                                <ProgressBar ProgressOfAudio={progress} color={currentTrack.bgColor}/>
                            </div>
                            <div className="flex justify-between text-sm text-white/60 mt-2">
                                <span>{currentTime}</span>
                                <span>{duration}</span>
                            </div>

                            {/* All the available songs. Not Much but it is something ig */}
                            <div className="mt-6">
                                <div className="flex py-2 flex-row items-center justify-between">
                                    <h3 className="text-lg font-bold text-white mr-4">Available Songs</h3>
                                    <button
                                        className="flex items-center justify-center bg-transparent text-white rounded-full hover:bg-white/20 p-2 transition-colors"
                                        onClick={() => document.getElementById('my_modal_1').showModal()}
                                    >
                                        <span className="text-xs px-2">Press Ctrl + Space</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            className="w-6 h-6 mr-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-4.35-4.35m2.35-6.65a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <AnimatePresence>
                                    <dialog
                                        id="my_modal_1"
                                        className="modal bg-black/40 fixed inset-0 flex items-center justify-center "
                                    >
                                        <div
                                            className="modal-box bg-black text-white rounded-3xl w-[90%] md:w-[60%] max-h-[80vh] overflow-hidden shadow-2xl">
                                            {/* Search Bar */}
                                            <div
                                                className="relative flex items-center space-x-2 bg-black rounded-3xl p-2 mb-4"
                                                ref={modalReference}
                                            >
                                                <input
                                                    type="search"
                                                    value={searchQuery}
                                                    onChange={(e) => searchForASong(e.target.value)}
                                                    className="flex-grow bg-transparent text-white rounded-3xl px-4 py-2 focus:outline-none"
                                                    style={{
                                                        border: `2px solid ${currentTrack.colorCode}`,
                                                        boxShadow: `0 0 0 3px ${currentTrack.colorCode}50`,
                                                    }}
                                                    placeholder="Search for a track"
                                                />
                                            </div>

                                            {/* Filtered Tracks */}
                                            <ul className="space-y-3 overflow-y-auto max-h-[60vh] pr-2">
                                                {filteredTracks.length > 0 ? (
                                                    filteredTracks.map((track, index) => (
                                                        <li
                                                            key={track.id}
                                                            onClick={() => handleTrackSelection(index)}
                                                            className={`p-2 flex items-center space-x-4 cursor-pointer rounded-2xl transition-colors ${
                                                                index === trackDaSongThatPlaying ? track.bgColor : 'hover:bg-white/20'
                                                            }`}
                                                        >
                                                            <img
                                                                src={track.image}
                                                                alt=""
                                                                className="w-12 h-12 rounded-lg object-cover"
                                                            />
                                                            <div className="text-white">
                                                                <p className="font-bold">{track.title}</p>
                                                                <p className="text-sm">{track.artist}</p>
                                                            </div>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <p className="text-center text-gray-400">No tracks found.</p>
                                                )}
                                            </ul>

                                        </div>
                                    </dialog>
                                </AnimatePresence>

                                <ul className="space-y-2 max-h-[12rem] md:max-h-[18rem] overflow-y-auto">
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

