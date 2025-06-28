import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import PublicProfile from "./pages/PublicProfile";
import CertificateCard from "./pages/CertificateCard";
import About from "./pages/About";
import OpenSourceAnalyzer from "./pages/OpenSourceAnalyzer";
import Scoreboard from "./pages/Scoreboard";
import Leaderboard from "./pages/Leaderboard";

// Components
import Profile from "./components/Profile";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";

// Add future routes easily if needed
function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadResume />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:address" element={<PublicProfile />} />
          <Route path="/certificate" element={<CertificateCard />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/opensource" element={<OpenSourceAnalyzer />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;