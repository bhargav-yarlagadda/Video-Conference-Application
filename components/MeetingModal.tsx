"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonClassName?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image,
  buttonClassName,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "relative w-full max-w-[400px] md:max-w-[520px] rounded-lg bg-gray-900 py-12 px-6 text-white transform transition-transform duration-300",
          isOpen ? "translate-y-0 scale-100" : "translate-y-10 scale-95"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-2 top-2 text-4xl text-white focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-2 px-3">
            <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
              {title}
            </h1>
            {image && (
              <div className="rounded-md bg-white/20 p-2">
                <Image src={image} alt="checked" width={24} height={24} />
              </div>
            )}
          </div>
          {children}
          <button
            className={cn(
              "flex items-center justify-center gap-2 rounded bg-blue-1 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none",
              buttonClassName
            )}
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}
            {buttonText || "Schedule Meeting"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingModal;
