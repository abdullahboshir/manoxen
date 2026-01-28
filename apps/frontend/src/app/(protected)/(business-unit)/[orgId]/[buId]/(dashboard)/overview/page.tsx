// "use client";

import BusinessOverview from "@/domains/core/dashboard/overview/BusinessOverview"; // Fixed Path

export default async function OverviewPage({ params }: { params: any }) {
  const resolvedParams = await params;

  return (
    <div className="container mx-auto py-6">
      <BusinessOverview context={resolvedParams} />
    </div>
  );
}
