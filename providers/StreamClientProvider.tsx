"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { tokenProvider } from "@/actions/stream.actions";
import React from "react";
import { useRouter } from "next/navigation";

const Loader = () => {
  return (
    <div className="flex items-center justify-center bg-black h-screen">
      <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!API_KEY) throw new Error("Stream API key is missing");
    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: `${user?.firstName} ${user?.lastName}` || "Guest",
        image: user?.imageUrl,
      },
      tokenProvider: tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  // Navigate to sign-in if videoClient is null
  useEffect(() => {
    if (!videoClient && isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [videoClient, isLoaded, user, router]);

  if (!videoClient) {
    return <Loader />;
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
