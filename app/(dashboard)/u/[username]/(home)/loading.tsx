import { StreamPlayerSkeleton } from "@/components/Stream";
import React from "react";

const loading = () => {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  );
};

export default loading;
