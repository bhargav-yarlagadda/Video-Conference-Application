"use client";
import {
  CallingState,
  useCallStateHooks,
  ParticipantView,
  useCall,
} from "@stream-io/video-react-sdk";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useCalls } from "@stream-io/video-react-sdk";
import { CallControls } from "@stream-io/video-react-sdk";

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
  const isPersonalRoom = !! searchParams.get("personal");
  const router = useRouter();

  const {
    useCallCallingState,

    useParticipants,
  } = useCallStateHooks();
  const calls = useCalls();

  const callingState = useCallCallingState();
  const { user } = useUser();
  const participants = useParticipants();

  if (callingState !== CallingState.JOINED) return <Loader />;



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
          <CallControls onLeave={endCall} />
        </div>
        <div>
          {
            !isPersonalRoom && <EndCallForEveryone/>
              
          }
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
            className={`flex justify-center transition-all ease-in duration-150  flex-col mb-4 h-[230px]  sm:mb-[70px] md:mb-[100px] lg:mb-[40px]  gap-3   ${getTileSize(
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


const EndCallForEveryone = () => {
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const router = useRouter()
  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  return (
    <>
      {isMeetingOwner ? (
        <button
          onClick={() => {
            call?.endCall();
            router.push('/')
          }}
          className="w-[140px] text-sm h-[30px] rounded-md bg-red-500">
          End call for everyone
        </button>
      ) : null}
    </>
  );
};
