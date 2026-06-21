import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Translator from "./Translator";
import Generator from "./Generator";

function App() {
  return ( 
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link> |{" "}
        <Link to="/translator">Translator</Link> |{" "}
        <Link to="/generator">Generator</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/generator" element={<Generator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;