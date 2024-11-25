import React from 'react';

const CallNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-col items-center text-center p-8 bg-gray-800 rounded-lg shadow-lg">
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 bg-red-600 text-white rounded-full shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.172 9.172a4 4 0 015.656 0m-5.656 5.656a4 4 0 010-5.656m0 5.656a4 4 0 015.656 0M9.172 9.172L4.94 4.94m0 0a10.97 10.97 0 0115.492 15.493m-1.414-1.414L9.172 9.172z"
            />
          </svg>
        </div>

        {/* Message */}
        <h1 className="mt-6 text-4xl font-bold text-white bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500">
          Call Not Found
        </h1>

        {/* Description */}
        <p className="mt-4 text-gray-400 text-lg max-w-md">
          The call you are looking for does not exist or may have ended. Please check the link or contact the meeting organizer for further details.
        </p>

        {/* Action Button */}
        <button
          className="mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transform transition duration-300 hover:scale-105"
          onClick={() => {
            // Define redirection or logic here
            console.log('Returning to Home');
          }}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default CallNotFound;
