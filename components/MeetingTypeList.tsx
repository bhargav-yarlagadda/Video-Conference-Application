"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

const MeetingTypeList = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const {user} = useUser()
  // this is a client side object 
  const client = useStreamVideoClient()
  const [values,setValues] = useState({
    dateTime : new Date(),
    description : "",
    link : ""
  })
  const [callDetails,setCallDetails] = useState<Call>()
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');
      const startsAt =values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
  
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        className="bg-sky-400 hover:scale-105 transition-all ease-in duration-200"
        description="Start an instant meeting"
        handleClick={() => {
          setMeetingState("isInstantMeeting")
          createMeeting()
        }
      }
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-pink-500  hover:scale-105 transition-all ease-in duration-200"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-700  hover:scale-105 transition-all ease-in duration-200"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-500  hover:scale-105 transition-all ease-in duration-200"
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
