import React, { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import ReactDatePicker from 'react-datepicker'
const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<"isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined>(undefined); // Popup visibility state
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
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
  
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  

  
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        className="bg-sky-400 hover:scale-105 transition-all ease-in duration-200"
        description="Start an instant meeting"
        handleClick={() => {
          createMeeting();
          setMeetingState("isInstantMeeting");
        }}
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
      {! callDetails ? (
         <MeetingModal
         isOpen={meetingState === 'isScheduleMeeting'}
         onClose={() => setMeetingState(undefined)}
         title="Create Meeting"
         handleClick={createMeeting}
         buttonClassName="bg-blue-500"
         buttonText="Schedule Meeting"
         buttonIcon=""
       >
         <div className="flex flex-col gap-2.5">
           <label className="text-base font-normal leading-[22.4px] text-sky-2">
             Add a description
           </label>
           <input
             className="border-none py-3 text-lg p-2 rounded-sm  bg-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
             onChange={(e) =>
               setValues({ ...values, description: e.target.value })
             }
           />
           <div>
            <label htmlFor="">select a date</label>
            <ReactDatePicker
            selected={values.dateTime}
            onChange={(date)=>{
              setValues({...values,dateTime:date!})
            }}
            showTimeSelect
            timeFormat="hh:mm"
            
            timeCaption="time"
            dateFormat={"MMMM d, yyyy h:mm aa  "}
            className="w-full rounded-sm ms-4 bg-gray-700 p-2"
            />
           </div>
          </div>
           </MeetingModal>
      ) : (
        <MeetingModal
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Meeting Created"
        handleClick={() => {
          navigator.clipboard.writeText(meetingLink);
         
        }}
        image={'/icons/checked.svg'}
        buttonIcon="/icons/copy.svg"
        className="text-center"
        buttonText="Copy Meeting Link">
        </MeetingModal>
      )}

      {/* Show Popup if needed */}
    </section>
  );
};

export default MeetingTypeList;
