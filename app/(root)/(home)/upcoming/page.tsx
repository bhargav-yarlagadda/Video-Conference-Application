import CallList from "../../../../components/CallList";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Conferencer | Upcoming',
  description: '...',
}
 
const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Upcoming Meeting</h1>

      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingPage;