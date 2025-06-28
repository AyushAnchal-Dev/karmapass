import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/karmapass-logo.png"

const About = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 text-center">
        🌐 About KarmaPass
      </h1>

      <p className="text-gray-700 max-w-2xl text-center text-lg mb-8">
        <strong>KarmaPass</strong> empowers learners and developers to
        showcase their real-world skills without needing paid certificates or
        degrees. Whether you're self-taught, open-source contributor, or an
        online learner – this platform is for you.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="bg-gray-100 p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold mb-2">🤖 AI-Powered Skill Analysis</h2>
          <p className="text-gray-600 text-sm">
            We extract your skills directly from your <strong>resume</strong> or
            <strong> GitHub profile</strong> using smart analysis to detect job-fit potential.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold mb-2">🔗 Blockchain Verified</h2>
          <p className="text-gray-600 text-sm">
            Your top matching role is verified and saved securely on the
            <strong> Polygon blockchain</strong>. No one can fake it. Only you own it.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold mb-2">🧑‍💻 Open Source Recognition</h2>
          <p className="text-gray-600 text-sm">
            GitHub contributions are analyzed and scored to identify top
            developers contributing to real-world projects.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold mb-2">🚀 For Everyone</h2>
          <p className="text-gray-600 text-sm">
            You don’t need to buy expensive courses. KarmaPass supports learners
            who grow from open-source, YouTube, or real practice.
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-10">
        <Link
          to="/upload"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-blue-700"
        >
          Upload Resume
        </Link>
        <Link
          to="/opensource"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg text-lg hover:bg-gray-300"
        >
          Analyze GitHub
        </Link>
      </div>

      <p className="mt-10 text-sm text-gray-400">
        Built with ❤️ using React, Firebase, and Polygon Blockchain.
      </p>
    </div>
  );
};

export default About;