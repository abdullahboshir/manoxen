import type z from "zod";
import {
  PermissionActionTypeSchema,
  PermissionEffectSchema,
  PermissionResolverSchema,
  PermissionScopeSchema,
  ResourceTypeSchema,
  ConditionOperatorSchema,
} from "./../utils/permission.validation";

/* ------------------------------------------------------------------
 * 1ï¸âƒ£ RESOURCE TYPES (UNCHANGED â€“ only ordered logically)
 * ------------------------------------------------------------------ */

import {
  PermissionResourceType,
  PermissionModule,
  PermissionSystemCore,
  PermissionLicensedModule,
  PermissionLicensedModuleUnion,
  PermissionPlatformFeature,
  PermissionActionType,
  PermissionScope,
  PermissionEffect,
  PermissionResolveStrategy,
  PermissionConditionOperator,
  DomainToLicensedModuleMapping,
  LicensedModuleToProductPackageMapping,
  SystemCoreRequirements,
  TerminologyMapping,
} from "./permission.resource";

export {
  PermissionResourceType,
  PermissionModule,
  PermissionSystemCore,
  PermissionLicensedModule,
  type PermissionLicensedModuleUnion,
  PermissionPlatformFeature,
  PermissionActionType,
  PermissionScope,
  PermissionEffect,
  PermissionResolveStrategy,
  PermissionConditionOperator,
  DomainToLicensedModuleMapping,
  LicensedModuleToProductPackageMapping,
  SystemCoreRequirements,
  TerminologyMapping,
};

/* ------------------------------------------------------------------
 * 7ï¸âƒ£ TYPESCRIPT TYPES
 * ------------------------------------------------------------------ */

export type ResourceType = z.infer<typeof ResourceTypeSchema>;
export type ActionType = z.infer<typeof PermissionActionTypeSchema>;
export type PermissionModuleType = (typeof PermissionModule)[number];
export type PermissionScopeType = z.infer<typeof PermissionScopeSchema>;
export type PermissionEffectType = z.infer<typeof PermissionEffectSchema>;
export type ResolveStrategy = z.infer<typeof PermissionResolverSchema>;
export type PermissionConditionOperatorType =
  z.infer<typeof ConditionOperatorSchema>;

/* ------------------------------------------------------------------
 * 8ï¸âƒ£ ENUM OBJECTS (SAFE FOR RUNTIME USE)
 * ------------------------------------------------------------------ */

/* ------------------------------------------------------------------
 * 8ï¸âƒ£ ENUM OBJECTS (SAFE FOR RUNTIME USE)
 * ------------------------------------------------------------------ */

// Re-exported from resource file to prevent circular dependency
export { PermissionSourceObj, PermissionActionObj } from "./permission.resource";

/* ------------------------------------------------------------------
 * 9ï¸âƒ£ ðŸ”’ SCOPE RANK (BACKEND ENFORCEMENT â€“ MUST USE)
 * ------------------------------------------------------------------ */

export const ScopeRank: any = {
  global: 100,
  organization: 95, // Tenant Level
  business: 90,
  vendor: 80,
  branch: 70,
  outlet: 60,
  warehouse: 55,
  department: 50,
  team: 40,
  category: 30,
  region: 20,
  channel: 15,
  segment: 10,
  self: 1,
};



