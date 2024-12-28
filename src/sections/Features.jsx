import { features } from "../constants";

const Features = () => {
    return (
        <section className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#fc8f6e] to-[#9067c7]">
            <div className="flex flex-col items-center justify-center max-w-6xl mx-auto px-6 py-12">
                <h1 className="font-saved-by-zero text-6xl font-extrabold text-black mb-8 text-center">
                    Features
                </h1>
                <p className="text-xl text-black mb-12 text-center max-w-3xl">
                    All these features were designed to make your Brainrot Listening Experience as smooth as possible.
                </p>

                <div className="flex flex-wrap gap-8 w-full justify-center">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="flex-1 min-w-[300px] max-w-sm bg-black p-8 rounded-lg shadow-lg border border-transparent transition-all hover:scale-110 hover:shadow-2xl hover:border-red-500"
                        >
                            <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                            <p className="text-lg text-gray-300">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
