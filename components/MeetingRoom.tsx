"use client";

import { useState } from "react";
import {
  CallStatsButton,
  CallingState,
  useCallStateHooks,
  ParticipantView,
} from "@stream-io/video-react-sdk";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineAudio, AiOutlineVideoCamera } from "react-icons/ai";
import { useUser } from "@clerk/nextjs";
import { StreamVideoParticipant } from "@stream-io/video-react-sdk";
import { useCalls } from '@stream-io/video-react-sdk';

// Loader Component with a better spinner
const Loader = () => (
  <div className="flex justify-center items-center h-full">
    <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

const CustomVideoPlaceholder = ({
  participant,
  style,
}: {
  participant: any;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={`w-[350px] h-[250px] flex justify-center rounded-md items-center bg-blue-500/10 
        ${participant.isSpeaking ? "border-4 border-blue-600" : "border-2 border-gray-400"}`}
      style={style}
    >
      {participant.image ? (
        <img
          className="w-24 h-24 rounded-full"
          src={participant.image}
          alt={participant.sessionId}
        />
      ) : (
        <span className="text-gray-600">{participant.name || "Guest User" }</span>
      )}
    </div>
  );
};

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const router = useRouter();

  const [isMuted, setIsMuted] = useState(false); // State for microphone mute
  const [isVideoOff, setIsVideoOff] = useState(false); // State for video off
  const {
    useCallCallingState,
    useMicrophoneState,
    useCameraState,
    useParticipants,
  } = useCallStateHooks();
  const calls = useCalls();

  // Fetch calling state, camera state, and participants outside any conditional rendering
  const callingState = useCallCallingState();
  const { user } = useUser();
  const { microphone, isMute: isMicrophoneMuted } = useMicrophoneState();
  const { camera, isMute: isCameraMuted } = useCameraState();
  const participants = useParticipants(); // Directly using the participants list

  // Wait until the user has joined the call before rendering the UI
  if (callingState !== CallingState.JOINED) return <Loader />;

  const toggleMute = async () => {
    if (isMicrophoneMuted) {
      await microphone.enable(); // Unmute the microphone
    } else {
      await microphone.disable(); // Mute the microphone
    }
    setIsMuted(!isMicrophoneMuted); // Toggle mute state
  };

  const toggleVideo = async () => {
    if (isVideoOff) {
      await camera.enable(); // Turn on the video
    } else {
      await camera.disable(); // Turn off the video
    }
    setIsVideoOff(!isVideoOff); // Toggle video state
  };

  // Dynamically calculate tile size based on the number of participants
  const getTileSize = (numParticipants: number) => {
    if (numParticipants <= 3) {
      return "w-[450px] h-[300px]"; // Larger tiles for fewer participants
    }
    if (numParticipants <= 6) {
      return "w-[350px] h-[250px]"; // Medium-sized tiles for moderate participants
    }
    return "w-[250px] h-[180px]"; // Smaller tiles for many participants
  };

  const endCall = async () => {
    calls[0].leave();
    router.push('/');
  };

  return (
    <section className="min-h-screen w-full text-white bg-dark-2">
      {/* Video layout and call controls */}
      <div className="flex w-full items-center justify-between gap-5 py-4 px-8 bg-gray-800 bg-opacity-60 rounded-b-xl shadow-lg">
        {/* Layout and stats buttons */}
        <div className="flex items-center space-x-3">
          <span className="text-white">
            {user?.firstName} {user?.lastName || ""}
          </span>
        </div>

        {/* Participant and End Call controls */}
        <div className="flex items-center space-x-4">
          {/* Mute/Unmute mic button */}
          <button
            onClick={toggleMute}
            className={`cursor-pointer rounded-lg px-4 py-2 transition-colors duration-200 ${
              isMuted ? "bg-red-600 hover:bg-red-700" : "bg-[#19232d] hover:bg-[#4c535b]"
            }`}
          >
            <AiOutlineAudio
              className={`w-5 h-5 text-white transition-all duration-200 ${
                isMuted ? "text-red-500" : ""
              }`}
            />
          </button>

          {/* Toggle video on/off button */}
          <button
            onClick={toggleVideo}
            className={`cursor-pointer rounded-lg px-4 py-2 transition-colors duration-200 ${
              isVideoOff ? "bg-red-600 hover:bg-red-700" : "bg-[#19232d] hover:bg-[#4c535b]"
            }`}
          >
            <AiOutlineVideoCamera
              className={`w-5 h-5 text-white transition-all duration-200 ${
                isVideoOff ? "text-red-500" : ""
              }`}
            />
          </button>

          {/* End Call button */}
          {!isPersonalRoom && (
            <button
              onClick={endCall}
              className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700 text-white transition-colors duration-200"
            >
              End Call
            </button>
          )}
        </div>
      </div>

      {/* Participant Tiles */}
      <div
        className="flex w-full h-screen  overflow-auto flex-wrap justify-around gap-y-12 p-3 pt-8 gap-4 scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {participants.map((participant) => (
          <div
            key={participant.sessionId}
            className={` ${getTileSize(participants.length)} rounded-md flex  justify-center items-center`}
          >
            
            <ParticipantView
              VideoPlaceholder={CustomVideoPlaceholder}
              participant={participant}
              className="w-full  h-full "
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetingRoom;
