"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import { type HealthMetrics } from "@prisma/client";

const HealthMetricsStats: React.FC = () => {
  const { data: session, status } = useSession();
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics | null>(
    null,
  );

  useEffect(() => {
    const fetchHealthMetrics = async () => {
      if (session?.user?.id) {
        try {
          const data = (await api.healthMetrics.getHealthMetricsByUserId.query({
            userId: session.user.id,
          })) as HealthMetrics;
          setHealthMetrics(data);
        } catch (error) {
          console.error("Failed to fetch health metrics:", error);
        }
      }
    };

    void fetchHealthMetrics();
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to access this feature.</div>;
  }

  return (
    <div>
      {healthMetrics && session ? (
        <div>
          <h2>{session.user?.name}&apos;s Health Metrics</h2>
          <p>Weight: {healthMetrics.weight}</p>
          <p>Body Fat: {healthMetrics.bodyFat}</p>
          <p>
            Measurement Date:{" "}
            {new Date(healthMetrics.measurementDate).toDateString()}
          </p>
        </div>
      ) : (
        <div>No health metrics available.</div>
      )}
    </div>
  );
};

export default HealthMetricsStats;
