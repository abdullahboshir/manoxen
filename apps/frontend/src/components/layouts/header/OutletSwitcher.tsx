"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname } from "next/navigation";
import { useGetOutletsQuery } from "@/redux/api/organization/outletApi";
import { useState, useEffect } from "react";
import { Plus, Store } from "lucide-react";

interface OutletSwitcherProps {
  currentBusinessUnitSlug: string;
  effectiveOrganizationId?: string | null;
  activeUnit: any; // The full unit object
}

export function OutletSwitcher({
  currentBusinessUnitSlug,
  effectiveOrganizationId,
  activeUnit,
}: OutletSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeOutletId, setActiveOutletId] = useState<string | null>(null);

  // Simplified ID resolution
  const activeUnitId =
    activeUnit?._id?.toString() ||
    activeUnit?.id?.toString() ||
    activeUnit?.slug ||
    currentBusinessUnitSlug;

  // Check if active unit already has outlets (from filtered context)
  const preloadedOutlets = activeUnit?.outlets;
  const hasPreloadedOutlets =
    Array.isArray(preloadedOutlets) && preloadedOutlets.length > 0;

  // Always fetch outlets for the active business unit to ensure full data (branding, name)
  const isReservedKeyword = [
    "dashboard",
    "overview",
    "settings",
    "profile",
    "platforms",
  ].includes(activeUnitId);

  const { data: outletsData, isLoading } = useGetOutletsQuery(
    { businessUnit: activeUnitId },
    { skip: !activeUnitId || isReservedKeyword },
  );

  const outlets = Array.isArray(outletsData)
    ? outletsData
    : outletsData?.data || outletsData?.result || [];
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let outletId = params.get("outlet");

    if (!outletId && pathname?.includes("/outlets/")) {
      const parts = pathname.split("/outlets/");
      if (parts.length > 1) {
        outletId = parts[1].split("/")[0];
      }
    }

    if (outletId === "new") outletId = null;

    if (outletId) {
      setActiveOutletId(outletId);
      localStorage.setItem("active-outlet-id", outletId);
    } else {
      setActiveOutletId(null);
      localStorage.removeItem("active-outlet-id");
    }
  }, [pathname]);

  const handleSwitchOutlet = (outletId: string) => {
    const targetSlug =
      activeUnit?.slug || activeUnit?.id || currentBusinessUnitSlug;
    const params = new URLSearchParams();

    // Use the normalized effectiveOrganizationId from props if available, otherwise extract from unit
    const effectiveOrganizationRaw =
      effectiveOrganizationId ||
      activeUnit?.organization?._id ||
      activeUnit?.organization;
    const effectiveOrganization =
      effectiveOrganizationRaw && typeof effectiveOrganizationRaw === "object"
        ? effectiveOrganizationRaw._id?.toString() ||
          effectiveOrganizationRaw.id?.toString() ||
          effectiveOrganizationRaw.toString()
        : effectiveOrganizationRaw?.toString();

    if (effectiveOrganization && effectiveOrganization !== "[object Object]")
      params.set("organization", effectiveOrganization);

    // Correct path resolution: Include organization slug if available
    const orgSlug =
      activeUnit?.organization?.slug ||
      activeUnit?.organization?.id ||
      (effectiveOrganization !== "[object Object]"
        ? effectiveOrganization
        : null);
    const basePath = orgSlug ? `/${orgSlug}/${targetSlug}` : `/${targetSlug}`;

    if (outletId === "add-new") {
      router.push(
        `${basePath}/outlets/new${params.toString() ? `?${params.toString()}` : ""}`,
      );
      return;
    }

    if (outletId === "all") {
      setActiveOutletId(null);
      localStorage.removeItem("active-outlet-id");
      router.push(
        `${basePath}/overview${params.toString() ? `?${params.toString()}` : ""}`,
      );
    } else {
      setActiveOutletId(outletId);
      localStorage.setItem("active-outlet-id", outletId);
      params.set("outlet", outletId);
      // Route is (outlet)/[orgId]/[buId]/[outletId] = /orgSlug/buSlug/outletId
      router.push(
        `${basePath}/${outletId}${params.toString() ? `?${params.toString()}` : ""}`,
      );
    }
  };

  if (!activeUnit) return null;
  if (!isLoading && outlets.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <Select
        value={activeOutletId || "all"}
        onValueChange={handleSwitchOutlet}
      >
        <SelectTrigger className="w-auto h-8 text-sm bg-muted/50 border-muted-foreground/20 [&>span]:truncate [&>span]:block [&>span]:w-full [&>span]:text-left">
          <div className="flex items-center gap-2 text-muted-foreground overflow-hidden w-full">
            <Store className="h-3 w-3 shrink-0" />
            <div className="truncate max-w-[150px]">
              <SelectValue placeholder="Select Outlet" />
            </div>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Select Outlet</SelectItem>
          <SelectSeparator />
          {outlets.map((outlet: any) => (
            <SelectItem
              key={
                outlet._id?.toString() || outlet.id?.toString() || outlet._id
              }
              value={
                outlet._id?.toString() || outlet.id?.toString() || outlet._id
              }
            >
              {outlet.name || outlet.branding?.name || "Unnamed Outlet"}
            </SelectItem>
          ))}
          <SelectSeparator />
          <SelectItem
            value="add-new"
            className="text-primary font-medium focus:text-primary focus:bg-primary/10"
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add new Outlet
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
