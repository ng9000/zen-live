import React from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className=" bg-white p-1 rounded-full">
        <Image src="/spooky.svg" alt="logo" height={80} width={80} />
      </div>
      <div className={cn("flex flex-col items-center", font.className)}>
        <p className="text-xl font-semibold">Zen Live</p>
        <p className="text-sm text-muted-foreground">Let&apos;s play</p>
      </div>
    </div>
  );
};
