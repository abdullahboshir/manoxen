import type { Action, Resource, UserContext, PolicyContext, PolicyResult } from "./types";

/**
 * The specific constraint engine.
 * Determines if a user's context allows them to act on a target's context.
 */
function checkContextConstraints(user: UserContext, context: PolicyContext): boolean {
  // 1. Super Admin bypass
  if (user.isSuperAdmin) return true;

  // 2. Organization Scope Match
  if (context.organizationId && user.organizationId !== context.organizationId) {
    return false;
  }

  // 3. Business Unit Scope Match
  // If the resource belongs to a BU, the user must be "in" that BU context
  if (context.businessUnitId && user.businessUnitId !== context.businessUnitId) {
    return false;
  }

  return true;
}

/**
 * The Unified Policy Resolver
 * @param user The actor trying to perform the action
 * @param action The verb (create, read, etc.)
 * @param resource The noun (product, order, etc.)
 * @param context The specific context of the target resource (e.g. which BU does this product belong to?)
 */
export function can(
  user: UserContext,
  action: Action,
  resource: Resource,
  context?: PolicyContext
): boolean {
  // 1. Structural Validation
  if (!user || !action || !resource) return false;

  // 2. Super Admin God-Mode
  if (user.isSuperAdmin) return true;

  // 3. Permission Check (RBAC)
  // Construct the permission string, e.g., "product:create"
  const requiredPermission = `${resource}:${action}`;
  // Also check for wildcard "product:manage" or "product:*"
  const hasDirectPermission = user.permissions.includes(requiredPermission);
  const hasWildcardPermission = user.permissions.includes(`${resource}:manage`) || user.permissions.includes(`${resource}:*`);
  
  if (!hasDirectPermission && !hasWildcardPermission) {
    return false; 
  }

  // 4. Context/Policy Check (ABAC/ReBAC)
  if (context) {
    const contextAllowed = checkContextConstraints(user, context);
    if (!contextAllowed) return false;
  }

  return true;
}

// Helper for "Explain Why" (Debug/Audit)
export function explain(
  user: UserContext,
  action: Action,
  resource: Resource,
  context?: PolicyContext
): PolicyResult {
  if (can(user, action, resource, context)) {
    return { allowed: true };
  }
  return { allowed: false, reason: 'Insufficient permissions or context mismatch' };
}




