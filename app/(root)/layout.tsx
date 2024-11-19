import React from "react";
import StreamVideoProvider from "@/providers/StreamClientProvider";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default layout;
