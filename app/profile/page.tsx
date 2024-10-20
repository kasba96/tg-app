"use client";
import Image from "next/image";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Link from "next/link";
import { DynamicWidget } from "../../lib/dynamic";

export default function Profile() {
  const { primaryWallet } = useDynamicContext();

  // Utility function to truncate Ethereum address
  const truncateAddress = (address:any) => {
    if (!address) return "No address found";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Sample past events attended
  const pastEvents = [
    "EthGlobal Hackathon 2023",
    "Polygon Summit 2024",
    "Web3 Builders Conference"
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-black"
      style={{
        backgroundColor: "#f9f9fb",
        backgroundImage: "url('/background-pattern.svg')",
        backgroundBlendMode: "overlay",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="flex flex-col items-center justify-center text-center max-w-md w-full">
        {/* Logo at the top */}
        <div className="pt-8">
          <div className="inline-flex items-center justify-center mb-6">
            <img src="/logo.jpeg" alt="Trail Link Logo" className="w-16 h-16" /> {/* Adjusted size */}
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm mb-7 mt-7 text-center w-full">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>

          <div className="mb-4">
          <DynamicWidget />
        </div>
        {/* Back to Campaigns Button */}
        <div className="mb-4">
          <Link className="text-blue-600 hover:text-blue-700 underline" href="/">
            ← Back to Campaigns
          </Link>
        </div>

          {/* Ethereum Address */}
          <p className="text-gray-800 mb-4">
            <strong>Ethereum Address:</strong> {truncateAddress(primaryWallet?.address)}
          </p>

          {/* Points Earned */}
          <p className="text-gray-800 mb-4">
            <strong>Points Earned:</strong> 50 points
          </p>

          {/* Current Event */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Current Event</h3>
            <div className="flex justify-center"> {/* Centering the QR code */}
              <Image
                src="/qr.png" // Placeholder QR code image, replace with actual one if needed
                alt="Current Event QR Code"
                width={150}
                height={150}
              />
            </div>
            <p className="text-gray-600 mt-2">NFT Hackathon 2024</p>
          </div>

          {/* Past Events */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Past Events Attended</h3>
            <ul className="list-disc list-inside text-left text-gray-700">
              {pastEvents.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
