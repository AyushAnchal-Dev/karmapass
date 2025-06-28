import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Contract, JsonRpcProvider, isAddress } from "ethers";
import { QRCodeCanvas } from "qrcode.react";
import { BadgeCheck } from "lucide-react";

const CONTRACT_ADDRESS = "0x0aF2C6d6F3C41ef892A0b051F2D6e263bA2A6f1B";

const CONTRACT_ABI = [
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getVerifications",
    outputs: [
      {
        components: [
          { internalType: "string", name: "role", type: "string" },
          { internalType: "string[]", name: "matchedSkills", type: "string[]" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        internalType: "struct ResumeVerifier.Verification[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const PublicProfile = () => {
  const { address } = useParams();
  const [verifications, setVerifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!isAddress(address)) {
        setError("❌ Invalid wallet address.");
        return;
      }

      try {
        const provider = new JsonRpcProvider("https://rpc-amoy.polygon.technology");
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        const data = await contract.getVerifications(address);

        console.log("Raw data from contract:", data);

        if (!Array.isArray(data) || data.length === 0) {
          setError("⚠️ No verifications found for this address.");
          setVerifications([]);
          return;
        }

        const formatted = data.map((item) => ({
          role: item.role || "N/A",
          matchedSkills: Array.isArray(item.matchedSkills) ? item.matchedSkills : [],
          timestamp:
            typeof item.timestamp === "bigint"
              ? Number(item.timestamp)
              : item.timestamp
              ? Number(item.timestamp)
              : Math.floor(Date.now() / 1000),
        }));

        setVerifications(formatted);
        setError("");
      } catch (err) {
        console.error("❌ Error fetching verifications:", err);
        setError("⚠️ Could not load data. This address may not be verified.");
        setVerifications([]);
      }
    };

    fetchData();
  }, [address]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <BadgeCheck className="text-green-600 w-7 h-7" />
          <h1 className="text-3xl font-bold text-blue-700">Verified KarmaPass Profile</h1>
        </div>

        <div className="mb-6">
          <p className="text-gray-500 text-sm">👤 Wallet Address:</p>
          <p className="font-mono text-sm break-words">{address}</p>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">🎓 Verified Credentials</h2>

          {error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            verifications.map((item, idx) => (
              <div
                key={idx}
                className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg mb-4"
              >
                <p className="text-blue-800 font-semibold">Role: {item.role}</p>
                <p className="text-gray-700 text-sm mt-1">
                  <strong>Skills:</strong>{" "}
                  {item.matchedSkills.length > 0
                    ? item.matchedSkills.join(", ")
                    : "No skills listed"}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  ⏱ Verified on:{" "}
                  {new Date(item.timestamp * 1000).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">🔗 Public QR Code</h2>
          <QRCodeCanvas
            value={`https://karmapass.vercel.app/profile/${address}`}
            size={160}
          />
          <p className="text-sm text-gray-600 mt-2">
            Scan to view this verified profile on-chain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;