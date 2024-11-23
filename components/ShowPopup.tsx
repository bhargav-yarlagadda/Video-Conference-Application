import React from "react";

interface ShowPopupProps {
  title: string; // Title prop to accept the title dynamically
}

const ShowPopup: React.FC<ShowPopupProps> = ({ title }) => {


  return (
    <div className="w-screen h-screen absolute inset-0  backdrop-blur-md flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white/80 rounded-md  p-6  max-w-sm w-full">
        <h2 className="text-2xl mt-2 text-black font-bold text-center mb-4">{title}</h2>
      </div>
    </div>
  );
};

export default ShowPopup;