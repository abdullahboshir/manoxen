"use client";

import { useAuth } from "@manoxen/auth-client";
import { usePermissions } from "@/hooks/usePermissions";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import {
  isPlatformLevel,
  isOrganizationOwner,
  normalizeAuthString,
  USER_ROLES,
} from "@/config/auth-constants";

interface RoleGuardProps {
  children: React.ReactNode;
}

export const RoleGuard = ({ children }: RoleGuardProps) => {
  const { user, isLoading: authLoading } = useAuth();
  const { isSuperAdmin } = usePermissions();
  const router = useRouter();
  const params = useParams();

  // Robust Parameter Extraction (matches DashboardHeader logic)
  const orgId = (params?.orgId || params?.organization) as string;
  const buId = (params?.buId ||
    params?.["business-unit"] ||
    params?.businessUnit) as string;

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    // 1. Super Admin Bypass (Highest Priority)
    if (isSuperAdmin) return;

    const currentUser = user as any;

    // 1b. Direct check for system-level flags/roles
    if (
      currentUser.isSuperAdmin ||
      normalizeAuthString(currentUser.role) === USER_ROLES.SUPER_ADMIN
    )
      return;

    // 1c. Global Platform Access (Precise check against all platform roles)
    if (
      isPlatformLevel(currentUser.globalRoles) ||
      isPlatformLevel(currentUser.role)
    ) {
      return;
    }

    // 2. Organization Owner & Cross-BU Access
    // If accessing an Org-level route or any BU within their Org
    const userOrg = currentUser.organization;
    const userOrgSlug = typeof userOrg === "object" ? userOrg.slug : null;
    const userOrgId =
      typeof userOrg === "object"
        ? userOrg._id?.toString() || userOrg.id
        : userOrg;

    // Precise match for organization-owner role
    const isOrgOwner =
      isOrganizationOwner(currentUser.role) ||
      isOrganizationOwner(currentUser.globalRoles);

    const hasOrgAccess =
      (userOrgSlug === orgId || userOrgId === orgId) && isOrgOwner;

    if (hasOrgAccess) return;

    // 3. Dynamic Context-Based Access (Assignments)
    // We check if the user has ANY active assignment that covers the current context.
    const businessAccess = currentUser.businessAccess || [];
    const targetOutletId = (params as any)?.outletId;

    // DEBUG: Trace Authorization Context
    console.log("[RoleGuard Debug]", {
      "URL Params": { orgId, buId, targetOutletId },
      businessAccessCount: businessAccess.length,
      businessAccessRaw: businessAccess,
      globalRoles: currentUser.globalRoles,
      role: currentUser.role,
    });

    const hasAccessToContext = businessAccess.some((acc: any) => {
      // 1. Assignment Must be Active
      if (acc.status && acc.status.toUpperCase() !== "ACTIVE") return false;

      const bu = acc.businessUnit;
      const outlet = acc.outlet;
      const org = acc.organization;
      const scope = acc.scope || "BUSINESS"; // Default to BUSINESS if scope is missing

      // Extract Identifiers
      const buSlug = bu && typeof bu === "object" ? bu.slug : null;
      const buObjId =
        bu && typeof bu === "object" ? bu._id?.toString() || bu.id : bu;
      const outletSlug =
        outlet && typeof outlet === "object" ? outlet.slug : null;
      const outletObjId =
        outlet && typeof outlet === "object"
          ? outlet._id?.toString() || outlet.id
          : outlet;
      const orgSlug = org && typeof org === "object" ? org.slug : null;
      const orgObjId =
        org && typeof org === "object" ? org._id?.toString() || org.id : org;

      // Check if this assignment's BU matches the URL's BU context
      const matchesBu = buId && (buSlug === buId || buObjId === buId);

      // Check if this assignment's Org matches the URL's Org context (Defensive: skip if org not populated)
      const matchesOrg = !org || orgSlug === orgId || orgObjId === orgId;

      // 2. Check Outlet Match (If in outlet context)
      if (targetOutletId) {
        // Direct Assignment to this Outlet
        const matchesOutlet =
          outletSlug === targetOutletId || outletObjId === targetOutletId;
        if (matchesOutlet) return true;

        // Parent BU Assignment if scope is BUSINESS or higher
        if (
          matchesBu &&
          (scope === "BUSINESS" ||
            scope === "ORGANIZATION" ||
            scope === "GLOBAL")
        ) {
          return true;
        }

        return false;
      }

      // 3. Check Business Unit Match (If in BU context)
      if (buId) {
        // Direct BU assignment check
        if (matchesBu) return true;

        // Parent Org Assignment covering all BUs
        if (matchesOrg && (scope === "ORGANIZATION" || scope === "GLOBAL")) {
          return true;
        }
      }

      return false;
    });

    if (!hasAccessToContext) {
      console.warn("Unauthorized Context Access:", {
        orgId,
        buId,
        targetOutletId,
        roles: currentUser.role,
      });

      if (window.location.pathname !== "/unauthorized") {
        router.push("/unauthorized");
      }
    }
  }, [user, authLoading, isSuperAdmin, orgId, buId, router, params]);

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Render children immediately for better UX, relying on useEffect for redirect if forbidden?
  // Or block render? Blocking is safer for "Protected" routes.

  if (!user) return null;

  return <>{children}</>;
};
