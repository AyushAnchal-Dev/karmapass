import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    alert("👋 Logged out!");
  };

  return (
    <nav className="bg-white p-4 shadow flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">Karmapass</Link>

      <div className="flex gap-4 items-center">
        <Link to="/upload" className="text-gray-700 hover:text-blue-600">Upload</Link>
        <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
<Link to="/opensource" className="text-gray-700 hover:text-blue-600">Open Source</Link>
<Link to="/scoreboard" className="text-gray-700 hover:text-blue-600">Scoreboard</Link>
<Link to="/leaderboard" className="text-gray-700 hover:text-blue-600">Leaderboard</Link>
        
        
        {currentUser ? (
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline text-sm"
          >
            Logout
          </button>
        ) : (
          <Link to="/auth" className="text-blue-600 hover:underline text-sm">
            Login / Signup
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;