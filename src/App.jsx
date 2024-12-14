import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Navbar from "./sections/Navbar.jsx";

function App() {
    return (
        <main className="relative bg-black font-jetbrains overflow-hidden">
            <Navbar/>
            <div className="padding">
                <Hero/>
            </div>
            <div className="padding">
                <About/>
            </div>

        </main>
    );
}

export default App;

