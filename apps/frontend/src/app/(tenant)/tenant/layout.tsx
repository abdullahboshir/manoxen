"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@manoxen/auth-client";
import { CenteredLoading } from "@/components/shared/CenteredLoading";

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) return <CenteredLoading fullScreen />;
  if (!user) return null;

  return (
    <div className="tenant-shell">
       {/* Tenant Sidebar would go here */}
      <header className="bg-white border-b p-4 flex justify-between">
        <h1 className="font-bold text-gray-800">My Organization Workspace</h1>
        <div className="text-sm text-gray-500">
           {user.businessUnits?.length || 0} Business Units
        </div>
      </header>
      <main className="p-6 bg-slate-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
