import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import About from "./pages/About";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Tasks" element={<Tasks />} />
      <Route path="/About" element={<About />} />
      <Route path="/Settings" element={<Settings />} />
    </Routes>
  );
}

export default App;

