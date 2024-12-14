import profilePic from "../assets/profilePic-noBackground.png";
import audioVisualizer from "../assets/audiovisualiser.svg";
import musicPlayer from "../assets/musicplayer.svg";
import { motion } from "motion/react";
import { heroContent } from "../constants";

const Hero = () => {
    return (
        <section
            id="heroSection"
            className="flex flex-col items-center justify-center min-h-[85vh] sm:min-h-screen overflow-x-hidden pb-10 pt-16 px-4 md:px-8"
        >
            <motion.div
                className="flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >

                <div className="flex flex-col sm:flex-row items-center justify-center mb-8">

                    <motion.div
                        className="mb-4 sm:mb-0 sm:mr-4 flex-shrink-0 relative z-10"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <img
                            src={profilePic}
                            alt="Profile"
                            className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full transition-all hover:scale-110 hover:brightness-110"
                        />
                    </motion.div>

                    <motion.div
                        className="relative z-10 font-saved-by-zero"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f48e6c] space-x-4 transition-all hover:scale-110 hover:brightness-110">
                            {heroContent.title}
                        </h1>
                        <p className="text-xl mt-2 text-[#5fcbbc] transition-all hover:scale-110 hover:brightness-110">
                            {heroContent.subtitle}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="relative flex justify-center mt-8 w-full z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                >
                    <img
                        src={audioVisualizer}
                        alt="Audio Visualizer"
                        className="w-full h-auto object-cover z-20"
                    />

                    <img
                        src={musicPlayer}
                        alt="Music Player"
                        className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] sm:w-[65%] md:w-[50%] lg:w-[45%] xl:w-[30%] h-auto transition-all hover:scale-110 hover:brightness-110"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
