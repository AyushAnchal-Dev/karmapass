import React from "react";

const LeaderboardCard = ({ rank, username, score }) => {
  const getBadge = (score) => {
    if (score >= 100) return "🥇 Gold";
    if (score >= 50) return "🥈 Silver";
    return "🥉 Bronze";
  };

  return (
    <div className="bg-white p-4 rounded-md shadow flex justify-between items-center w-full md:w-[500px]">
      <span className="text-xl font-semibold text-gray-700">#{rank}</span>
      <div className="flex flex-col">
        <span className="font-medium">{username}</span>
        <span className="text-sm text-gray-500">{getBadge(score)}</span>
      </div>
      <span className="text-indigo-600 font-bold">{score} pts</span>
    </div>
  );
};

export default LeaderboardCard;