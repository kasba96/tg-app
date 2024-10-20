"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DynamicWidget } from "../../lib/dynamic";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { encodeFunctionData } from "viem"; // Use viem to encode the function data
import abi from "../abi/nft.json";
import Spinner from "../Spinner"; // Import Spinner component

export default function Interaction() {
  const [minted, setMinted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for spinner
  const [error, setError] = useState(""); // Error state for failed transactions
  const [tasks, setTasks] = useState([
    { id: 1, description: "Tweet your submission for the hackathon", completed: false, url: "", pointsEarned: false },
    { id: 2, description: "Attend a talk and tweet about it", completed: false, url: "", pointsEarned: false }
  ]);
  const { primaryWallet } = useDynamicContext();

  const handleMint = async () => {
    setLoading(true); // Start loading spinner
    setError(""); // Reset any previous errors
    //@ts-ignore
    const publicClient = await primaryWallet?.getPublicClient();
    //@ts-ignore
    const walletClient = await primaryWallet?.getWalletClient();

    // Address of the contract
    const contractAddress = "0x66D45d170a80FD2628F262EEfEFD79BDEF0c8699";

    // Define the function you want to call and its parameters
    const functionName = "mintNFT";
    const recipientAddress = primaryWallet?.address; // Mint for the connected wallet

    // Encode the function call using the ABI and function parameters
    const data = encodeFunctionData({
      abi: abi,
      functionName: functionName,
      args: [recipientAddress]
    });

    // Construct the transaction object
    const transaction = {
      to: contractAddress,
      data: data,
      value: "0" // No Ether is sent with this transaction
    };

    // Send the transaction
    try {
      const hash = await walletClient.sendTransaction(transaction);
      setTransactionHash(hash); // Save transaction hash
      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      console.log(receipt);

      if (receipt) {
        setMinted(true);  // Update the UI if the mint is successful
        setLoading(false); // Stop loading spinner
      }
    } catch (error) {
      console.error("Error during transaction:", error);
      setError("An error occurred, try again later.");
      setLoading(false); // Stop loading spinner in case of error
    }
  };

  const handleTaskSubmit = (taskId: any, url: any) => {
    // Mark the task as completed, but don't show the URL
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true, url, pointsEarned: true } : task
    ));
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-black"
      style={{
        backgroundColor: "#f9f9fb",
        backgroundImage: "url('/background-pattern.svg')",
        backgroundBlendMode: "overlay",
        backgroundRepeat: "repeat"
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

        {/* Mint NFT Button */}
        {!minted ? (
          <>
            {loading ? (
              <Spinner /> // Show spinner while loading
            ) : (
              <button
                onClick={handleMint}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
              >
                Mint NFT
              </button>
            )}
            {/* Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </>
        ) : (
          <div className="flex flex-col items-center">
            {/* QR Code Placeholder */}
            <Image
              src="/qr.png" // QR code placeholder, replace with actual QR code later
              alt="QR Code"
              width={150}
              height={150}
              className="mt-5"
            />
            <p className="text-gray-500 text-sm mt-3">Your NFT Ticket</p>

            {/* Transaction Link */}
            {transactionHash && (
              <a
                href={`https://amoy.polygonscan.com/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2"
              >
                Click here to see transaction
              </a>
            )}

            {/* Tasks after minting */}
            <div className="mt-5 w-full">
              <h3 className="text-lg font-semibold mb-4">Tasks</h3>
              {tasks.length > 0 ? (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`p-4 border rounded-md ${task.completed ? 'bg-gray-200 line-through' : 'bg-white'}`}
                    >
                      <p className="text-gray-800 mb-2">{task.description}</p>

                      {!task.completed && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target;
                            //@ts-ignore
                            const url = form.url.value;
                            handleTaskSubmit(task.id, url);
                          }}
                        >
                          <input
                            type="url"
                            name="url"
                            placeholder="Enter URL"
                            className="border border-gray-300 rounded-md p-2 w-full mb-2"
                            required
                          />
                          <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-md"
                          >
                            Submit URL
                          </button>
                        </form>
                      )}

                      {task.completed && (
                        <>
                          <p className="text-green-500 mt-2">Task completed.</p>
                          <p className="text-blue-500 mt-2">Earned 10 points</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">All tasks completed!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
