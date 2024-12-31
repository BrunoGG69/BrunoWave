import { motion } from "motion/react";
import profilePic from "../assets/profilePic-noBackground.png";
import img from "../assets/img.png";
import CustomButtonBlue from "../components/CustomButtonBlue.jsx";

const NewHero = () => {
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
                        initial={{y: -50, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 1, delay: 0.3}}
                    >
                        <img
                            src={profilePic}
                            alt="Profile"
                            className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full transition-all hover:scale-110 hover:brightness-110"
                        />
                    </motion.div>

                    <motion.div
                        className="relative z-10"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 1, delay: 0.5}}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f48e6c] space-x-4 transition-all hover:scale-110 hover:brightness-110 font-saved-by-zero">
                            BrunoWave
                        </h1>
                        <p className="text-xl mt-2 text-[#5fcbbc] transition-all hover:scale-110 hover:brightness-110">
                            The Sound You Have Never Heard Before
                        </p>
                        <div className="mt-6">
                            <CustomButtonBlue
                                href="/play"
                                label="Go and Try It"
                                colorClass="bg-[#5ec6bb]"
                            />
                        </div>
                    </motion.div>


                </div>

                <div className="mockup-browser bg-base-300 border w-full max-w-4xl mx-auto">
                    <div className="mockup-browser-toolbar">
                        <div className="input">https://wave.brunogg.in/play</div>
                    </div>
                    <div className="bg-base-200 flex justify-center items-center w-full h-[400px] sm:h-[500px] md:h-[600px]">
                        <img src={img} alt="Display" className="w-full h-full object-cover" />
                    </div>
                </div>

            </motion.div>
        </section>
    );
};

export default NewHero;
