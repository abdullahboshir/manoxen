
import { useAuth } from "./useAuth";
import { useCurrentRole } from "./useCurrentRole";
import { useMemo } from "react";
import { isOrganizationOwner } from "@manoxen/iam-core/src/utils/role.helper";
import { USER_ROLE } from "@manoxen/iam-core/src/constants/user.constant";

export function usePermission() {
  const { user } = useAuth();
  const { currentRole } = useCurrentRole();

  const permissions = useMemo(() => {
    return user?.effectivePermissions || [];
  }, [user]);


  const can = (resource: string, action?: string): boolean => {
    if (user?.isSuperAdmin) return true;

    let res = resource;
    let act = action;

    if (!act && res.includes(':')) {
        const parts = res.split(':');
        res = parts[0];
        act = parts[1];
    }

    if (!act) return false; // Action is required

    // @ts-ignore
    const isOwnerRole = isOrganizationOwner(currentRole) || currentRole === USER_ROLE.ORGANIZATION_OWNER || currentRole === 'owner';
    const hasOwnerScope = (user?.businessAccess || []).some((acc: any) => acc.scope === 'ORGANIZATION');
        
    if (isOwnerRole || hasOwnerScope) return true;

    if (!permissions.length) return false;

    if (typeof permissions[0] === 'string') {
      const key = `${res}:${act}`;
      return permissions.includes(key);
    }

    // Handle Object Format (Legacy/Fallback)
    const matching = permissions.filter((p: any) => 
      p.resource === res && 
      p.action === act && 
      p.isActive
    );

    if (!matching.length) return false;

    // Sort by priority (descending)
    matching.sort((a: any, b: any) => (b.resolver?.priority ?? 0) - (a.resolver?.priority ?? 0));
    
    const maxPriority = matching[0].resolver?.priority ?? 0;
    const topPerms = matching.filter((p: any) => (p.resolver?.priority ?? 0) === maxPriority);

    // Explicit Deny in top priority wins
    if (topPerms.some((p: any) => p.effect === 'deny')) return false;

    // Explicit Allow wins
    if (topPerms.some((p: any) => p.effect === 'allow')) return true;

    return false;
  };

  const getLimit = (resource: 'products' | 'orders' | 'customers'): number => {
    if (user?.isSuperAdmin) return 0;
    return user?.maxDataAccess?.[resource] ?? -1;
  };

  return { can, getLimit, permissions };
}



