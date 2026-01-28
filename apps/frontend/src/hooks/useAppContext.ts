"use client";

import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

export type ContextType =
  | "PLATFORM"
  | "ORGANIZATION"
  | "BUSINESS_UNIT"
  | "OUTLET"
  | "PUBLIC"
  | "UNKNOWN";

export interface AppContext {
  type: ContextType;
  orgId?: string;
  buId?: string;
  outletId?: string;
  isPlatform: boolean;
  isOrganization: boolean;
  isBusinessUnit: boolean;
  isOutlet: boolean;
  isPublic: boolean;
}

/**
 * useAppContext: The Architecture's "Brain".
 * Centralizes context detection (Org/BU/Outlet) from URL and Params.
 * Prevents logic duplication across domain components.
 */
export function useAppContext(): AppContext {
  const params = useParams();
  const pathname = usePathname();

  return useMemo(() => {
    // 1. Resolve IDs from Params (Standardized)
    const orgId = params.orgId as string;
    const buId = params.buId as string;
    const outletId = params.outletId as string;

    // 2. Identify Context Type based on Hierarchy
    let type: ContextType = "UNKNOWN";

    if (pathname.startsWith("/platform")) {
      type = "PLATFORM";
    } else if (pathname.startsWith("/auth") || pathname.startsWith("/public")) {
      type = "PUBLIC";
    } else if (outletId && buId && orgId) {
      type = "OUTLET";
    } else if (buId && orgId) {
      type = "BUSINESS_UNIT";
    } else if (orgId) {
      type = "ORGANIZATION";
    }

    return {
      type,
      orgId,
      buId,
      outletId,
      isPlatform: type === "PLATFORM",
      isOrganization: type === "ORGANIZATION",
      isBusinessUnit: type === "BUSINESS_UNIT",
      isOutlet: type === "OUTLET",
      isPublic: type === "PUBLIC",
    };
  }, [params, pathname]);
}
