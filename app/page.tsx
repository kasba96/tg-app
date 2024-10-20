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

export default function Main() {
  const { sdkHasLoaded, user } = useDynamicContext();
  const { telegramSignIn } = useTelegramLogin();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [campaigns, setCampaigns] = useState<any>();

  useEffect(() => {
    if (!sdkHasLoaded) return;

    const signIn = async () => {
      if (!user) {
        await telegramSignIn({ forceCreateUser: true });
      }
      setIsLoading(false);
      const data = await publicClient.readContract({
        address: '0x5B1B4c1fBa9bF1cBcB410CCe24a7fc059E925836',
        abi: abi,
        functionName: 'getDeployedCampaigns',
      });

      setCampaigns(data);
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
          <div className="inline-flex items-center justify-center">
            <img src="/logo-full.svg" alt="logo" className="w-auto h-6" />
          </div>
        </div>

        {/* Main container */}
        <div className="bg-white p-5 rounded-lg shadow-sm mb-7 mt-7 text-sm w-full">
          <h2 className="text-xl font-semibold mb-3">Welcome to Trail Link</h2>

          {/* DynamicWidget and Campaigns in vertical stack */}
          <div className="flex flex-col space-y-6 justify-center py-4">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <DynamicWidget />
                <Campaigns campaigns={campaigns} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
