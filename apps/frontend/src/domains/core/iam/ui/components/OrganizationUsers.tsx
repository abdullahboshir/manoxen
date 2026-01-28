"use client";

import { UserManagementTable } from "./UserManagementTable";

export function OrganizationUsers() {
  return (
    <div className="space-y-4">
      <UserManagementTable viewScope="organization" />
    </div>
  );
}
