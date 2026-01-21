"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGetBusinessUnitsQuery } from "@/redux/api/organization/businessUnitApi";
import { CenteredLoading } from "@/components/shared/CenteredLoading";
import { useAuth } from "@manoxen/auth-client";

export default function OrganizationDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const organizationSlug = params.organization as string;
  const { user } = useAuth();

  // Fetch BUs for this organization to find where to redirect
  const { data: businessUnits, isLoading } = useGetBusinessUnitsQuery(
    { organizationSlug },
    { skip: !organizationSlug },
  );

  useEffect(() => {
    if (isLoading) return;

    const units = Array.isArray(businessUnits)
      ? businessUnits
      : (businessUnits as any)?.result || (businessUnits as any)?.data || [];

    if (units.length > 0) {
      // Find main or first
      const targetUnit = units.find((u: any) => u.isMain) || units[0];
      const buSlug = targetUnit.slug || targetUnit.id || targetUnit._id;

      // Redirect to the first business unit's dashboard
      router.replace(`/${organizationSlug}/${buSlug}/dashboard`);
    } else {
      // Fallback if no units exist (should ideally show an org-level overview)
      // For now, staying here or going to platform if permitted
      if (user?.isSuperAdmin) {
        router.replace("/platform/dashboard");
      }
    }
  }, [businessUnits, isLoading, organizationSlug, router, user]);

  return (
    <CenteredLoading fullScreen message="Loading Organization Dashboard..." />
  );
}
