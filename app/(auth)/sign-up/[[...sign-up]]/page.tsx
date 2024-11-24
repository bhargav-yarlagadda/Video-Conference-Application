import { SignUp } from '@clerk/nextjs';

import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Conferencer | Sign up',
  description: 'A workspace for your team, powered by Stream Chat and Clerk.',
};
export default function SignUpPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignUp />
    </main>
  );
}