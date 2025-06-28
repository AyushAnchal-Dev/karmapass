import { ethers } from "ethers";

// ✅ Smart Contract Address (Polygon or any EVM Chain)
const CONTRACT_ADDRESS = "0x0aF2C6d6F3C41ef892A0b051F2D6e263bA2A6f1B";

// ✅ ABI of the deployed contract
const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "string", name: "role", type: "string" },
      { indexed: false, internalType: "string[]", name: "matchedSkills", type: "string[]" },
      { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" }
    ],
    name: "ResumeVerified",
    type: "event"
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getVerifications",
    outputs: [
      {
        components: [
          { internalType: "string", name: "role", type: "string" },
          { internalType: "string[]", name: "matchedSkills", type: "string[]" },
          { internalType: "uint256", name: "timestamp", type: "uint256" }
        ],
        internalType: "struct ResumeVerifier.Verification[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "role", type: "string" },
      { internalType: "string[]", name: "matchedSkills", type: "string[]" }
    ],
    name: "verifyResume",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];


// ✅ Connect to MetaMask and return the contract instance
export const getContract = async () => {
  if (!window.ethereum) throw new Error("🦊 MetaMask not found!");

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  return contract;
};


// ✅ Verify resume on Blockchain (role + matchedSkills)
export const verifyOnChain = async (role, matchedSkills) => {
  try {
    const contract = await getContract();

    // Optional gas estimation (safe fallback)
    try {
      await contract.estimateGas.verifyResume(role, matchedSkills);
    } catch (estimateErr) {
      console.warn("⛽ Gas estimation failed (may still work):", estimateErr);
    }

    const tx = await contract.verifyResume(role, matchedSkills);
    await tx.wait();
    console.log("✅ Verification TX Confirmed:", tx.hash);
    return true;
  } catch (error) {
    console.error("❌ Blockchain verification failed:", error);
    return false;
  }
};


// ✅ Get all verifications done by connected user
export const getUserVerifications = async () => {
  try {
    const contract = await getContract();
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (!accounts || accounts.length === 0) throw new Error("No wallet connected");

    const result = await contract.getVerifications(accounts[0]);
    return result;
  } catch (error) {
    console.error("❌ Error fetching verifications:", error);
    return [];
  }
};