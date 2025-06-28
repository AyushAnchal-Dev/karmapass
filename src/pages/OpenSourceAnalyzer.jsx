import React, { useState } from "react";
import { fetchGitHubStats } from "../utils/fetchGitHubStats";
import GitHubCard from "../components/GitHubCard";
import { db } from "../firebase";
import { ref, set } from "firebase/database";

const OpenSourceAnalyzer = () => {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!username.trim()) {
      alert("⚠️ Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const stats = await fetchGitHubStats(username.trim());

      if (stats) {
        setResult(stats);

        // ✅ Remove extra space before "githubStats"
        const score = stats.publicRepos + stats.followers;
        const userRef = ref(db,` githubStats/${username.toLowerCase()}`);
        await set(userRef, {
          username: username.trim(),
          score,
        });
      } else {
        alert("❌ GitHub user not found.");
      }
    } catch (err) {
      console.error("GitHub fetch failed:", err);
      alert("❌ Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        🔍 GitHub Open Source Analyzer
      </h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <input
          className="p-2 border border-gray-300 rounded w-64"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {result && (
        <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={result.avatar}
              alt="GitHub Avatar"
              className="w-20 h-20 rounded-full shadow"
            />
            <div>
              <h2 className="text-xl font-bold">{result.name || username}</h2>
              <p className="text-gray-600 text-sm">
                {result.bio || "No bio available."}
              </p>
            </div>
          </div>

          <GitHubCard
            username={username}
            repoCount={result.publicRepos}
            languages={result.languages}
          />
        </div>
      )}
    </div>
  );
};

export default OpenSourceAnalyzer;