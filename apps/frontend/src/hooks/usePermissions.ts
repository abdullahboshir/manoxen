import { useAuth, usePermission } from "@manoxen/auth-client";

export function usePermissions() {
  const { user } = useAuth();
  const { can } = usePermission();

  const hasPermission = (permissionKey: any) => {
    return can(permissionKey);
  };

  return { 
    hasPermission,
    isSuperAdmin: user?.isSuperAdmin || false 
  };
}
