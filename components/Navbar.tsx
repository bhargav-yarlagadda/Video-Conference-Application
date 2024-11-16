'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);


  return (
    <nav className="flex justify-between fixed z-50 w-full bg-dark-1 px-x py-4 lg:px-6">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="yoom logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          YOOM
        </p>
      </Link>
      <div>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
