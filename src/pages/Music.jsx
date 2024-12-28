import {useEffect, useRef, useState} from 'react';

import universo from '../assets/music/image/funk-universo.jpeg';
import universoAudio from '../assets/music/audio/funk-universo.mp3';

import luminar from '../assets/music/image/funk-luminar.jpg';
import luminarAudio from '../assets/music/audio/funk-luminar.mp3';

import aura from '../assets/music/image/aura.jpeg';
import auraAudio from '../assets/music/audio/aura.mp3';

import et from '../assets/music/image/et.jpeg';
import etAudio from '../assets/music/audio/et.mp3';

import empire from '../assets/music/image/empire.jpeg';
import empireAudio from '../assets/music/audio/empire.mp3';

import mexican from '../assets/music/image/mexican.jpeg';
import mexicanAudio from '../assets/music/audio/mexican.mp3';

const titles = [
    {
        id: 1,
        audio: universoAudio,
        image: universo,
        title: 'Funk Universo',
        artist: 'Irokz',
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-400',
        placement: 'object-bottom'
    },
    {
        id: 2,
        audio: luminarAudio,
        image: luminar,
        title: 'Funk Luminar',
        artist: 'Irokz',
        color: 'text-[#84d5f7]',
        bgColor: 'bg-[#84d5f7]',
        placement: 'object-center'
    },
    {
        id: 3,
        audio: auraAudio,
        image: aura,
        title: 'Aura',
        artist: 'Ogryzek',
        color: 'text-[#6785ff]',
        bgColor: 'bg-[#6785ff]',
        placement: 'object-center'
    },
    {
        id: 4,
        audio: etAudio,
        image: et,
        title: 'E.T',
        artist: 'QUATTROTEQUE',
        color: 'text-[#ffa1fb]',
        bgColor: 'bg-[#ffa1fb]',
        placement: 'object-center'
    },
    {
        id: 5,
        audio: empireAudio,
        image: empire,
        title: 'Empire',
        artist: 'Ogryzek',
        color: 'text-[#ff821b]',
        bgColor: 'bg-[#ff821b]',
        placement: 'object-center'
    },
    {
        id: 6,
        audio: mexicanAudio,
        image: mexican,
        title: 'Mexican Phonk Eki',
        artist: 'Neuki',
        color: 'text-[#eb5013]',
        bgColor: 'bg-[#eb5013]',
        placement: 'object-center'
    },

];

const Music = () => {
    const [trackDaSongThatPlaying, setTrackDaSongThatPlaying] = useState(0);
    const [IsItPlayingDaSong, setIsItPlayingDaSong] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [duration, setDuration] = useState('00:00');
    const audioRef = useRef(new Audio(titles[0].audio));

    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => {
            const duration = audio.duration || 0;
            const currentTime = audio.currentTime || 0;
            setProgress((currentTime / duration) * 100 || 0);
            setCurrentTime(formatTime(currentTime));
            setDuration(formatTime(duration));
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', updateProgress);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', updateProgress);
        };
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        audio.pause();
        audio.src = titles[trackDaSongThatPlaying].audio;
        audio.load();
        if (IsItPlayingDaSong) {
            audio.play();
        }
    }, [trackDaSongThatPlaying]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (IsItPlayingDaSong) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsItPlayingDaSong(!IsItPlayingDaSong);
    };

    const goToPreviousTrack = () => {
        setTrackDaSongThatPlaying((prevIndex) =>
            prevIndex === 0 ? titles.length - 1 : prevIndex - 1
        );
    };

    const goToNextTrack = () => {
        setTrackDaSongThatPlaying((prevIndex) =>
            prevIndex === titles.length - 1 ? 0 : prevIndex + 1
        );
    };

    const skipTime = (seconds) => {
        const audio = audioRef.current;
        const newTime = audio.currentTime + seconds;

        if (newTime < 0) {
            audio.currentTime = 0;
        } else if (newTime > audio.duration) {
            audio.currentTime = audio.duration;
        } else {
            audio.currentTime = newTime;
        }
    };


    const formatTime = (time) => {
        if (isNaN(time)) return '00:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleTrackSelection = (index) => {
        setTrackDaSongThatPlaying(index);
        setIsItPlayingDaSong(true);
    };

    const currentTrack = titles[trackDaSongThatPlaying];

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <img
                src={currentTrack.image}
                alt=""
                className={`absolute w-full h-full object-cover ${currentTrack.placement}`}
            />
            <div className={`absolute inset-0 flex items-center justify-center ${currentTrack.color}`}>
                <div
                    className={`w-[90%] md:w-[75%] h-[90%] md:h-[75%] bg-black/30 backdrop-blur-lg rounded-[2rem] overflow-hidden flex flex-col md:flex-row`}>
                    <div className={`w-full md:w-[40%] h-[40%] md:h-full relative overflow-hidden order-1 md:order-2`}>
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4z"/>
                                </svg>
                            </button>
                            <button
                                onClick={() => skipTime(-10)}
                                className={`${currentTrack.color} hover:text-white transition-colors`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none"
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"/>
                                </svg>
                            </button>
                            <button
                                onClick={goToNextTrack}
                                className={`${currentTrack.color} hover:text-white transition-colors`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12.067 11.2a1 1 0 000 1.6l5.333 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4z"/>
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


                        <div className="mt-4">
                            <h3 className="text-lg font-bold text-white mb-2">Available Songs</h3>
                            <ul className="space-y-2 max-h-64 overflow-y-auto">
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
    );
};

export default Music;

