import React from "react";
import TimeDisplay from "../_components/Timer/TimeDisplay";
import TimeRecord from "../_components/Timer/TimeRecord";

const Page = () => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <div className="absolute top-1/2 -translate-y-1/2 transform">
        <TimeDisplay />
        <TimeRecord />
      </div>
    </div>
  );
};

export default Page;
