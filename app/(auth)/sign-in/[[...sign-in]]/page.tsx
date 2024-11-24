import { SignIn } from '@clerk/nextjs';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Conferencer | Sign In',
  description: 'A workspace for your team, powered by Stream Chat and Clerk.',
};

export default function SiginInPage() {
  return (
    <main className="flex h-screen w-full items-center bg-gray-100 bg-opacity-90 backdrop-blur-md justify-center">
      <SignIn />
    </main>
  );
}