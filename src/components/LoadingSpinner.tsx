import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
