'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen  flex-col  justify-between  bg-dark-1 p-6 pt-28 text-white lg:w-[264px]">
      <div className="flex flex-col md:w-auto w-[50px] gap-10 md:gap-6 ">
        {sidebarLinks.map((item:any) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'flex gap-1 md:gap-4 items-center p-4 rounded-lg justify-start',
                {
                  'bg-blue-800': isActive,
                }
              )}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;