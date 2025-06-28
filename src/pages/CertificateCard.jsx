import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import logo from "../assets/karmapass-logo.png";

const CertificateCard = ({ role, matchedSkills, timestamp, address }) => {
  const certRef = useRef();

  const handleDownload = async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current);
    const link = document.createElement("a");
    link.download =` Karmapass-${role || "certificate"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      ref={certRef}
      className="bg-white shadow-2xl border border-gray-300 rounded-2xl p-8 max-w-2xl mx-auto relative"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Karmapass Logo" className="h-12 w-12" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Karmapass</h2>
            <p className="text-sm text-gray-500">Verified Skill Certificate</p>
          </div>
        </div>
        <span className="text-sm text-gray-400 italic">
          ID #{address?.slice(0, 6)}…{address?.slice(-4)}
        </span>
      </div>

      {/* Certificate Details */}
      <div className="space-y-3 text-gray-700">
        <p>
          <strong>🏆 Verified Role:</strong>{" "}
          <span className="text-lg font-medium text-green-700">
            {role && role !== "N/A" ? role : "N/A"}
          </span>
        </p>
        <p>
          <strong>💡 Verified Skills:</strong>{" "}
          {Array.isArray(matchedSkills) && matchedSkills.length > 0
            ? matchedSkills.join(", ")
            : "No skills listed"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>📅 Verified On:</strong>{" "}
          {timestamp
            ? new Date(Number(timestamp) * 1000).toLocaleString()
            : "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>🔗 Wallet Address:</strong>{" "}
          <span className="font-mono break-all text-xs">
            {address || "N/A"}
          </span>
        </p>
      </div>

      {/* Divider */}
      <hr className="my-6 border-t border-gray-200" />

      {/* Signature */}
      <div className="mt-6 flex justify-between items-end">
        <div className="text-xs text-gray-500">
          Certificate issued via Karmapass Smart Contract
        </div>
        <div className="text-right">
          <p
            className="text-3xl text-blue-800 font-semibold"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Ayush Anchal
          </p>
          <p className="text-xs text-gray-600">Karmapass Authority</p>
        </div>
      </div>

      {/* QR Code & Download */}
      <div className="mt-8 flex flex-col items-center">
        <QRCodeCanvas
          value={`https://karmapass.vercel.app/profile/${address}`}
          size={150}
        />
        <p className="text-xs text-gray-500 mt-2">
          Scan to verify this certificate
        </p>
        <button
          onClick={handleDownload}
          className="mt-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
        >
          ⬇️ Download Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;