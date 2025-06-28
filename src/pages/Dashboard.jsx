import React, { useEffect, useState } from "react";
import jobRoles from "../data/jobRoles.json";
import { matchJobRoles } from "../utils/skillMatcher";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [userSkills] = useState([
    "HTML", "CSS", "JavaScript", "React", "Node.js", "SQL"
  ]);

  const [matchedRoles, setMatchedRoles] = useState([]);

  useEffect(() => {
    const result = matchJobRoles(userSkills, jobRoles);
    setMatchedRoles(result);
  }, [userSkills]);

  const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#a78bfa", "#f97316"];

  const pieData = matchedRoles.map((item) => ({
    name: item.role,
    value: Math.round((item.matchCount / item.total) * 100),
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">📊 Skill Dashboard</h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-green-600">{userSkills.length}</p>
          <p className="text-sm text-gray-500 mt-1">Skills Extracted</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-blue-600">{matchedRoles.length}</p>
          <p className="text-sm text-gray-500 mt-1">Matching Roles</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {Math.max(...pieData.map((d) => d.value), 0)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">Top Match</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">📈 Role Match Distribution</h2>
        {pieData.length === 0 ? (
          <p className="text-gray-500">No matching data to display.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Matched Role Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">🎯 Matched Roles</h2>
        {matchedRoles.length > 0 ? (
          matchedRoles.map((item, index) => {
            const percentage = Math.round((item.matchCount / item.total) * 100);
            return (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  <span className="text-gray-600">{percentage}% match</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded mt-2">
                  <div
                    className="bg-blue-500 h-3 rounded"
                    style={{ width: `${percentage}% `}}
                  ></div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No matching roles found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;