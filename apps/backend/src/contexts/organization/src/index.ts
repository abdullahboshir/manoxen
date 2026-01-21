export { manifest as domainManifest } from "./domain-manifest";
export * from "./domain";
export type { ITenantConfig } from "@manoxen/shared-types";
export { Organization, type IOrganizationDocument } from "./infrastructure/persistence/mongoose/organization.model";
export { BusinessUnit, type IBusinessUnitCoreDocument } from "./infrastructure/persistence/mongoose/business-unit.model";
export type { IBusinessUnitCore } from "./domain/entities/business-unit.entity";
export { BusinessUnitSettings } from "./infrastructure/persistence/mongoose/business-unit-settings.model";
export { BusinessUnitFinance } from "./infrastructure/persistence/mongoose/finance.model";
export { BusinessUnitAnalytics, BusinessUnitAnalyticsSummary } from "./infrastructure/persistence/mongoose/analytics.model";
export { Outlet } from "./outlet/outlet.model";
export { type IOutlet } from "./outlet/outlet.interface";
export { OrganizationRoutes } from "./interface/http/routes/organization.routes";
export { businessUnitRoutes } from "./interface/http/routes/business-unit.routes";
export { PackageRoutes } from "./interface/http/routes/package.routes";
export { LicenseRoutes } from "./interface/http/routes/license.routes";
export { OutletRoutes } from "./interface/http/routes/outlet.routes";

// Package & License
export { Package } from "./package/package.model";
export type { IPackage, IModuleConfig } from "./package/package.interface";

import { Router } from "express";
const stub = Router();
export { stub as OrganizationSettingsRoutes, stub as BusinessUnitSettingsRoutes };



// Merchant
export * from "./merchant/merchant.interface";
export * from "./merchant/merchant.model";

// Staff
export * from "./staff/staff.interface";
export { type IStaff } from "./staff/staff.interface";
export * from "./staff/staff.model";

// Shared (Includes common interfaces, defaults, and schemas)
export * from "./shared";

// Explicitly export DEFAULT constants to ensure they are available in public API
import {
    DEFAULT_BRANDING, DEFAULT_SECURITY_HARDENING, DEFAULT_COMPLIANCE,
    DEFAULT_INTERNATIONALIZATION, DEFAULT_MAINTENANCE_POLICY, DEFAULT_LEGAL_GOVERNANCE,
    DEFAULT_COMMERCIAL_SAAS, DEFAULT_SSO_HUB, DEFAULT_WEBHOOK_ORCHESTRATOR,
    DEFAULT_API_DEVELOPER_REGISTRY, DEFAULT_RESOURCE_QUOTA, DEFAULT_MODULE_MAP,
    DEFAULT_SMTP_CONFIG, DEFAULT_BACKUP_REGISTRY, DEFAULT_OBSERVABILITY,
    DEFAULT_STORAGE_REGISTRY, DEFAULT_GATEWAY_GOVERNANCE
} from "./shared/common.defaults";

export {
    DEFAULT_BRANDING, DEFAULT_SECURITY_HARDENING, DEFAULT_COMPLIANCE,
    DEFAULT_INTERNATIONALIZATION, DEFAULT_MAINTENANCE_POLICY, DEFAULT_LEGAL_GOVERNANCE,
    DEFAULT_COMMERCIAL_SAAS, DEFAULT_SSO_HUB, DEFAULT_WEBHOOK_ORCHESTRATOR,
    DEFAULT_API_DEVELOPER_REGISTRY, DEFAULT_RESOURCE_QUOTA, DEFAULT_MODULE_MAP,
    DEFAULT_SMTP_CONFIG, DEFAULT_BACKUP_REGISTRY, DEFAULT_OBSERVABILITY,
    DEFAULT_STORAGE_REGISTRY, DEFAULT_GATEWAY_GOVERNANCE
};

// Settings
export * from "./settings/settings.interface";
export { OrganizationSettings } from "./settings/settings.model";
export { PlatformSettings } from "./infrastructure/persistence/mongoose/platform-settings.model";

// Services
export * from "./application";
export { ModuleRegistryService } from "./application/services/module-registry.service";
export { AutomationRule, type IAutomationRule } from "./infrastructure/persistence/mongoose/automation-rule.model";

// Seeders
export * from "./infrastructure/seeders";
export { seedPackages } from "./infrastructure/package.seeder";

