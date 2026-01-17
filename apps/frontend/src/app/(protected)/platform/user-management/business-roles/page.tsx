"use client";
import { RolePermissionManagement } from "@/features/iam/components/RolePermissionManagement";

export default function BusinessRolesPage() {
    return <RolePermissionManagement viewScope="business" />;
}
