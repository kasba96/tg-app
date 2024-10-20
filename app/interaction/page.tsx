"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DynamicWidget } from "../../lib/dynamic"; // Import the DynamicWidget

export default function Interaction() {
  const [minted, setMinted] = useState(false);

  const handleMint = () => {
    // Simulate NFT minting
    setMinted(true);
  };

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
      <div className="bg-white p-5 rounded-lg shadow-sm mb-7 mt-7 text-center w-full max-w-md">
        {/* DynamicWidget */}
        <div className="mb-4">
          <DynamicWidget />
        </div>
        {/* Back to Campaigns Button */}
        <div className="mb-4">
          <Link className="text-blue-600 hover:text-blue-700 underline" href="/">
            ← Back to Campaigns
          </Link>
        </div>

        {/* Campaign Image */}
        <Image
          src="/palace.jpeg" // Placeholder image from public folder
          alt="Event Placeholder"
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />

        {/* Campaign Name */}
        <h1 className="text-2xl font-semibold mb-2">Campaign Name</h1>

        {/* Campaign Description */}
        <p className="text-gray-500 text-sm mb-4">
          This is a placeholder description for the campaign.
        </p>

        {/* Placeholder Task List */}
        <h3 className="text-lg font-semibold mb-2">Tasks</h3>
        <ul className="list-disc list-inside text-left text-gray-500 text-sm mb-4">
          <li>Task 1: Complete this task</li>
          <li>Task 2: Complete another task</li>
          <li>Task 3: One more task to complete</li>
        </ul>

        {/* Mint NFT Button */}
        {!minted ? (
          <button
            onClick={handleMint}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
          >
            Mint NFT
          </button>
        ) : (
          <div className="flex flex-col items-center">
            {/* QR Code Placeholder */}
            <Image
              src="/placeholder-qr.png" // QR code placeholder, replace with actual QR code later
              alt="QR Code"
              width={150}
              height={150}
              className="mt-5"
            />
            <p className="text-gray-500 text-sm mt-3">Your NFT Ticket</p>
          </div>
        )}
      </div>
    </div>
  );
}
