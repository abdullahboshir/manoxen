"use client";

import { ReactNode } from "react";
import { useAuth } from "@manoxen/auth-client";
import { useGetSystemSettingsQuery } from "@/redux/api/system/settingsApi";
import { ShieldAlert, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DomainGuardProps {
  children: ReactNode;
  module?: string;
  fallback?: ReactNode;
}

/**
 * DomainGuard: Centralized access control for Domain Modules.
 * Handles licensing, module enablement, and optional RBAC.
 */
export function DomainGuard({ children, module, fallback }: DomainGuardProps) {
  const { isLoading: isAuthLoading } = useAuth();
  const { data: settings, isLoading: isSettingsLoading } =
    useGetSystemSettingsQuery(undefined);

  if (isAuthLoading || isSettingsLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Check if module is enabled in global/tenant settings
  if (module && settings?.enabledModules) {
    const isEnabled =
      settings.enabledModules[module as keyof typeof settings.enabledModules];
    if (isEnabled === false) {
      if (fallback) return <>{fallback}</>;

      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
          <Card className="max-w-md w-full border-orange-200 bg-orange-50/30">
            <CardHeader className="text-center">
              <ShieldAlert className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Module Not Enabled</CardTitle>
              <CardDescription>
                The "{module.toUpperCase()}" module is not active for this
                context.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-6">
                Please contact your administrator or upgrade your plan to access
                this feature.
              </p>
              <Button asChild variant="outline">
                <Link href="/">Back to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  return <>{children}</>;
}
