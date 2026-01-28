"use client";

import { AppLayout } from "@/components/layouts/AppLayout";
import { useAuth } from "@manoxen/auth-client";
import { isOrganizationOwner, isPlatformLevel } from "@/config/auth-constants";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { DomainGuard } from "@/domains/core/core/ui/components/DomainGuard";

interface OrganizationLayoutProps {
  children: React.ReactNode;
}

/**
 * Organization Owner Layout
 * Wraps organization-level pages (Settings, User Management, Finance) with AppLayout.
 * Handles RBAC checks for Organization Owners and Super Admins.
 */
export default function OrganizationLayout({
  children,
}: OrganizationLayoutProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Extract roles from user object
  const userRoles = useMemo(() => {
    if (!user) return [];

    const allRoles: string[] = [];

    // Check globalRoles array
    if (user.globalRoles) {
      const globalRoles = Array.isArray(user.globalRoles)
        ? user.globalRoles
        : [user.globalRoles];
      globalRoles.forEach((r: any) => {
        if (typeof r === "string") allRoles.push(r);
        else if (r?.name) allRoles.push(r.name);
        else if (r?.slug) allRoles.push(r.slug);
      });
    }

    // Check businessAccess roles
    if (user.businessAccess) {
      const businessAccess = Array.isArray(user.businessAccess)
        ? user.businessAccess
        : [user.businessAccess];
      businessAccess.forEach((acc: any) => {
        if (acc?.role) {
          if (typeof acc.role === "string") allRoles.push(acc.role);
          else if (acc.role?.name) allRoles.push(acc.role.name);
          else if (acc.role?.slug) allRoles.push(acc.role.slug);
        }
        // Also check scope for organization-level access
        if (acc?.scope === "ORGANIZATION" || acc?.scope === "organization")
          allRoles.push("organization-owner");
      });
    }

    return [...new Set(allRoles)]; // Remove duplicates
  }, [user]);

  // Organization Admin layout allows: organization-owner and platform-level users
  const hasAccess = useMemo(() => {
    return isOrganizationOwner(userRoles) || isPlatformLevel(userRoles);
  }, [userRoles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // If not authorized, show access denied/loading while possibly redirecting (handled by auth provider usually)
  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You do not have permission to view organization data.
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
