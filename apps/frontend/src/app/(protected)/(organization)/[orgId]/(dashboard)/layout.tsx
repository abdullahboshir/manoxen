"use client";

import { AppLayout } from "@/components/layouts/AppLayout";
import React from "react";

interface OrganizationDashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Organization Dashboard Layout
 * Wraps organization-level overview pages with the standard AppLayout (Sidebar + Header)
 */
export default function OrganizationDashboardLayout({
  children,
}: OrganizationDashboardLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
