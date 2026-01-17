"use client";
import { UserManagementTable } from "@/features/iam/components/UserManagementTable";

export default function BusinessUsersPage() {
    return <UserManagementTable viewScope="business" />;
}
