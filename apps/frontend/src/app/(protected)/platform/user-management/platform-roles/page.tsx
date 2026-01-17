'use client';

import { RolePermissionManagement } from '@/features/iam/components/RolePermissionManagement';

export default function PlatformRolesPage() {
    return (
        <RolePermissionManagement viewScope="platform" />
    );
}
