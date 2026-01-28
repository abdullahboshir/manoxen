"use client";

import { AppLayout } from "@/components/layouts/AppLayout";
import { useAuth } from "@manoxen/auth-client";
import {
  isOperationalRole,
  isManager,
  isPlatformLevel,
  isOrganizationOwner,
  isBusinessAdmin,
} from "@/config/auth-constants";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DomainGuard } from "@/domains/core/core/ui/components/DomainGuard";
import React, { useMemo } from "react";

interface OutletLayoutProps {
  children: React.ReactNode;
}

/**
 * Outlet / POS Context Layout
 * Wraps font-line operational pages (POS, Terminal settings) with AppLayout.
 * Handles RBAC checks for Cashiers, Sales Associates, and Super Admins.
 */
export default function OutletLayout({ children }: OutletLayoutProps) {
  const { user, isLoading } = useAuth();
  const params = useParams();

  const orgId =
    typeof params?.orgId === "string" ? params.orgId : params?.organization;
  const buId =
    typeof params?.buId === "string"
      ? params.buId
      : params?.["business-unit"] || params?.businessUnit;
  const targetOutletId =
    typeof params?.outletId === "string" ? params.outletId : null;

  // Precise Access Check using robust helpers (similar to RoleGuard)
  const hasAccess = useMemo(() => {
    if (!user) return false;

    // Direct flags (Super Admin)
    if ((user as any).isSuperAdmin === true) return true;

    // 1. Platform Level (Global across all orgs)
    if (isPlatformLevel(user.role) || isPlatformLevel(user.globalRoles))
      return true;

    // 2. Organization Owner (Global across their org)
    if (isOrganizationOwner(user.role) || isOrganizationOwner(user.globalRoles))
      return true;

    // 3. Dynamic Assignment Check (BU or Outlet level)
    const businessAccess = Array.isArray(user.businessAccess)
      ? user.businessAccess
      : user.businessAccess
        ? [user.businessAccess]
        : [];

    return businessAccess.some((acc: any) => {
      // Must be Active
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

      // Target context: Outlet
      if (targetOutletId) {
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
      }

      // Target context: Business Unit (or just generic BU dashboard)
      if (buId) {
        if (matchesBu) return true;

        // Parent Org Assignment covering all BUs
        if (matchesOrg && (scope === "ORGANIZATION" || scope === "GLOBAL")) {
          return true;
        }
      }

      return false;
    });
  }, [user, orgId, buId, targetOutletId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-card rounded-lg border shadow-sm max-w-md">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You do not have permission to access Storefront / POS operations.
            Please ensure you have a valid role assigned to this business unit
            or outlet.
          </p>
          <Button asChild variant="outline">
            <Link href="/">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <DomainGuard module="pos">
      <AppLayout>{children}</AppLayout>
    </DomainGuard>
  );
}
