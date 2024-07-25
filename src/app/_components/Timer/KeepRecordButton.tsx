import React from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import TextAtom from "../atoms/Text/TextAtom";
import { Play, StopCircle } from "lucide-react";

interface KeepRecordButtonProps {
  isRecording: boolean;
  elapsedTime: string;
  progress: number | null;
  startRecording: () => void;
  stopRecording: () => void;
  isLoading: boolean;
}

const KeepRecordButton: React.FC<KeepRecordButtonProps> = ({
  isRecording,
  elapsedTime,
  progress,
  startRecording,
  stopRecording,
  isLoading,
}) => {
  const cursorStyle = isLoading ? "cursor-wait" : "cursor-pointer";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <Button
          onClick={startRecording}
          disabled={isRecording || isLoading}
          className={`rounded-full bg-green-500 hover:bg-green-600 ${cursorStyle}`}
        >
          <Play className="h-5 w-5 text-white" />
        </Button>
        <Button
          onClick={stopRecording}
          disabled={!isRecording || isLoading}
          className={`rounded-full bg-red-500 hover:bg-red-600 ${cursorStyle}`}
        >
          <StopCircle className="h-5 w-5 text-white" />
        </Button>
      </div>
      <TextAtom size="small" className="text-white">
        Elapsed Time: {elapsedTime}
      </TextAtom>
      <Progress value={progress} max={100} className="w-full" />
    </div>
  );
};

export default KeepRecordButton;
