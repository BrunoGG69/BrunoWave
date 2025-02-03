import img from '../assets/logo.svg';

const Hero = () => {
    return (
        <div className="relative flex items-center justify-center min-h-screen">
            <img
                src={img}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-80"
            />

            <div className="relative z-10 text-white text-center">
                <h1 className="text-[300px] font-bold font-pacifico">Wavify</h1>
                <p className="mt-4 text-lg">Your music, your vibe.</p>
                <div className="mt-6 space-x-4">
                    <button className="px-6 py-2 bg-[#FF00FF] hover:bg-[#FF00FF]/90 text-white rounded-lg">
                        Get Started
                    </button>
                    <button className="px-6 py-2 text-white border border-white rounded-lg hover:bg-white hover:text-black">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
