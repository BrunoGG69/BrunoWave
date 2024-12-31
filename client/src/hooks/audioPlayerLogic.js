import { useEffect, useRef, useState } from 'react';

const useAudioPlayer = (trackNumber, titles) => {
    const [trackDaSongThatPlaying, setTrackDaSongThatPlaying] = useState(trackNumber);
    const [IsItPlayingDaSong, setIsItPlayingDaSong] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [duration, setDuration] = useState('00:00');
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = new Audio(titles[trackDaSongThatPlaying].audio);
        audioRef.current = audio;

        const updateProgress = () => {
            const currentTime = audio.currentTime || 0;
            const duration = audio.duration || 0;
            setProgress((currentTime / duration) * 100 || 0);
            setCurrentTime(formatTime(currentTime));
            setDuration(formatTime(duration));
        };

        const trackEnd = () => {
            goToNextTrack();
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', updateProgress);
        audio.addEventListener('ended', trackEnd);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', updateProgress);
            audio.removeEventListener('ended', trackEnd);
            audio.pause();
            audio.src = '';
        };
    }, [trackDaSongThatPlaying]);

    useEffect(() => {
        const audio = audioRef.current;

        if (IsItPlayingDaSong) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [IsItPlayingDaSong, trackDaSongThatPlaying]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (IsItPlayingDaSong) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsItPlayingDaSong(!IsItPlayingDaSong);
    };

    const playZaTrack = () => {
        const audio = audioRef.current;
        audio.play();
        setIsItPlayingDaSong(true);
    };

    const pauseZaTrack = () => {
        const audio = audioRef.current;
        audio.pause();
        setIsItPlayingDaSong(false);
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

    return {
        trackDaSongThatPlaying,
        IsItPlayingDaSong,
        progress,
        currentTime,
        duration,
        togglePlay,
        playZaTrack,
        pauseZaTrack,
        goToPreviousTrack,
        goToNextTrack,
        skipTime,
        setTrackDaSongThatPlaying,
    };
};

export default useAudioPlayer;
