import React from "react";
import type { HealthMetrics, User } from "@prisma/client";
import HealthMetricsDiff from "./HealthMetricsDiff";

interface HealthMetricsProps {
  healthMetrics: HealthMetrics[];
  user: User;
}

const HealthMetricsManagement: React.FC<HealthMetricsProps> = ({
  healthMetrics,
  user,
}) => {
  console.log(healthMetrics);
  console.log(user);
  if (healthMetrics.length < 2) {
    return <div>十分なデータがありません</div>;
  }

  const recentHealthMetrics = healthMetrics[0]!;
  const previousHealthMetrics = healthMetrics[1]!;
  return (
    <div className="p-4">
      <HealthMetricsDiff
        recentHealthMetrics={recentHealthMetrics}
        previousHealthMetrics={previousHealthMetrics}
      />
    </div>
  );
};

export default HealthMetricsManagement;
