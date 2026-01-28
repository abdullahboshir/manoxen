"use client";

import { UserManagementTable } from "./UserManagementTable";

export function PlatformUsers() {
  return (
    <div className="space-y-4">
      <UserManagementTable viewScope="platform" />
    </div>
  );
}
