"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        className="bg-sky-400"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-pink-500"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-700"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-500"
      />

      {/* Schedule Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === "isScheduleMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Schedule a Meeting"
        image="/icons/schedule.svg"
        buttonText="Confirm Schedule"
        buttonClassName="bg-green-500 hover:bg-green-600"
        handleClick={() => {
         
          setMeetingState(undefined);
        }}
      >
        <p className="text-center text-gray-300">
          Plan your meeting ahead of time. Add details, select a time, and share
          with participants.
        </p>
      </MeetingModal>

      {/* Join Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Join a Meeting"
        image="/icons/join-meeting.svg"
        buttonText="Join Now"
        buttonClassName="bg-blue-500 hover:bg-blue-600"
        handleClick={() => {


          setMeetingState(undefined);
        }}
      >
        <p className="text-center text-gray-300">
          Enter the meeting ID or use the invitation link to join a meeting.
        </p>
      </MeetingModal>

      {/* Instant Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        image="/icons/add-meeting.svg"
        buttonText="Start Meeting"
        buttonClassName="bg-red-500 hover:bg-red-600"
        handleClick={() => {

          
          setMeetingState(undefined);
        }}
      >
        <p className="text-center text-gray-300">
          Start a meeting instantly and invite participants on the go.
        </p>
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
