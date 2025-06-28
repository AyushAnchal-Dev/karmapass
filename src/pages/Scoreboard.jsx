import React from "react";

// Mock Data: Replace with real data later
const users = [
  {
    name: "Ayush",
    github: "AyushAnchal-Dev",
    role: "Frontend Developer",
    verifiedCount: 3,
  },
  {
    name: "Priya",
    github: "priyacodes",
    role: "AI Engineer",
    verifiedCount: 5,
  },
];

const Scoreboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">🏆 Karmapass Scoreboard</h1>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">GitHub</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Verified</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i} className="border-b">
              <td className="p-3">{i + 1}</td>
              <td className="p-3">{u.name}</td>
              <td className="p-3">
                <a
                  href={`https://github.com/${u.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {u.github}
                </a>
              </td>
              <td className="p-3">{u.role}</td>
              <td className="p-3">{u.verifiedCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;