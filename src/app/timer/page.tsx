import React from "react";
import TimeDisplay from "../_components/Timer/TimeDisplay";

const Page = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex items-center justify-center">
        <TimeDisplay />
      </div>
    </div>
  );
};

export default Page;
