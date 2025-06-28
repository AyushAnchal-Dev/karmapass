import React from "react";

const GitHubCard = ({ username, repoCount, languages }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-80">
      <h2 className="text-lg font-bold text-indigo-700 mb-2">👤 {username}</h2>
      <p className="mb-1">📦 Public Repositories: <strong>{repoCount}</strong></p>
      <p className="mb-1">🧠 Languages:</p>
      <ul className="list-disc list-inside text-sm text-gray-700">
        {languages.map((lang, idx) => (
          <li key={idx}>{lang}</li>
        ))}
      </ul>
    </div>
  );
};

export default GitHubCard;