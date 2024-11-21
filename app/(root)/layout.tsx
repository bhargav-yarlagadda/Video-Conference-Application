import React from "react";
import StreamVideoProvider from "@/providers/StreamClientProvider";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Conference | Meeting Room',
  description: '...',
}
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default layout;
