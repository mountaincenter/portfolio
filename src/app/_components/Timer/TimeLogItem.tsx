import React, { useState } from "react";
import type { TimeLog } from "@prisma/client";
import { TableCell, TableRow } from "../ui/table";
import {
  fromMinutesToHHmm,
  getDisplayTimes,
  type DisplayTimes,
} from "@/utils/timeUtils";
import TimeLogForm from "./TimeLogForm";

interface TimeLogItemProps {
  timeLog: TimeLog;
}
type SelectedEdit = "startTime" | "stopTime" | null;

const TimeLogItem: React.FC<TimeLogItemProps> = ({ timeLog }) => {
  const { displayDate }: DisplayTimes = getDisplayTimes(timeLog);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState<SelectedEdit>(null);

  return (
    <TableRow key={timeLog.id}>
      <TableCell className="text-right">{displayDate}</TableCell>
      <TimeLogForm
        timeLog={timeLog}
        selectedEdit={selectedEdit}
        setSelectedEdit={setSelectedEdit}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <TableCell className="text-right">
        {fromMinutesToHHmm(timeLog.recordTime)}
      </TableCell>
      <TableCell>終了</TableCell>
    </TableRow>
  );
};

export default TimeLogItem;
