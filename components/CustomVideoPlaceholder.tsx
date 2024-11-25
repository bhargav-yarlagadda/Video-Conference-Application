export const CustomVideoPlaceholder = ({
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
            className="w-20 h-20 lg:w-40 lg:h-40 rounded-full"
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