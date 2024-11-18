/* eslint-disable camelcase */
'use client';

import HomeCard from './HomeCard';

const MeetingTypeList = () => {
  return (
    <section className="grid  grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {/* Meeting Type Cards */}
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        className='bg-gray-950 hover:scale-105 transition-all ease-in duration-400'
        description="Start an instant meeting"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-500 hover:scale-105 transition-all ease-in duration-400"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-500 hover:scale-105 transition-all ease-in duration-400"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-500 hover:scale-105 transition-all ease-in duration-400"
      />

      {/* Modals */}
  


    </section>
  );
};

export default MeetingTypeList;
