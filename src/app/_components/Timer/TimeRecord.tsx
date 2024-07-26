"use client";
import React from "react";
import { useSession } from "next-auth/react";
import KeepRecordButton from "./KeepRecordButton";
import useRecord from "../../hooks/useRecord";

const TimeRecord: React.FC = () => {
  const { data: session, status } = useSession();

  // レコード管理用のカスタムフックを使用
  const { isRecording, elapsedTime, progress, startRecording, stopRecording } =
    useRecord();

  const isLoading = status === "loading";
  const isUnauthenticated = status === "unauthenticated";
  const isAuthenticated = status === "authenticated";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isUnauthenticated) {
    return <div>Please sign in to access this feature.</div>;
  }

  if (isAuthenticated && session) {
    return (
      <div>
        <KeepRecordButton
          isRecording={isRecording}
          elapsedTime={elapsedTime}
          progress={progress}
          startRecording={startRecording}
          stopRecording={stopRecording}
          isLoading={isLoading}
        />
      </div>
    );
  }

  // 追加の保険として、すべてのケースを網羅
  return null;
};

export default TimeRecord;
