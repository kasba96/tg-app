"use client";
import { useEffect, useState } from "react";
import {
  DynamicWidget,
  useTelegramLogin,
  useDynamicContext,
} from "../lib/dynamic";
import { publicClient } from "../lib/client";
import abi from "./abi/factory.json";
import Campaigns from "./components/Campaigns";
import Spinner from "./Spinner";
import Link from "next/link"; // Import Link for navigation

export default function Main() {
  const { sdkHasLoaded, user } = useDynamicContext();
  const { telegramSignIn } = useTelegramLogin();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [campaigns, setCampaigns] = useState<any>([
    {
      id: 1,
      name: "ETH Global SF",
      description: "Join the premier blockchain hackathon in San Francisco! Collaborate with developers worldwide to build the next big dApp.",
      image: "/palace.jpeg", // Use palace.jpeg for all events
    },
    {
      id: 2,
      name: "Polygon Connect",
      description: "Explore the world of Layer 2 scaling with Polygon! Connect with builders and investors to create groundbreaking Web3 solutions.",
      image: "/palace.jpeg", // Use palace.jpeg for all events
    },
    {
      id: 3,
      name: "Web3 Innovators Summit",
      description: "A summit for the Web3 innovators, packed with workshops and talks on decentralized technologies and the future of the internet.",
      image: "/palace.jpeg", // Use palace.jpeg for all events
    },
  ]);

  useEffect(() => {
    if (!sdkHasLoaded) return;

    const signIn = async () => {
      if (!user) {
        await telegramSignIn({ forceCreateUser: true });
      }
      setIsLoading(false);

      // You can replace this with your actual smart contract logic if needed.
      const data = await publicClient.readContract({
        address: '0x5B1B4c1fBa9bF1cBcB410CCe24a7fc059E925836',
        abi: abi,
        functionName: 'getDeployedCampaigns',
      });

      // Uncomment to use actual data from contract
      // setCampaigns(data);
    };

    signIn();
  }, [sdkHasLoaded]);

  console.log({ user });

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
      <div className="flex flex-col items-center justify-center text-center max-w-3xl px-4">
        {/* Logo */}
        <div className="pt-8">
          <div className="inline-flex items-center justify-center mb-6">
            <img src="/logo.jpeg" alt="Trail Link Logo" className="w-16 h-16" /> {/* Adjust size */}
          </div>
        </div>

        {/* Main container */}
        <div className="bg-white p-5 rounded-lg shadow-sm mb-7 mt-7 text-sm w-full">
          <h2 className="text-xl font-semibold mb-3">Welcome to Trail Link</h2>

          {/* Button to navigate to profile page */}
          <div className="mb-4">
            <Link href="/profile">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
                Go to Profile
              </button>
            </Link>
          </div>

          {/* DynamicWidget and Campaigns in vertical stack */}
          <div className="flex flex-col space-y-6 justify-center py-4">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <DynamicWidget />
                <div className="space-y-4">
                  {campaigns.map((campaign:any) => (
                    <div key={campaign.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                      <img src={campaign.image} alt={campaign.name} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{campaign.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
                        <Link href="/interaction">
                          <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
                            Join Event
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
