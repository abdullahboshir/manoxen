"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useGetBusinessUnitsQuery } from "@/redux/api/organization/businessUnitApi";
import { useGetAllOrganizationsQuery } from "@/redux/api/platform/organizationApi";
import { CenteredLoading } from "@/components/shared/CenteredLoading";
import { useAuth } from "@manoxen/auth-client";
import { useMemo } from "react";

export default function OrganizationDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const organizationSlug = (params.organization || params.orgId) as string;
  const organizationId =
    searchParams.get("organizationId") || searchParams.get("organization");
  const { user } = useAuth();

  const { data: allOrgs } = useGetAllOrganizationsQuery(undefined, {
    skip: !user,
  });

  const organizations = useMemo(() => {
    return Array.isArray(allOrgs)
      ? allOrgs
      : (allOrgs as any)?.data || (allOrgs as any)?.result || [];
  }, [allOrgs]);

  const organizationFromSlug = useMemo(() => {
    if (!organizationSlug) return null;
    const fromContext = (user as any)?.context?.available?.find(
      (ctx: any) => ctx.organization?.slug === organizationSlug,
    )?.organization;
    if (fromContext) return fromContext;
    return organizations.find((org: any) => org.slug === organizationSlug);
  }, [organizationSlug, organizations, user]);

  const effectiveOrganizationId =
    organizationId || organizationFromSlug?._id || organizationFromSlug?.id;

  // Fetch BUs for this organization to show counts
  const { data: businessUnitsData, isLoading } = useGetBusinessUnitsQuery(
    effectiveOrganizationId
      ? { organizationId: effectiveOrganizationId }
      : undefined,
    { skip: !effectiveOrganizationId },
  );

  if (isLoading)
    return (
      <CenteredLoading fullScreen message="Loading Organization Dashboard..." />
    );

  const businessUnits = Array.isArray(businessUnitsData)
    ? businessUnitsData
    : (businessUnitsData as any)?.result ||
      (businessUnitsData as any)?.data ||
      [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Organization Overview
        </h1>
        <p className="text-muted-foreground">
          Aggregated analytics and management for all business units.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">
            Total Business Units
          </div>
          <div className="mt-2 text-2xl font-bold">{businessUnits.length}</div>
        </div>
      </div>

      <div className="rounded-xl border bg-muted/20 p-12 text-center">
        <h3 className="text-lg font-semibold">
          Governance & Aggregated Reports
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Detailed organizational stats coming soon.
        </p>
      </div>
    </div>
  );
}
