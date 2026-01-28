import { AppLayout } from "@/components/layouts/AppLayout";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    "business-unit": string;
  }>;
}

import { RoleGuard } from "@/components/auth/RoleGuard";

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return <RoleGuard>{children}</RoleGuard>;
}
