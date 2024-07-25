"use client";
import React from "react";
import { useSession } from "next-auth/react";

const TimeRecord = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return <div>TimeRecord signed In {session.user?.name}</div>;
  }

  return <div>Please sign in to access this feature.</div>;
};

export default TimeRecord;
