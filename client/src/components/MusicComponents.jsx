import PropTypes from 'prop-types';
import { motion } from 'motion/react';

export const PlayPauseButton = ({ onClick, color, isItPlaying }) => (
    <motion.button
        onClick={onClick}
        className={`${color} hover:text-white transition-colors`}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
        {isItPlaying ? (
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
    </motion.button>
);

export const PreviousButton = ({ onClick, color }) => (
    <motion.button
        onClick={onClick}
        className={`${color} hover:text-white transition-colors`}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8"
             fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12.067 11.2a1 1 0 000 1.6l5.333 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4z"/>
        </svg>
    </motion.button>
);

export const NextButton = ({ onClick, color }) => (
    <motion.button
        onClick={onClick}
        className={`${color} hover:text-white transition-colors`}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8"
             fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4z"/>
        </svg>
    </motion.button>
);

export const SkipBackwardButton = ({ onClick, color }) => (
    <motion.button
        onClick={onClick}
        className={`${color} hover:text-white transition-colors`}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8"
             fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"/>
        </svg>
    </motion.button>
);

export const SkipForwardButton = ({ onClick, color }) => (
    <motion.button
        onClick={onClick}
        className={`${color} hover:text-white transition-colors`}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8"
             fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"/>
        </svg>
    </motion.button>
);
export const ProgressBar = ({ ProgressOfAudio, color }) => (
    <div
        className={`absolute left-0 top-0 h-full ${color} rounded-full`}
        style={{width: `${ProgressOfAudio}%`}}
    />
);

PlayPauseButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    isItPlaying: PropTypes.bool.isRequired,
};

PreviousButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
};

NextButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
};

SkipBackwardButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
};

SkipForwardButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
};

ProgressBar.propTypes = {
    ProgressOfAudio: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
};