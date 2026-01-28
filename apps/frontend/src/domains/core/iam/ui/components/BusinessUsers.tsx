"use client";

import { UserManagementTable } from "./UserManagementTable";

export function BusinessUsers() {
  return (
    <div className="space-y-4">
      <UserManagementTable viewScope="business" />
    </div>
  );
}
