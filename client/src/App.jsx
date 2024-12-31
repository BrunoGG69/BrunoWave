import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Music from "./pages/Music";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<Music />} />

        </Routes>
    );
}

export default App;
