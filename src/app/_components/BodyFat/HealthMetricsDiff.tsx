import React from "react";
import { type HealthMetrics } from "@prisma/client";
import { format } from "date-fns";

interface HealthMetricsDiffProps {
  recentHealthMetrics: HealthMetrics;
  previousHealthMetrics: HealthMetrics;
}

const HealthMetricsDiff: React.FC<HealthMetricsDiffProps> = ({
  recentHealthMetrics,
  previousHealthMetrics,
}) => {
  console.log(previousHealthMetrics);
  const previousDate =
    previousHealthMetrics.measurementDate !== undefined
      ? format(previousHealthMetrics.measurementDate, "yyyy-MM-dd")
      : "- ";

  const getDiffIndicator = (diff: number) => {
    if (diff > 0) {
      return { symbol: "▲", color: "text-red-500", message: "増加" };
    } else if (diff < 0) {
      return { symbol: "▼", color: "text-blue-500", message: "減少" };
    } else {
      return { symbol: "-", color: "text-gray-500", message: "横ばい" };
    }
  };

  const weightDiffValue =
    recentHealthMetrics.weight - previousHealthMetrics.weight;

  const weightDiff = Math.abs(weightDiffValue).toFixed(1);

  const {
    symbol: healthMetricsSymbol,
    color: healthMetricsColor,
    message: healthMetricsMessage,
  } = getDiffIndicator(weightDiffValue);

  const bodyFatDiffValue =
    recentHealthMetrics.bodyFat !== null &&
    previousHealthMetrics.bodyFat !== null
      ? recentHealthMetrics.bodyFat - previousHealthMetrics.bodyFat
      : "-";

  let bodyFatSymbol, bodyFatColor, bodyFatMessage;

  if (bodyFatDiffValue !== "-") {
    const diffIndicator = getDiffIndicator(bodyFatDiffValue);
    bodyFatSymbol = diffIndicator.symbol;
    bodyFatColor = diffIndicator.color;
    bodyFatMessage = diffIndicator.message;
  } else {
    bodyFatSymbol = "";
    bodyFatColor = "text-gray-500";
    bodyFatMessage = "";
  }

  const bodyFatDiff =
    typeof bodyFatDiffValue === "number"
      ? Math.abs(bodyFatDiffValue).toFixed(2)
      : "-";

  return (
    <div className="rounded-lg p-4">
      <div className="mb-2 text-center text-lg">前回との比較</div>
      <div className="mb-4 text-center text-sm ">{previousDate}</div>
      <div className="flex items-center justify-around py-3">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center text-center">
            <div className="text-xl font-semibold">
              {weightDiff} kg{" "}
              <span className={`${healthMetricsColor} ml-2`}>
                {healthMetricsSymbol}
              </span>
            </div>
          </div>
          <div className="mt-1 text-sm text-gray-500">
            体重{healthMetricsMessage}
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mt-1 text-sm text-gray-400">|</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="text-xl font-semibold">
            {bodyFatDiff}%{" "}
            <span className={`${bodyFatColor} ml-2`}>{bodyFatSymbol}</span>
          </div>
          <div className="mt-1 text-sm text-gray-500">
            体脂肪率{bodyFatMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMetricsDiff;
