'use client';
import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import { useRouter } from 'next/navigation';
const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const router = useRouter()
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;
  const call = useCall();
  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.'
    );
  }

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  if (callTimeNotArrived)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-lg font-semibold text-gray-300">
        {`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      </div>
    );

  if (callHasEnded)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-lg font-semibold text-gray-300">
        Call has been ended by the Host.
        <button
        onClick={()=>{
          router.push('/')
        }}
        className='rounded-md p-2 font-thin text-md bg-blue-500' >
          Return Home
        </button>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-900 text-white p-6 gap-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-gradient bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Setup Your Meeting
      </h1>
      <div className=" bg-gray-800  rounded-lg shadow-xl transform transition-all duration-300 ease-in-out hover:scale-[101%]">
        <VideoPreview />
      </div>
      <div className="flex items-center justify-center gap-6 mt-6">
        <label className="flex items-center gap-3 text-sm font-medium text-gray-400 hover:text-gray-200">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
            className="w-5 h-5"
          />
          <span>Join with mic and camera off</span>
        </label>
        <DeviceSettings />
      </div>
      <button
        className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </button>
    </div>
  );
};

export default MeetingSetup;
  