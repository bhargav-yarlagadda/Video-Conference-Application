import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conferencer | Personal Room',
  description: 'Your personalized meeting space for hosting and managing meetings seamlessly.',
};

const PersonalRoom = () => {
  return (
    <section className="flex w-screen h-screen flex-col items-center justify-center bg-black text-white p-6 gap-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center">
        Personal Meeting Room
      </h1>

      <p className="text-lg md:text-xl text-gray-300 text-center">
        This feature is currently under development. Soon, you will be able to:
      </p>

      <ul className="list-disc list-inside text-base md:text-lg text-gray-400 space-y-4 max-w-lg">
        <li>Host private meetings with end-to-end encryption.</li>
        <li>Customize your personal room settings and appearance.</li>
        <li>Share your personalized meeting link with participants.</li>
        <li>Access advanced tools like screen sharing, polls, and chat integration.</li>
      </ul>

      <p className="text-sm md:text-base text-gray-500 text-center italic">
        Stay tuned! We're working hard to bring this feature to you soon.
      </p>
    </section>
  );
};

export default PersonalRoom;
