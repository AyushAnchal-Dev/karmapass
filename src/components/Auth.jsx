import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("🎉 Account created!");
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("👋 Logged out!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        {isLogin ? "🔐 Login to Karmapass" : "📝 Create an Account"}
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="mb-3 p-2 border rounded w-64"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-3 p-2 border rounded w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleAuth}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mb-3"
      >
        {isLogin ? "Login" : "Signup"}
      </button>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-sm text-blue-600 underline mb-3"
      >
        {isLogin ? "New user? Create Account" : "Already have an account? Login"}
      </button>

      <button
        onClick={handleLogout}
        className="text-red-500 text-sm underline"
      >
        Logout
      </button>
    </div>
  );
};

export default Auth;