import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import jobRoles from "../data/jobRoles.json";
import { matchJobRoles } from "../utils/skillMatcher";
import { verifyOnChain } from "../web3/blockchain";

// 🔧 Configure PDF.js worker
GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

const UploadResume = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [matchedRoles, setMatchedRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [verifiedRole, setVerifiedRole] = useState(null);

  const knownSkills = [
    ...new Set(
      jobRoles.flatMap((role) =>
        role.skills.map((skill) => skill.toLowerCase())
      )
    ),
  ];

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("⚠️ Please upload a valid PDF file.");
      return;
    }

    setPdfFile(file);
    setLoading(true);
    setExtractedSkills([]);
    setMatchedRoles([]);
    setVerifiedRole(null);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = async () => {
      try {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          fullText += pageText + " ";
        }

        const resumeWords = fullText.toLowerCase().split(/[\s,.;:\n()]+/);
        const extracted = knownSkills.filter((skill) =>
          resumeWords.includes(skill)
        );

        setExtractedSkills(extracted);

        const matched = matchJobRoles(extracted, jobRoles);
        setMatchedRoles(matched);

        if (matched.length > 0) {
          const topMatch = matched[0];
          const confirm = window.confirm(
            `🎯 Top match found: "${topMatch.role}"\nMatched Skills: ${topMatch.matchCount}/${topMatch.total}\n\nWould you like to verify this role on Blockchain?`
          );

          if (confirm) {
            const success = await verifyOnChain(topMatch.role, extracted);
            if (success) {
              setVerifiedRole(topMatch.role);
              alert("✅ Successfully verified on Blockchain!");
            } else {
              alert("❌ Blockchain verification failed.");
            }
          }
        } else {
          alert("⚠️ No matching job roles found.");
        }
      } catch (err) {
        console.error("❌ Error parsing PDF:", err);
        alert("Something went wrong while processing the file.");
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">📄 Upload Your Resume</h1>

      <div className="max-w-xl mx-auto bg-white shadow-lg p-6 rounded-2xl">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full mb-6 text-sm border p-2 rounded-md"
        />

        {loading && (
          <p className="text-blue-600 text-sm mb-4">⏳ Extracting skills from resume...</p>
        )}

        {/* Extracted Skills */}
        {extractedSkills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">🧠 Extracted Skills:</h2>
            <div className="flex flex-wrap gap-2">
              {extractedSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Matched Roles */}
        {matchedRoles.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">🎯 Matched Job Roles:</h2>
            {matchedRoles.map((item, index) => {
              const percentage = Math.round((item.matchCount / item.total) * 100);
              return (
                <div key={index} className="bg-gray-100 p-4 rounded shadow">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.role}</span>
                    <span className="text-sm text-gray-600">{percentage}% match</span>
                  </div>
                  <div className="w-full bg-gray-300 h-2 rounded mt-2">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No roles matched */}
        {pdfFile && matchedRoles.length === 0 && !loading && (
          <p className="text-red-500 mt-4 text-center font-medium">
            ❌ No matching job roles found in the resume.
          </p>
        )}

        {/* Verified Banner */}
        {verifiedRole && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 text-center text-green-800 font-semibold rounded-lg">
            ✅ Successfully Verified as <span className="underline">{verifiedRole}</span> on Blockchain!
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadResume;