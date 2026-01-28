"use client";

import { Badge } from "@/components/ui/badge";
import { User, ShieldCheck, Check, X, Layers, MapPin } from "lucide-react";
import { USER_STATUS } from "@/config/auth-constants";

interface UserRowDetailsProps {
  user: any;
  availableRoles: any[];
  availableOutlets: any[];
  availableBusinessUnits: any[];
}

export function UserRowDetails({
  user,
  availableRoles,
  availableOutlets,
  availableBusinessUnits,
}: UserRowDetailsProps) {
  // 1. Gather all role assignments (Global + Scoped)
  const assignments: any[] = [];

  // A. Global Roles
  if (user.roles && user.roles.length > 0) {
    user.roles.forEach((r: any) => {
      const rId = typeof r === "string" ? r : r._id || r.id;
      const rName = typeof r === "object" && r.name ? r.name : "Unknown";
      assignments.push({
        roleId: rId,
        roleName: rName,
        scopeType: "GLOBAL",
        scopeName: "Global System",
        scopeVariant: "outline",
      });
    });
  }

  // B. Scoped Roles (Business Access)
  if (user.businessAccess && user.businessAccess.length > 0) {
    user.businessAccess.forEach((acc: any) => {
      let scopeName = "Unknown Scope";
      let scopeVariant = "secondary";
      let scopeType = acc.scope;

      // Resolve Scope Name
      if (acc.scope === "GLOBAL") {
        scopeName = "Global System";
        scopeVariant = "outline";
      } else if (acc.outlet) {
        scopeVariant = "secondary";
        let outletName =
          typeof acc.outlet === "object" && acc.outlet.name
            ? acc.outlet.name
            : null;
        let buName =
          typeof acc.businessUnit === "object" && acc.businessUnit.name
            ? acc.businessUnit.name
            : "Unknown BU";

        if (!outletName && typeof acc.outlet === "string") {
          const found = availableOutlets.find(
            (o: any) => o.id === acc.outlet || o._id === acc.outlet,
          );
          if (found) outletName = found.name;
        }
        scopeName = `${buName} > ${outletName || "Outlet"}`;
      } else if (acc.businessUnit) {
        scopeVariant = "default"; // Primary/Business
        if (typeof acc.businessUnit === "object" && acc.businessUnit.name) {
          scopeName = acc.businessUnit.name;
        } else {
          const found = availableBusinessUnits.find(
            (b: any) => b.id === acc.businessUnit || b._id === acc.businessUnit,
          );
          scopeName = found ? found.name : "Business Unit";
        }
      }

      const rId =
        typeof acc.role === "string" ? acc.role : acc.role?._id || acc.role?.id;
      const rName =
        typeof acc.role === "object" && acc.role.name
          ? acc.role.name
          : "Unknown Role";

      assignments.push({
        roleId: rId,
        roleName: rName,
        scopeType,
        scopeName,
        scopeVariant,
      });
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 bg-muted/30 rounded-lg">
      {/* Personal & Security Info */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center text-primary">
            <User className="mr-2 h-4 w-4" /> Personal Information
          </h4>
          <div className="bg-card rounded-md border p-3 space-y-2 text-sm">
            <div className="grid grid-cols-[100px_1fr] gap-1">
              <span className="text-muted-foreground">Full Name:</span>
              <span className="font-medium">{user.name}</span>

              <span className="text-muted-foreground">Email:</span>
              <span className="flex items-center gap-1">
                {user.email}
                {user.isEmailVerified ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <X className="h-3 w-3 text-red-500" />
                )}
              </span>

              <span className="text-muted-foreground">Phone:</span>
              <span className="flex items-center gap-1">
                {user.phone || "N/A"}
                {user.phone &&
                  (user.isPhoneVerified ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-red-500" />
                  ))}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center text-primary">
            <ShieldCheck className="mr-2 h-4 w-4" /> Security
          </h4>
          <div className="bg-card rounded-md border p-3 space-y-2 text-sm">
            <div className="grid grid-cols-[120px_1fr] gap-1">
              <span className="text-muted-foreground">Status:</span>
              <Badge
                variant={
                  user.status === USER_STATUS.ACTIVE ? "default" : "secondary"
                }
                className="w-fit h-5 text-[10px]"
              >
                {user.status}
              </Badge>

              <span className="text-muted-foreground">Password Change:</span>
              <span>
                {user.needsPasswordChange ? "Required" : "Not Required"}
              </span>

              <span className="text-muted-foreground">Last Login:</span>
              <span>
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleString()
                  : "Never"}
              </span>

              <span className="text-muted-foreground">Joined:</span>
              <span>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Access & Roles (Expanded) */}
      <div className="space-y-4 col-span-1 md:col-span-2">
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center text-primary">
            <Layers className="mr-2 h-4 w-4" /> Access & Permissions
          </h4>
          <div className="bg-card rounded-md border p-3 space-y-3 text-sm max-h-[400px] overflow-y-auto">
            {assignments.length > 0 ? (
              <div className="space-y-4">
                {assignments.map((assign: any, idx: number) => {
                  const fullRole = availableRoles.find(
                    (r: any) =>
                      r._id === assign.roleId || r.id === assign.roleId,
                  );

                  const groups =
                    fullRole?.permissionGroups?.map((g: any) =>
                      typeof g === "string" ? g : g.name,
                    ) || [];
                  const permCount = fullRole?.permissions?.length || 0;

                  return (
                    <div
                      key={idx}
                      className="flex flex-col gap-2 p-3 bg-muted/40 rounded-md border hover:bg-muted/60 transition-colors"
                    >
                      {/* Header: Role & Scope */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-md">
                              {assign.roleName ||
                                fullRole?.name ||
                                "Unknown Role"}
                            </span>
                            {fullRole?.isSystemRole && (
                              <Badge
                                variant="secondary"
                                className="text-[10px] h-4"
                              >
                                System
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{assign.scopeName}</span>
                          </div>
                        </div>
                        <Badge
                          variant={assign.scopeVariant as any}
                          className="uppercase"
                        >
                          {assign.scopeType || "Unknown"}
                        </Badge>
                      </div>

                      {/* Body: Permissions/Groups */}
                      <div className="mt-2 border-t pt-2">
                        <div className="flex flex-col gap-2">
                          {groups.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-1">
                              <span className="text-[10px] text-muted-foreground mr-1 font-semibold">
                                Groups:
                              </span>
                              {groups.map((g: string, gIdx: number) => (
                                <Badge
                                  key={gIdx}
                                  variant="secondary"
                                  className="text-[10px] h-4"
                                >
                                  {g}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {fullRole?.permissions &&
                          fullRole.permissions.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {fullRole.permissions.map(
                                (p: any, pIdx: number) => {
                                  const label =
                                    typeof p === "object" &&
                                    p.resource &&
                                    p.action
                                      ? `${p.resource}:${p.action}`
                                      : typeof p === "string"
                                        ? p
                                        : "Unknown Perm";

                                  return (
                                    <Badge
                                      key={pIdx}
                                      variant="outline"
                                      className="text-[10px] bg-background font-mono"
                                    >
                                      {label}
                                    </Badge>
                                  );
                                },
                              )}
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              {groups.length === 0 &&
                                `No detailed permissions found (Raw count: ${permCount})`}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-muted-foreground italic text-xs p-4 text-center">
                No role assignments found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
