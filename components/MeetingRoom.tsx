"use client";

import { useState } from "react";
import {
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  useCallStateHooks,
  ParticipantView,
  useParticipantViewContext,
  type VideoPlaceholderProps,
} from "@stream-io/video-react-sdk";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AiOutlineAudio,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { useUser } from "@clerk/nextjs";

// Loader Component with a better spinner
const Loader = () => (
  <div className="flex justify-center items-center h-full">
    <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

const CustomVideoPlaceholder = ({ style }: VideoPlaceholderProps) => {
  const { participant } = useParticipantViewContext();

  return (
    <div
      style={{
        ...style,
        width: "100%",
        height: "100%", // Ensure the placeholder takes full container space
        background: "#ddd",
      }}
    >
      {participant.image ? (
        <img
          style={{ width: 100, height: 100, borderRadius: 9999 }}
          src={participant.image}
          alt={participant.sessionId}
        />
      ) : (
        <span>{participant.name || participant.sessionId}</span>
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

  const { useCallCallingState, useCameraState, useParticipants } = useCallStateHooks();
  
  // Fetch calling state, camera state, and participants outside any conditional rendering
  const callingState = useCallCallingState();
  const { user } = useUser();
  const { camera, isMute } = useCameraState();
  const participants = useParticipants();

  // Wait until the user has joined the call before rendering the UI
  if (callingState !== CallingState.JOINED) return <Loader />;

  const toggleMute = () => {
    if (isMute) {
      camera.enable(); // Unmute the audio
    } else {
      camera.disable(); // Mute the audio
    }
    setIsMuted(!isMute);
  };

  const toggleVideo = async () => {
    if (isVideoOff) {
      await camera.enable(); // Turn on the video
    } else {
      await camera.disable(); // Turn off the video
    }
    setIsVideoOff(!isVideoOff);
  };

  return (
    <section className="min-h-screen w-full overflow-y-scroll text-white bg-dark-2">
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
            className="cursor-pointer rounded-lg bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] transition-colors duration-200"
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
            className="cursor-pointer rounded-lg bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] transition-colors duration-200"
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
              onClick={() => router.push(`/`)}
              className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700 text-white transition-colors duration-200"
            >
              End Call
            </button>
          )}
        </div>
      </div>

      {/* Participant Tiles */}
      <div className="flex w-full justify-around p-3 pt-12">
        {participants.map((participant) => (
          <div key={participant.sessionId} className="w-[300px] h-[300px] rounded-md flex justify-center items-center">
            {/* Fixed-size container for the participant view */}
            <ParticipantView
              participant={participant}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetingRoom;
