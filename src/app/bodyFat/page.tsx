"use client";
import React from "react";
import { useSession } from "next-auth/react";
import HealthMetricsStats from "@/app/_components/BodyFat/HealthMetricsStats";
import CreateHealthMetrics from "@/app/_components/BodyFat/CreateHealthMetrics";
import HealthMetricsManagement from "@/app/_components/BodyFat/HealthMetricsManagement";
import { api } from "@/trpc/react";
import LoadingSpinner from "@/components/LoadingSpinner";

const Page = () => {
  const { status } = useSession();
  const { data: healthMetrics = [], isLoading: healthMetricsLoading } =
    api.healthMetrics.list.useQuery();
  const { data: user, isLoading: userLoading } =
    api.user.getUserById.useQuery();

  const isLoading = status === "loading" || healthMetricsLoading || userLoading;

  if (isLoading) {
    return <LoadingSpinner />; // スピナーなどのローディングインジケータを表示
  }

  if (!user || !healthMetrics.length) {
    return <div>No health metrics available or user not found.</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="mt-5 w-full max-w-xl items-center justify-center">
        <div className="w-full rounded-lg px-8 py-6 shadow-md">
          <HealthMetricsStats healthMetrics={healthMetrics} user={user} />
          <CreateHealthMetrics
            userId={user.id}
            initialMetrics={healthMetrics[0]}
          />
        </div>
        <div className="mt-5 w-full max-w-xl items-center justify-center">
          <div className="w-full rounded-lg px-8 py-6 shadow-md">
            <HealthMetricsManagement
              healthMetrics={healthMetrics}
              user={user}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
