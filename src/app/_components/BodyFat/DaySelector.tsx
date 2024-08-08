import React from "react";
import CalendarPicker from "./CalendarPicker";
import {
  addDays,
  subDays,
  format,
  isSameDay,
  isBefore,
  isAfter,
} from "date-fns";

interface DaySelectorProps {
  onDayChange: (date: Date) => void;
  selectedDay: Date;
  measurementDates?: Date[];
}

const DaySelector: React.FC<DaySelectorProps> = ({
  onDayChange,
  selectedDay,
  measurementDates,
}) => {
  const OldestDay: Date | undefined =
    measurementDates && measurementDates.length > 0
      ? measurementDates.slice(-1)[0]
      : undefined;

  const canSelectPreviousDay =
    OldestDay &&
    isAfter(selectedDay, OldestDay) &&
    !isSameDay(selectedDay, OldestDay);

  const LatestDay: Date =
    measurementDates && measurementDates.length > 0 && measurementDates?.[0]
      ? measurementDates[0]
      : new Date();

  const canSelectNextDay =
    isBefore(selectedDay, LatestDay) && !isSameDay(selectedDay, LatestDay);

  const handlePreviousDay = () => {
    if (measurementDates && measurementDates.length > 0) {
      const currentIndex: number = measurementDates.findIndex((date) =>
        isSameDay(date, selectedDay),
      );
      if (currentIndex > 0) {
        const newDate = measurementDates[currentIndex + 1];
        if (newDate) {
          onDayChange(newDate);
          return;
        }
      }
    }
    const newDate = subDays(selectedDay, 1);
    onDayChange(newDate);
  };

  const handleNextDay = () => {
    if (measurementDates && measurementDates.length > 0) {
      const currentIndex: number = measurementDates.findIndex((date) =>
        isSameDay(date, selectedDay),
      );
      if (currentIndex > 0) {
        const newDate = measurementDates[currentIndex - 1];
        if (newDate) {
          onDayChange(newDate);
          return;
        }
      }
    }
    const newDate = addDays(selectedDay, 1);
    onDayChange(newDate);
  };

  const handleToday = () => {
    const newDate = new Date();
    onDayChange(newDate);
  };

  return (
    <div className="mb-4 flex items-center justify-center space-x-4">
      <button onClick={handlePreviousDay} className="px-2 text-sm">
        {canSelectPreviousDay !== false ? (
          "<"
        ) : (
          <span style={{ opacity: 0 }}>{"<"}</span>
        )}
      </button>
      <div className="mx-4 flex-1 text-center">
        <span className="text-sm">{format(selectedDay, "yyyy年MM月dd日")}</span>
      </div>
      <button onClick={handleNextDay} className="px-2 text-sm">
        {canSelectNextDay ? ">" : <span style={{ opacity: 0 }}>{">"}</span>}
      </button>
      <button onClick={handleToday} className="px-2 text-sm">
        {"最新"}
      </button>
      <CalendarPicker
        onDayChange={onDayChange}
        measurementDates={measurementDates}
      />
    </div>
  );
};

export default DaySelector;
