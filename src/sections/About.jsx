import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { songs } from "../constants";

const About = () => {
    const [scrollPosition, setScrollPosition] = useState("start");

    const scroll = (direction) => {
        const container = document.getElementById("scrollable-cards-container");
        const cardWidth = container.querySelector(".song-card").offsetWidth + 16;
        const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const handleScroll = () => {
        const container = document.getElementById("scrollable-cards-container");
        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (scrollLeft === 0) {
            setScrollPosition("start");
        } else if (scrollLeft >= maxScroll) {
            setScrollPosition("end");
        } else {
            setScrollPosition("middle");
        }
    };

    useEffect(() => {
        const container = document.getElementById("scrollable-cards-container");
        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        handleScroll();
    }, []);

    return (
        <section
            id="aboutSection"
            className="flex flex-col items-center justify-center min-h-[85vh] sm:min-h-screen overflow-x-hidden pb-10 pt-16 px-4 md:px-8"
        >
            <motion.div
                className="flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.h1
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f48e6c] mb-6 font-saved-by-zero transition-all hover:scale-110 hover:brightness-110"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    About Us
                </motion.h1>
                <motion.p
                    className="text-xl mb-8 px-8 text-center max-w-2xl text-[#5fcbbc] transition-all hover:scale-110 hover:brightness-110"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    We are the Next Gen Music Player with all your Favorite Brainrots and Skibidi Music. We also have many other
                    features that you will love.
                </motion.p>

                <div className="relative w-full mt-8">
                    {/* Left Scroll Button */}
                    <div
                        className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 ${
                            scrollPosition === "start" ? "hidden" : ""
                        }`}
                    >
                        <button
                            onClick={() => scroll("left")}
                            className="bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 focus:outline-none"
                        >
                            <span className="text-xl">{"<"}</span>
                        </button>
                    </div>

                    {/* Scrollable Cards */}
                    <div
                        id="scrollable-cards-container"
                        className="overflow-x-auto flex gap-5 px-5 py-10 snap-x scroll-smooth scrollbar-hide"
                    >
                        {songs.map((song) => (
                            <motion.div
                                key={song.id}
                                className="song-card flex-shrink-0 w-[250px] mx-auto rounded-xl shadow-lg transition-all hover:scale-105 h-[400px] snap-start overflow-hidden relative cursor-pointer"
                                onClick={() => window.open(song.url, "_blank")}
                                whileHover={{
                                    boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.7)",
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                }}
                            >
                                <img
                                    className="w-full h-full object-cover"
                                    src={song.image}
                                    alt={song.name}
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                                >
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <h2 className="text-xl font-bold text-[#f48e6c] mb-1">{song.name}</h2>
                                        <p className="text-sm text-[#5fcbbc]">{song.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Scroll Button */}
                    <div
                        className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 ${
                            scrollPosition === "end" ? "hidden" : ""
                        }`}
                    >
                        <button
                            onClick={() => scroll("right")}
                            className="bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 focus:outline-none"
                        >
                            <span className="text-xl">{">"}</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
