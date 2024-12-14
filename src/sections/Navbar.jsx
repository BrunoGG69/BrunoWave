import { useState, useEffect } from "react";
import { motion } from "motion/react";
import profilePic from "../assets/profilePic-noBackground.png";
import { navItems } from '../constants';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.querySelector(item.href));
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(navItems[i].href);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-md font-bold text-[#5fcbbc] z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <a
                            className="flex-shrink-0 flex items-center"
                            href="#heroSection"
                            onClick={(e) => handleNavClick(e, "#heroSection")}
                        >
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="w-8 h-8 rounded-full mr-3"
                            />
                            <span className="text-2xl font-bold">BrunoWave</span>
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeSection === item.href
                                            ? "bg-[#5fcbbc] text-black"
                                            : "text-[#5fcbbc] hover:bg-[#5fcbbc] hover:bg-opacity-20"
                                    }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-[#5fcbbc] hover:bg-[#5fcbbc] hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                className={`md:hidden ${isOpen ? "block" : "hidden"}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
                transition={{ duration: 0.3 }}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                activeSection === item.href
                                    ? "bg-[#5fcbbc] text-black"
                                    : "text-[#5fcbbc] hover:bg-[#5fcbbc] hover:bg-opacity-20"
                            }`}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;
