import React from "react";
import { Logo } from "./_components/logo";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full items-center justify-center space-y-6">
      <Logo />
      {children}
    </div>
  );
};

export default layout;
