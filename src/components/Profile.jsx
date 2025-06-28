import React, { useEffect, useState } from "react";
import { getUserVerifications } from "../web3/blockchain";
import CertificateCard from "../pages/CertificateCard";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Profile = () => {
  const [verifications, setVerifications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [address, setAddress] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const loadData = async () => {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length === 0) return;
        setAddress(accounts[0]);

        const data = await getUserVerifications();
        const safeData = data.map((item) => ({
          ...item,
          timestamp: typeof item.timestamp === "bigint" ? Number(item.timestamp) : item.timestamp,
          role: item.role || "N/A",
          matchedSkills: item.matchedSkills || []
        }));
        setVerifications(safeData);
      } catch (err) {
        console.error("❌ Failed to load profile:", err);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let result = [...verifications];
    if (roleFilter !== "All") {
      result = result.filter((v) => v.role === roleFilter);
    }
    result.sort((a, b) =>
      sortOrder === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp
    );
    setFiltered(result);
  }, [verifications, roleFilter, sortOrder]);

  const uniqueRoles = [...new Set(verifications.map((v) => v.role))];

  const handleDownloadAll = async () => {
    const container = document.getElementById("certificate-grid");
    if (!container) return;

    const canvas = await html2canvas(container, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pdfHeight);
    pdf.save("Karmapass-Certificates.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        🎫 Your Karmapass Profile
      </h1>

      {address && (
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">🔗 Connected Wallet:</p>
          <p className="font-mono text-indigo-800">{address}</p>
        </div>
      )}

      {verifications.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg shadow-sm text-sm"
          >
            <option value="All">🎯 All Roles</option>
            {uniqueRoles.map((role, i) => (
              <option key={i} value={role}>
                {role}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-2 border rounded-lg shadow-sm text-sm"
          >
            <option value="newest">📅 Newest First</option>
            <option value="oldest">📜 Oldest First</option>
          </select>

          {filtered.length > 0 && (
            <button
              onClick={handleDownloadAll}
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              ⬇️ Download All as PDF
            </button>
          )}
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          ✅ Verified Certificates
        </h2>

        {filtered.length === 0 ? (
          <p className="text-center text-red-500 font-medium">
            No verifications found{roleFilter !== "All" ? " for this role." : "."}
          </p>
        ) : (
          <div id="certificate-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item, index) => (
              <CertificateCard
                key={index}
                role={item.role}
                matchedSkills={item.matchedSkills}
                timestamp={item.timestamp}
                address={address}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;