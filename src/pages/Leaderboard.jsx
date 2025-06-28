import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // ✅ make sure firebase is correctly configured
import { ref, get } from "firebase/database";
import LeaderboardCard from "../components/LeaderboardCard";

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const snapshot = await get(ref(db, "githubStats"));
        if (snapshot.exists()) {
          const stats = snapshot.val();
          const users = Object.values(stats);

          // Sort by score descending
          users.sort((a, b) => b.score - a.score);
          setData(users);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("❌ Failed to fetch leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        🏆 Open Source Leaderboard
      </h1>

      <div className="space-y-4">
        {data.length > 0 ? (
          data.map((user, i) => (
            <LeaderboardCard
              key={i}
              rank={i + 1}
              username={user.username}
              score={user.score}
            />
          ))
        ) : (
          <p className="text-red-500 font-medium">No data found.</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;