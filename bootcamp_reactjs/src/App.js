import "./App.css";
import Navbar from "./nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AxiosYoutube from "./5.axiosYoutube";
import Home from "./home";
import About from "./about";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/youtube" element={<AxiosYoutube />} />
      </Routes>
    </Router>
  );
}

export default App;
