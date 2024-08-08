import React from "react";
import DaySelector from "./DaySelector";
import useDateSelection from "@/app/hooks/useDateSelection";
import { isSameDay } from "date-fns";
import type { HealthMetrics, User } from "@prisma/client";

interface HealthMetricsStatsProps {
  healthMetrics: HealthMetrics[];
  user: User | null | undefined;
}

const HealthMetricsStats: React.FC<HealthMetricsStatsProps> = ({
  healthMetrics,
  user,
}) => {
  const measurementDates = healthMetrics.map(
    (healthMetric) => new Date(healthMetric.measurementDate),
  );

  const { selectedDay, handleDayChange } = useDateSelection(measurementDates);

  const selectedHealthMetric = healthMetrics.find((healthMetric) =>
    isSameDay(new Date(healthMetric.measurementDate), selectedDay),
  );

  if (!selectedHealthMetric || !user) {
    return <div>No health metrics available.</div>;
  }

  const height: number | null = user.height;
  const bmi =
    height !== null
      ? (selectedHealthMetric.weight / (height / 100) ** 2).toFixed(2)
      : "-";

  return (
    <div>
      <DaySelector
        onDayChange={handleDayChange}
        selectedDay={selectedDay}
        measurementDates={measurementDates}
      />
      <div className="flex items-center justify-between p-4">
        <div className="mr-2 flex flex-col items-center">
          <div className="text-sm">体脂肪率</div>
          <div className="text-lg font-semibold">
            {selectedHealthMetric.bodyFat?.toFixed(2) ?? "-"}%
          </div>
        </div>
        <div className="mx-2 flex flex-col items-center">
          <div className="text-3xl font-bold text-blue-600">
            {selectedHealthMetric.weight.toFixed(2)} kg
          </div>
          <div className="text-sm">体重</div>
        </div>
        <div className="ml-2 flex flex-col items-center">
          <div className="text-sm ">BMI</div>
          <div className="text-lg font-semibold">{bmi}</div>
        </div>
      </div>
    </div>
  );
};

export default HealthMetricsStats;
