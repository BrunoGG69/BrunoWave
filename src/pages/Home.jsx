import Hero from "../../src/sections/Hero.jsx";
import NewHero from "../../src/sections/NewHero.jsx";
import About from "../../src/sections/About.jsx";
import Navbar from "../../src/sections/Navbar.jsx";
import Features from "../../src/sections/Features.jsx";

function Home() {
    return (
        <main className="relative bg-black font-jetbrains overflow-hidden">
            <Navbar/>
            {/*<div className="padding">*/}
            {/*    <Hero/>*/}
            {/*</div>*/}
            <div className="padding">
                <NewHero/>
            </div>
            {/*<div className="padding">*/}
            {/*    <About/>*/}
            {/*</div>*/}
            {/*<div className="padding">*/}
            {/*    <Features/>*/}
            {/*</div>*/}

        </main>
    );
}

export default Home;

