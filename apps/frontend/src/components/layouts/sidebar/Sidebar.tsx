import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { getSidebarMenu } from "@/config/sidebar-menu";
import { OPERATIONAL_MODULES } from "@/config/module-registry";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

import { useGetSystemSettingsQuery } from "@/redux/api/system/settingsApi";
import { useGetBusinessUnitsQuery } from "@/redux/api/organization/businessUnitApi";
import { useGetOutletQuery } from "@/redux/api/organization/outletApi";
import { SidebarMenu } from "./SidebarMenu";
import { useAuth } from "@manoxen/auth-client";
import { useCurrentRole } from "@manoxen/auth-client";
import {
  normalizeAuthString,
  USER_ROLES,
  isSuperAdmin as checkIsSuperAdminHelper,
  isOrganizationOwner as checkisOrganizationOwnerHelper,
} from "@/config/auth-constants";

interface SidebarProps {
  className?: string;
  onItemClick?: () => void;
}

export function Sidebar({ className, onItemClick }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { user, isLoading: isUserLoading } = useAuth();
  const { currentRole } = useCurrentRole();

  // Cache settings to prevent flicker during refetch
  const cachedOrganizationOwnerRef = useRef<boolean>(false);
  const cachedSuperAdminRef = useRef<boolean>(false);

  // Fetch System Settings
  const { data: systemSettings } = useGetSystemSettingsQuery(undefined);

  // 1. Resolve Business Unit Context
  let businessUnit = (params["business-unit"] ||
    params.buId ||
    params.businessUnit ||
    params.buId ||
    params.buId) as string;

  const RESERVED_PATHS = [
    "user-management",
    "finance",
    "reports",
    "support",
    "system",
    "logistics",
    "risk",
    "business-units",
    "settings",
    "profile",
    "dashboard",
  ];

  // Detect if we're on organization route (orgId exists but NO buId)
  const orgId = (params.orgId || params.organization) as string | undefined;
  const buId = (params.buId || params["business-unit"]) as string | undefined;
  const isOrganizationAdminRoute = !!orgId && !buId;

  if (!businessUnit) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length >= 1) {
      const firstSegment = segments[0];
      const GLOBAL_ROOTS = [
        "auth",
        "platform",
        "organization",
        "home",
        "api",
        "_next",
        "favicon.ico",
      ];

      if (
        !GLOBAL_ROOTS.includes(firstSegment) &&
        !RESERVED_PATHS.includes(firstSegment)
      ) {
        businessUnit = firstSegment;
      }
    }
  }

  if (
    pathname.startsWith("/platform") ||
    pathname.startsWith("/organization") ||
    isOrganizationAdminRoute
  ) {
    businessUnit = "";
  }

  const outletId = (params.outletId as string) || searchParams.get("outlet");
  const organizationId = searchParams.get("organization");

  // 2. Identify Roles & Scopes Robustly
  const currentIsSuperAdmin = !!(
    user?.isSuperAdmin ||
    (user?.globalRoles || []).some((r: any) =>
      checkIsSuperAdminHelper(typeof r === "string" ? r : r.slug || r.name),
    )
  );

  const currentisOrganizationOwner = !!(
    (user?.globalRoles || []).some((r: any) =>
      checkisOrganizationOwnerHelper(
        typeof r === "string" ? r : r.slug || r.name,
      ),
    ) ||
    (user?.businessAccess || []).some(
      (acc: any) =>
        checkisOrganizationOwnerHelper(
          typeof acc.role === "string"
            ? acc.role
            : acc.role?.slug || acc.role?.name,
        ) || acc.scope === "ORGANIZATION",
    )
  );

  // Determine CONTEXT-BASED Role for Sidebar Menu (God Mode Downward)
  // Super Admin in Org context → shows Org menu, not Platform menu
  // The user's actual role is for PERMISSION checks, this is for MENU DISPLAY
  let contextRole: string;

  if (pathname.startsWith("/platform")) {
    // Platform context
    contextRole = USER_ROLES.SUPER_ADMIN;
  } else if (outletId) {
    // Outlet context (most specific)
    contextRole = "outlet-manager";
  } else if (businessUnit) {
    // Business Unit context
    contextRole = "business-admin";
  } else if (isOrganizationAdminRoute) {
    // Organization context (detected via params: orgId exists, no buId)
    contextRole = USER_ROLES.ORGANIZATION_OWNER;
  } else {
    // Fallback to platform for Super Admin or default
    contextRole = (currentRole as string) || USER_ROLES.ADMIN;
  }

  // Keep user's actual role for permission filtering
  const userRole = currentRole as string;

  // Update refs when user data is available
  useEffect(() => {
    if (!isUserLoading && user) {
      cachedSuperAdminRef.current = currentIsSuperAdmin;
      cachedOrganizationOwnerRef.current = currentisOrganizationOwner;
    }
  }, [isUserLoading, user, currentIsSuperAdmin, currentisOrganizationOwner]);

  const isSuperAdmin = isUserLoading
    ? cachedSuperAdminRef.current
    : currentIsSuperAdmin;
  const isOrganizationOwner = isUserLoading
    ? cachedOrganizationOwnerRef.current
    : currentisOrganizationOwner;

  // 3. Fetch Contextual Data (Business Units / Outlets)
  const canFetchAllUnits = isSuperAdmin || isOrganizationOwner;
  const { data: allBusinessUnits } = useGetBusinessUnitsQuery(
    canFetchAllUnits && organizationId
      ? { organization: organizationId }
      : undefined,
    { skip: !canFetchAllUnits },
  );

  const businessUnitsResult = Array.isArray(allBusinessUnits)
    ? allBusinessUnits
    : (allBusinessUnits as any)?.data || [];
  const contextAvailable = user?.context?.available || [];
  let availableUnits: any[] = [];

  if (canFetchAllUnits) {
    availableUnits = businessUnitsResult;
  } else if (contextAvailable.length > 0) {
    availableUnits = contextAvailable.map((ctx: any) => ({
      ...(ctx.businessUnit || ctx.organization),
      outlets: ctx.outlets || [],
    }));
  } else {
    const userBUs = (user?.businessAccess || [])
      .map((acc: any) => acc.businessUnit)
      .filter(Boolean);
    availableUnits = [
      ...new Map(userBUs.map((bu: any) => [bu._id || bu.id, bu])).values(),
    ];
  }

  const activeUnit = businessUnit
    ? availableUnits.find(
        (u: any) =>
          u.id === businessUnit ||
          u.slug === businessUnit ||
          u._id?.toString() === businessUnit,
      )
    : null;

  const { data: activeOutletData } = useGetOutletQuery(outletId as string, {
    skip: !outletId,
  });
  const activeOutlet = activeOutletData?.data || activeOutletData || null;

  // 4. Resolve Active Modules for Filtering
  const outletModules = activeOutlet?.activeModules;
  const unitModules =
    activeUnit?.activeModules || activeUnit?.organization?.activeModules;
  const userModules = (user as any)?.organization?.activeModules;
  const activeModules =
    outletModules ||
    unitModules ||
    userModules ||
    systemSettings?.enabledModules ||
    {};

  // 5. Menu Generation (using contextRole for God Mode Downward)
  // menuRole directly uses contextRole - no override needed
  const menuRole = contextRole;

  const rawOrganization = (params.organization ||
    params.orgId ||
    params.orgId) as string;

  // Robust Organization Resolution: If URL has literal 'organization', try to find real slug from user context
  const organization = useMemo(() => {
    if (
      rawOrganization &&
      rawOrganization !== "organization" &&
      rawOrganization !== "(organization)"
    )
      return rawOrganization;

    // Check user profile/context for a better slug
    if ((user as any)?.organization) {
      const org =
        typeof (user as any).organization === "object"
          ? (user as any).organization
          : null;
      if (org?.slug) return org.slug;
    }

    if (user?.businessAccess && user.businessAccess.length > 0) {
      const access = user.businessAccess[0];
      const org =
        typeof access.organization === "object" ? access.organization : null;
      if (org?.slug) return org.slug;
    }

    return (
      rawOrganization || localStorage.getItem("active-organization-id") || ""
    );
  }, [rawOrganization, user]);
  const rawMenuItems = getSidebarMenu(
    menuRole,
    businessUnit || "",
    outletId as string,
    organizationId,
    isOrganizationAdminRoute,
    organization,
  );

  // 6. Filter Menu Items by Module configuration
  const configuredMenuItems = useMemo(() => {
    const filterByConfig = (items: any[]): any[] => {
      return items.reduce((acc: any[], item: any) => {
        if (item.module) {
          const moduleKey = item.module.toLowerCase();
          // Hide item if specifically disabled in current context
          if (!isSuperAdmin && activeModules[moduleKey] === false) {
            return acc;
          }
        }
        const newItem = { ...item };
        if (newItem.children) {
          newItem.children = filterByConfig(newItem.children);
        }
        acc.push(newItem);
        return acc;
      }, []);
    };
    return filterByConfig(rawMenuItems);
  }, [rawMenuItems, activeModules, isSuperAdmin]);

  // 7. Filter Menu Items by Permissions
  const permittedMenuItems = useMemo(() => {
    if (!user && !isUserLoading) return [];
    const isSuperAdminUser = isSuperAdmin;
    const isOrganizationOwnerUser =
      isOrganizationOwner ||
      userRole === USER_ROLES.ORGANIZATION_OWNER ||
      userRole === "owner";
    const effectivePermissions = (user as any)?.effectivePermissions || [];

    const filterByPermission = (items: any[]): any[] => {
      return items.reduce((acc: any[], item: any) => {
        let hasAccess = false;
        const moduleKey = item.module ? item.module.toLowerCase() : "";
        const bypassRoles = [
          "business-admin",
          "store-manager",
          "admin",
          "manager",
        ];
        const isOperationalBypass =
          bypassRoles.includes(contextRole) &&
          OPERATIONAL_MODULES.includes(moduleKey);

        if (
          isSuperAdminUser ||
          isOrganizationOwnerUser ||
          isOperationalBypass
        ) {
          hasAccess = true;
        } else if (item.resource) {
          const resource = item.resource.toLowerCase();
          const action = (item.action || "read").toLowerCase();
          hasAccess = effectivePermissions.some((p: string) => {
            const pLower = p.toLowerCase();
            return (
              pLower === `${resource}:${action}` ||
              pLower === `*` ||
              (pLower === resource && !action)
            );
          });
        } else {
          hasAccess = true; // No resource key = public/generic
        }

        if (hasAccess) {
          const newItem = { ...item };
          if (newItem.children) {
            newItem.children = filterByPermission(newItem.children);
            // Hide parent if it has children defined but none are accessible
            if (
              item.children &&
              item.children.length > 0 &&
              newItem.children.length === 0
            ) {
              hasAccess = false;
            }
          }
          if (hasAccess) acc.push(newItem);
        }
        return acc;
      }, []);
    };
    return filterByPermission(configuredMenuItems);
  }, [
    configuredMenuItems,
    user,
    isSuperAdmin,
    isOrganizationOwner,
    isUserLoading,
    contextRole,
  ]);

  // 8. Search Filtering
  const finalMenuItems = useMemo(() => {
    if (!searchQuery.trim()) return permittedMenuItems;
    const lowerQuery = searchQuery.toLowerCase();
    const searchFilter = (items: any[]): any[] => {
      return items.reduce((acc: any[], item: any) => {
        const matchesTitle = (item.title || "")
          .toLowerCase()
          .includes(lowerQuery);
        let matchingChildren: any[] = [];
        if (item.children) matchingChildren = searchFilter(item.children);

        if (matchesTitle || matchingChildren.length > 0) {
          acc.push({
            ...item,
            children: matchingChildren,
          });
        }
        return acc;
      }, []);
    };
    return searchFilter(permittedMenuItems);
  }, [permittedMenuItems, searchQuery]);

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {!isCollapsed && (
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
          </div>
        </div>
      )}
      <div className="flex-1 overflow-auto">
        <SidebarMenu
          items={finalMenuItems}
          isCollapsed={isCollapsed}
          onItemClick={onItemClick}
          currentPath={pathname}
          businessUnit={businessUnit}
          role={contextRole}
        />
      </div>
      <div className="border-t p-3 flex justify-end">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md border text-muted-foreground hover:bg-accent hover:text-foreground transition-all",
            isCollapsed ? "mx-auto" : "",
          )}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
