import { SignIn } from '@clerk/nextjs';

export default function SiginInPage() {
  return (
    <main className="flex h-screen w-full items-center bg-gray-100 bg-opacity-90 backdrop-blur-md justify-center">
      <SignIn />
    </main>
  );
}