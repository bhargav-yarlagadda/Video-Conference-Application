"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { avatarImages } from "@/constants";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const {user} = useUser()
  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    setIsNotificationVisible(true);

    // Hide notification after 3 seconds
    setTimeout(() => {
      setIsNotificationVisible(false);
    }, 3000);
  };

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-lg bg-gray-800 p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <article className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <Image src={icon} alt="meeting icon" width={30} height={30} />
          <h1 className="text-3xl font-semibold text-white">{title}</h1>
        </div>
        <p className="text-lg font-thin text-gray-100">Created By: <span className="text-blue-600">{user?.firstName}</span></p>
        <p className="text-base text-gray-400">scheduled at  <span className="font-bold text-white" >{date}</span></p>
      </article>

      <article className="relative flex flex-col justify-center items-center mt-5">
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={45}
              height={45}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 30 }}
            />
          ))}

        </div>

        {!isPreviousMeeting && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleClick}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium text-lg transition-all duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={22} height={22} />
              )}
              &nbsp; {buttonText}
            </button>

            <button
              onClick={handleCopyLink}
              className="rounded-lg bg-gray-700 px-6 py-3 text-white font-medium text-lg transition-all duration-200 ease-in-out hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <Image src="/icons/copy.svg" alt="copy" width={20} height={20} />
              &nbsp; Copy Link
            </button>
          </div>
        )}

        {/* Notification when the link is copied */}
        {isNotificationVisible && (
          <div className="absolute top-0 right-0 mt-4 mr-6 bg-green-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg opacity-90 animate-pulse">
            Link Copied!
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
