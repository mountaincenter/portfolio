import React from "react";
import TimeDisplay from "../_components/Timer/TimeDisplay";
import TimeRecord from "../_components/Timer/TimeRecord";

const Page = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-4 flex items-center justify-center">
        <TimeDisplay />
      </div>
      <div className="flex items-center justify-center">
        <TimeRecord />
      </div>
    </div>
  );
};

export default Page;
