import MeetingTypeList from '@/components/MeetingTypeList';
import BgImage from '../../../public/images/hero-background.png';
import Image from 'next/image';

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);

  return (
    <div className="flex flex-col items-center text-white ">
      {/* Hero Section */}
      <div className="relative w-full max-w-6xl rounded-2xl overflow-hidden">
        {/* Background Image */}
        <Image
          src={BgImage}
          alt="Background Image"
          layout="fill"
          className="object-cover "
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/100 md:bg-black/40"></div>

        {/* Time and Date */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <h1 className="text-5xl font-extrabold md:text-6xl lg:text-7xl">{time}</h1>
          <p className="mt-2 text-lg font-medium text-sky-300 md:text-xl lg:text-2xl">{date}</p>
        </div>
      </div>

      {/* Meeting Type List */}
      <div className="mt-8 w-full px-3">
        <MeetingTypeList />
      </div>
    </div>
  );
};

export default Home;
