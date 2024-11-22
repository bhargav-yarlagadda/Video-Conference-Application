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
import { useCalls } from "@stream-io/video-react-sdk";

const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);
const CustomVideoPlaceholder = ({
  participant,
  numParticipants,
  getTileSize,
}: {
  participant: any;
  numParticipants: number;
  getTileSize: (numParticipants: number) => string;
}) => {
  const tileSizeClass = getTileSize(numParticipants);

  return (
    <div
      className={`flex justify-center items-center rounded-md bg-blue-500/10 ${tileSizeClass} ${
        participant.isSpeaking
          ? "border-4 border-blue-600"
          : "border-2 border-gray-400"
      }`}
    >
      {participant.image ? (
        <img
          className="w-24 h-24 rounded-full"
          src={participant.image}
          alt={participant.sessionId}
        />
      ) : (
        <span className="text-gray-600">
          {participant.name || "Guest User"}
        </span>
      )}
    </div>
  );
};

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const {
    useCallCallingState,
    useMicrophoneState,
    useCameraState,
    useParticipants,
  } = useCallStateHooks();
  const calls = useCalls();

  const callingState = useCallCallingState();
  const { user } = useUser();
  const { microphone, isMute: isMicrophoneMuted } = useMicrophoneState();
  const { camera, isMute: isCameraMuted } = useCameraState();
  const participants = useParticipants();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const toggleMute = async () => {
    if (isMicrophoneMuted) {
      await microphone.enable();
    } else {
      await microphone.disable();
    }
    setIsMuted(!isMicrophoneMuted);
  };

  const toggleVideo = async () => {
    if (isVideoOff) {
      await camera.enable();
    } else {
      await camera.disable();
    }
    setIsVideoOff(!isVideoOff);
  };

  const endCall = async () => {
    calls[0].leave();
    router.push("/");
  };

  const getTileSize = (numParticipants: number) => {
    if (numParticipants <= 3) {
      return "w-full h-[300px] sm:w-[450px] sm:h-[350px]";
    }
    if (numParticipants <= 6) {
      return "w-[280px] h-[200px] sm:w-[350px] sm:h-[250px]";
    }
    return "w-[200px] h-[150px] sm:w-[250px] sm:h-[180px]";
  };

  return (
    <section className="min-h-screen w-full bg-dark-2 text-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 py-4 px-4 md:px-8 bg-gray-800 bg-opacity-60 rounded-b-xl shadow-lg">
        <div className="text-center md:text-left">
          <span className="text-white text-lg">
            {user?.firstName} {user?.lastName || ""}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={toggleMute}
            className={`cursor-pointer rounded-lg px-4 py-2 transition-colors duration-200 ${
              isMuted
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#19232d] hover:bg-[#4c535b]"
            }`}
          >
            <AiOutlineAudio
              className={`w-5 h-5 text-white transition-all duration-200 ${
                isMuted ? "text-red-500" : ""
              }`}
            />
          </button>
          <button
            onClick={toggleVideo}
            className={`cursor-pointer rounded-lg px-4 py-2 transition-colors duration-200 ${
              isVideoOff
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#19232d] hover:bg-[#4c535b]"
            }`}
          >
            <AiOutlineVideoCamera
              className={`w-5 h-5 text-white transition-all duration-200 ${
                isVideoOff ? "text-red-500" : ""
              }`}
            />
          </button>
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

      {/* Participants Section */}
      <div
        className="flex w-full h-screen overflow-auto flex-wrap justify-center md:justify-around gap-6 p-3 pt-8 scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {participants.map((participant) => (
          <div
            key={participant.sessionId}
            className={`flex justify-center transition-all ease-in duration-150  ${participant.isSpeaking ? "border-4 border-blue-400":""} flex-col mb-4 h-[230px]  sm:mb-[70px] md:mb-[100px] lg:mb-[40px]  gap-3   ${getTileSize(
              participants.length
            )} rounded-md`}
          >

            <ParticipantView
              VideoPlaceholder={(props) => (
                <CustomVideoPlaceholder
                  {...props}
                  numParticipants={participants.length}
                  getTileSize={getTileSize}
                />
              )}
              participant={participant}
              className="w-full rounded-full h-full "
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetingRoom;
