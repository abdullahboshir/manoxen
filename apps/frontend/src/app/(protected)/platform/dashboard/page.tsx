"use client";

import React from "react";
import { useGetDashboardStatsQuery } from "@/domains/core/iam/api/adminApi";
import { PlatformMetricCards } from "@/domains/platform/platform-dashboard/PlatformMetricCards";
import { GrowthChart } from "@/domains/platform/platform-dashboard/ui/components/GrowthChart";
import { SubscriptionOverview } from "@/domains/platform/platform-dashboard/SubscriptionOverview";
import { SystemHealth } from "@/domains/platform/platform-dashboard/SystemHealth";
import { RecentActivity } from "@/domains/platform/platform-dashboard/RecentActivity";
import { Loader2 } from "lucide-react";

export default function PlatformDashboard() {
  const {
    data: stats,
    isLoading,
    error,
  } = useGetDashboardStatsQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        Error loading dashboard statistics. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Platform Overview</h2>
      </div>

      <PlatformMetricCards stats={stats} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <GrowthChart title="System-wide Revenue Growth" />
        </div>
        <div className="col-span-3">
          <SubscriptionOverview />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <RecentActivity />
        </div>
        <div className="col-span-3">
          <SystemHealth />
        </div>
      </div>
    </div>
  );
}
