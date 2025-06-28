import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/karmapass-logo.png";

const Home = () => {
  const [searchAddress, setSearchAddress] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchAddress.trim()) {
      navigate(`/profile/${searchAddress}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-gray-100 flex flex-col items-center justify-center px-6 py-12">
      {/* Logo & Title */}
      <div className="flex items-center gap-4 mb-6">
        <img src={logo} alt="Karmapass" className="w-14 h-14" />
        <h1 className="text-4xl font-extrabold text-gray-800">Karmapass</h1>
      </div>

      {/* Tagline */}
      <p className="text-center text-lg md:text-xl text-gray-600 max-w-xl mb-10">
        🔗 Unlock your real-world skills with AI-powered analysis and Blockchain-based proof.
        Create your <strong>Skill Passport</strong> today – even without certificates.
      </p>

      {/* 🔍 Search Bar for Public Profile */}
      <div className="flex flex-col items-center gap-2 mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder="🔍 Enter wallet address to view public profile"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          🔗 View Public Profile
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-6 justify-center">
        <Link
          to="/upload"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
        >
          🚀 Upload Resume
        </Link>
        <Link
          to="/profile"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg text-lg font-medium transition"
        >
          🎫 View My Profile
        </Link>
        <Link
          to="/about"
          className="text-blue-600 hover:underline text-lg font-medium"
        >
          Learn More →
        </Link>
      </div>

      {/* Footer Info */}
      <p className="mt-10 text-sm text-gray-500 text-center">
        Powered by AI, Open Source, and Polygon Blockchain.
      </p>
    </div>
  );
};

export default Home;