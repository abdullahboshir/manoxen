"use client";

import { useParams } from "next/navigation";
import { useAuth } from "@manoxen/auth-client";
import { isSuperAdmin as checkIsSuperAdmin } from "@/config/auth-constants";

export function useCurrentBusinessUnit() {
  const params = useParams();
  const {
    user,
    isLoading: authLoading,
    activeBusinessUnit: activeBUId,
  } = useAuth();

  // Loading state
  if (authLoading) {
    return {
      currentBusinessUnit: null,
      activeBUId: null,
      userBusinessUnits: [],
      hasUnitAccess: false,
      isLoading: true,
    };
  }

  // User not found yet
  if (!user) {
    return {
      currentBusinessUnit: null,
      activeBUId: null,
      userBusinessUnits: [],
      hasUnitAccess: false,
      isLoading: false,
    };
  }

  // Get the segments from URL
  const currentOrganizationSlug = (params.organization || params.orgId) as
    | string
    | undefined;
  const currentBusinessUnitSlug = (params["business-unit"] ||
    params.businessUnit ||
    params.buId) as string | undefined;

  // Only treat as ID if it looks like a MongoDB ObjectId (24 hex chars)
  const idFromParams = (params.organizationId || params.id) as
    | string
    | undefined;
  const currentOrganizationId =
    idFromParams && /^[0-9a-fA-F]{24}$/.test(idFromParams)
      ? idFromParams
      : undefined;

  // Get user's assigned business units (now objects with id, name, _id)
  // We derive this from multiple possible backend structures for robustness
  const userBusinessUnits =
    (user as any)?.businessUnits ||
    (user as any)?.context?.available
      ?.map((a: any) => a.businessUnit)
      .filter(Boolean) ||
    (user as any)?.businessAccess
      ?.map((a: any) => a.businessUnit)
      .filter(Boolean) ||
    [];

  const isSuperAdmin =
    checkIsSuperAdmin(user?.role) ||
    (user?.globalRoles || []).some((r: any) =>
      checkIsSuperAdmin(typeof r === "string" ? r : r.id || r.name),
    );

  // Check access: does the URL slug match any of the user's assigned business unit IDs?
  // Check id, slug, name, or _id
  // OR is the user a super-admin?
  const hasUnitAccess = currentBusinessUnitSlug
    ? isSuperAdmin ||
      userBusinessUnits.some(
        (unit: any) =>
          unit.id === currentBusinessUnitSlug ||
          unit.slug === currentBusinessUnitSlug ||
          (unit.name &&
            unit.name.toLowerCase().replace(/ /g, "-") ===
              currentBusinessUnitSlug) ||
          (unit._id && unit._id.toString() === currentBusinessUnitSlug),
      )
    : !!activeBUId;

  // Finding the full business unit object
  const currentBusinessUnit =
    (currentBusinessUnitSlug
      ? userBusinessUnits.find(
          (unit: any) =>
            (unit.slug && unit.slug === currentBusinessUnitSlug) ||
            (unit.id && unit.id === currentBusinessUnitSlug) ||
            (unit._id && unit._id.toString() === currentBusinessUnitSlug) ||
            (unit.name &&
              unit.name.toLowerCase().replace(/ /g, "-") ===
                currentBusinessUnitSlug.toLowerCase()),
        )
      : userBusinessUnits.find(
          (unit: any) =>
            (unit._id && unit._id.toString() === activeBUId) ||
            (unit.id && unit.id === activeBUId),
        )) || null;

  return {
    currentBusinessUnit,
    activeBUId,
    currentOrganizationId,
    currentOrganizationSlug,
    userBusinessUnits,
    hasUnitAccess,
    isLoading: false,
  };
}
