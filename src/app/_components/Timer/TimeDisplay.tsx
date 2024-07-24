import React from "react";
import Clock from "./Clock";
import Today from "./Today";

const TimeDisplay: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Today />
      <Clock />
    </div>
  );
};

export default TimeDisplay;
