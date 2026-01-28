"use client";

import { AppLayout } from "@/components/layouts/AppLayout";
import { useAuth } from "@manoxen/auth-client";
import { isOrganizationOwner, isPlatformLevel } from "@/config/auth-constants";
import { Loader2 } from "lucide-react";
import { DomainGuard } from "@/domains/core/core/ui/components/DomainGuard";
import React, { useMemo } from "react";

interface BusinessUnitLayoutProps {
  children: React.ReactNode;
}

/**
 * Business Unit Context Layout
 * Wraps operational pages (Inventory, Sales, Staffing) with AppLayout.
 * Handles RBAC checks for Branch Managers, Admins and Super Admins.
 */
export default function BusinessUnitLayout({
  children,
}: BusinessUnitLayoutProps) {
  const { user, isLoading } = useAuth();

  // Extract roles from user object
  const userRoles = useMemo(() => {
    if (!user) return [];
    const allRoles: string[] = [];

    // Check user.role (can be array or string)
    if (user.role) {
      const roles = Array.isArray(user.role) ? user.role : [user.role];
      roles.forEach((r: any) => {
        if (typeof r === "string") allRoles.push(r);
        else if (r?.slug) allRoles.push(r.slug);
      });
    }

    if (user.globalRoles) {
      const globalRoles = Array.isArray(user.globalRoles)
        ? user.globalRoles
        : [user.globalRoles];
      globalRoles.forEach((r: any) => {
        if (typeof r === "string") allRoles.push(r);
        else if (r?.slug) allRoles.push(r.slug);
      });
    }

    if (user.businessAccess) {
      const businessAccess = Array.isArray(user.businessAccess)
        ? user.businessAccess
        : [user.businessAccess];
      businessAccess.forEach((acc: any) => {
        if (acc?.role) {
          if (typeof acc.role === "string") allRoles.push(acc.role);
          else if (acc.role?.slug) allRoles.push(acc.role.slug);
        }
      });
    }

    return [...new Set(allRoles)];
  }, [user]);

  // Dynamic Access: Any user with an active business assignment should have access
  const hasAccess = useMemo(() => {
    if (!user) return false;

    // Direct flag check (Super Admin)
    if ((user as any)?.isSuperAdmin === true) return true;

    // Platform Level has global access
    if (isPlatformLevel(userRoles)) return true;

    // Organization Owner has access to all BUs in their org
    if (isOrganizationOwner(userRoles)) return true;

    // Dynamic Assignment Check: Any active businessAccess grants access
    const businessAccess = Array.isArray(user.businessAccess)
      ? user.businessAccess
      : user.businessAccess
        ? [user.businessAccess]
        : [];

    // If user has ANY active business assignment, they have access to BU layout
    return businessAccess.some((acc: any) => {
      if (acc.status && acc.status.toUpperCase() !== "ACTIVE") return false;
      // Has a businessUnit or outlet assignment
      return (
        acc.businessUnit ||
        acc.outlet ||
        acc.scope === "BUSINESS" ||
        acc.scope === "OUTLET"
      );
    });
  }, [user, userRoles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  console.log(
    "roles from layout frommmmmmmmmmmmmmmm",
    isOrganizationOwner(userRoles),
    hasAccess,
  );

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You do not have permission to view Business Unit data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DomainGuard module="erp">
      <AppLayout>{children}</AppLayout>
    </DomainGuard>
  );
}
