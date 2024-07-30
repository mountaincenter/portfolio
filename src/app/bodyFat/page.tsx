import React from "react";
import HealthMetricsStats from "../_components/BodyFat/HealthMetricsStats";
import CreateHealthMetrics from "../_components/BodyFat/CreateHealthMetrics";

const Page = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="mt-5 w-full max-w-xl items-center justify-center">
        <div className="w-full rounded-lg px-8 py-6 shadow-md">
          <>
            <HealthMetricsStats />
            <CreateHealthMetrics />
          </>
        </div>
      </div>
    </main>
  );
};

export default Page;
