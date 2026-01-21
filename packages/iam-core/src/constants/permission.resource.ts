/* ------------------------------------------------------------------
 * 1️⃣ RESOURCE TYPES (Source of Truth)
 * ------------------------------------------------------------------ */

export const PermissionResourceType = [
    // Core Commerce
    "product",
    "category",
    "brand",
    "variant",
    "attribute",
    "attributeGroup",
    "unit",
    "tax",
    "warranty",

    // Sales & Orders
    "order",
    "quotation",
    "invoice",
    "return",
    "review",
    "coupon",
    "promotion",
    "abandonedCart",
    "content",
    "media",
    "folder",

    // Customers & Users
    "customer",
    "user",
    "role",
    "permission",
    "auth",
    "wishlist",
    "cart",

    // Inventory & Supply
    "inventory",
    "warehouse",
    "purchase",
    "supplier",
    "vendor",
    "adjustment",
    "transfer",

    // Outlet / POS
    "outlet",
    "storefront",
    "terminal",
    "cashRegister",

    // Finance
    "payment",
    "expense",
    "expenseCategory",

    // System & Platform (New)
    "businessUnit",
    "systemConfig",
    "platformSetting",
    "organizationSetting",
    "businessSetting",
    "outletSetting",
    "tenant",
    "domain",
    "ssl",
    "backup",
    "auditLog",
    "apiKey",
    "webhook",
    "theme",
    "plugin",
    "language",
    "currency",
    "blacklist",
    "feature",
    "integration",
    "budget",
    "account",
    "transaction",
    "settlement",
    "payout",
    "reconciliation",
    "journal",
    "ledger",
    "balanceSheet",


    // Logistics
    "shipping",
    "courier",
    "delivery",
    "parcel",
    "driver",
    "vehicle",
    "track",
    "dispatch",
    "zone",

    // Reports & Analytics
    "report",
    "analyticsReport",
    "salesReport",
    "purchaseReport",
    "stockReport",
    "profitLossReport",
    "dashboard",

    // HRM & Payroll
    "staff",
    "attendance",
    "leave",
    "payroll",
    "department",
    "designation",
    "asset",

    // Marketing & Growth
    "affiliate",
    "adCampaign",
    "loyalty",
    "subscription",
    "audience",
    "pixel",
    "event",
    "landingPage",
    "seo",
    "question",

    // Communication & Support
    "notification",
    "chat",
    "emailTemplate",
    "smsTemplate",
    "ticket",
    "dispute",
    "call",
    "meeting",
    "note",

    // Automation & Risk
    "automation",
    "workflow",
    "fraudDetection",
    "riskRule",
    "riskProfile",

    // Governance & Compliance
    "shareholder",
    "meeting",
    "voting",
    "compliance",
    "license",
    "global",
] as const;

export type PermissionResourceTypeUnion = (typeof PermissionResourceType)[number];

export const PermissionSourceObj = PermissionResourceType.reduce(
    (acc: any, resource) => {
        acc[resource] = resource;
        return acc;
    },
    {} as Record<PermissionResourceTypeUnion, PermissionResourceTypeUnion>
);


/* ------------------------------------------------------------------
 * 1️⃣.5️⃣ SYSTEM CORE (Mandatory in all organizations)
 * ========== DDD: These are System Domains, NOT Licensed Modules ==========
 * ------------------------------------------------------------------ */

export const PermissionSystemCore = [
    "iam",              // Identity & Access Management (mandatory)
    "organization",     // Organization & Governance structure (mandatory)
    "governance",       // Compliance, audit, shareholder governance (mandatory)
] as const;

export type PermissionSystemCoreUnion = (typeof PermissionSystemCore)[number];

/* ------------------------------------------------------------------
 * 2️⃣.5️⃣ LICENSED PRODUCT MODULES (What you sell to customers)
 * ========== Terminology: "Module" for sales/UI, "Domain" for backend code ==========
 * Each maps to a business domain (Bounded Context in DDD)
 * ------------------------------------------------------------------ */

export const PermissionLicensedModule = [
    "commerce",         // Commerce Domain (Catalog + Sales + Pricing + POS combined)
    "pos",              // POS Domain (Standalone or part of Commerce)
    "erp",              // ERP Domain Suite (Finance + Supply + Ops + Analytics)
    "hrm",              // HRM Domain (HR + Payroll + Attendance)
    "crm",              // CRM Domain (Customer Relationship)
    "logistics",        // Logistics Domain (Shipping + Delivery + Tracking)
    "integrations",     // Integration Add-ons (Third-party integrations)
    "accounting",       // Financial Accounting Module
    "reports",          // Advanced Analytics & Reporting Module
    "api_access",       // Developer API & Webhook Access
] as const;

export type PermissionLicensedModuleUnion = (typeof PermissionLicensedModule)[number];

/* ------------------------------------------------------------------
 * 3️⃣.5️⃣ PLATFORM FEATURES (Super-admin & SaaS platform management)
 * ========== Platform-level operations, NOT customer features ==========
 * ------------------------------------------------------------------ */

export const PermissionPlatformFeature = [
    "saas",             // SaaS tenant management, billing, subscription (super-admin only)
    "system",           // System settings, audit logs, backups, webhooks, API keys
] as const;

export type PermissionPlatformFeatureUnion = (typeof PermissionPlatformFeature)[number];

/* ------------------------------------------------------------------
 * 🔗 COMBINED MODULE TYPES (Backward Compatibility)
 * ========== Use this when you need all modules together ==========
 * ------------------------------------------------------------------ */

export const PermissionModule = [
    ...PermissionSystemCore,
    ...PermissionLicensedModule,
    ...PermissionPlatformFeature,
] as const;

export type PermissionModuleUnion = (typeof PermissionModule)[number];

/* ------------------------------------------------------------------
 * 2️⃣ ACTION TYPES
 * ------------------------------------------------------------------ */

export const PermissionActionType = [
    "create",
    "read",
    "update",
    "delete",
    "approve",
    "reject",
    "manage",
    "view",
    "assign",
    "publish",
    "unpublish",
    "cancel",
    "verify",
    "export",
    "import",
    "download",
    "print",
    "ship",
    "dispatch",
    "deliver",
    "refund",
    "track",
    "sync",
    "schedule",
    "reply",
    "block",
    "restrict",
    "adjust",
    "escalate",
] as const;

export type PermissionActionTypeUnion = (typeof PermissionActionType)[number];

export const PermissionActionObj = PermissionActionType.reduce(
    (acc: any, action) => {
        acc[action] = action;
        return acc;
    },
    {} as Record<PermissionActionTypeUnion, PermissionActionTypeUnion>
);

/* ------------------------------------------------------------------
 * 3️⃣ SCOPES
 * ------------------------------------------------------------------ */

export const PermissionScope = [
    "global",
    "organization",
    "business",
    "vendor",
    "outlet",
    "branch",
    "warehouse",
    "department",
    "team",
    "category",
    "region",
    "channel",
    "segment",
    "self",
    "ip",
    "device",
] as const;

export const PermissionEffect = ["allow", "deny"] as const;

export const PermissionResolveStrategy = [
    "first-match",
    "most-specific",
    "priority-based",
    "cumulative",
] as const;

export const PermissionConditionOperator = [
    "eq",
    "neq",
    "gt",
    "gte",
    "lt",
    "lte",
    "in",
    "not-in",
    "contains",
    "starts-with",
    "ends-with",
    "between",
    "regex",
    "like",
] as const;



/**
 * 🔒 SENSITIVE ACTIONS (Require extra audit or high-level roles)
 * Conceptually grouped for backend guards and risk assessment.
 */
export const SensitiveActions = [
    "approve",
    "reject",
    "refund",
    "block",
    "restrict",
    "escalate",
    "delete", // Usually sensitive in ERP
] as const;

/* ------------------------------------------------------------------
 * 📌 MAPPINGS (For internal reference & validation)
 * ========== Connect terminology across layers ==========
 * ------------------------------------------------------------------ */

/**
 * Domain to Module Mapping
 * Maps backend DDD Domains to commercial module names
 * Used for: license validation, permission checks, audit logs
 */
export const DomainToLicensedModuleMapping: Record<PermissionLicensedModuleUnion, string> = {
    "commerce": "Commerce Domain (Catalog + Sales + Pricing + POS)",
    "pos": "POS Domain (Point of Sale)",
    "erp": "ERP Domain Suite (Finance + Supply + Ops + Analytics)",
    "hrm": "HRM Domain (HR + Payroll + Attendance + Leave)",
    "crm": "CRM Domain (Customer Relationship Management)",
    "logistics": "Logistics Domain (Shipping + Delivery + Tracking)",
    "integrations": "Integration Add-ons (Third-party)",
    "accounting": "Financial Accounting Module",
    "reports": "Advanced Analytics & Reporting Module",
    "api_access": "Developer API & Webhook Access",
} as const;

/**
 * Licensed Module to Product Package Mapping
 * Maps which modules are included in which sellable packages
 * Used for: license engine, billing, subscription management
 */
export const LicensedModuleToProductPackageMapping: Record<PermissionLicensedModuleUnion, string[]> = {
    "commerce": ["commerce-platform", "trial"],
    "pos": ["commerce-platform", "pos-standalone", "enterprise"],
    "erp": ["erp-suite", "enterprise"],
    "hrm": ["hrm-standalone", "enterprise"],
    "crm": ["crm-standalone", "enterprise", "trial", "lifetime"],
    "logistics": ["logistics-addon", "enterprise", "trial", "lifetime"],
    "integrations": ["integration-addon", "enterprise", "trial", "lifetime"],
    "accounting": ["erp-suite", "enterprise", "standard", "trial", "lifetime"],
    "reports": ["erp-suite", "enterprise", "standard", "trial", "lifetime"],
    "api_access": ["erp-suite", "enterprise", "trial", "lifetime"],
} as const;

/**
 * System Core Requirements
 * Specifies mandatory system modules that MUST be available
 * for any licensed module to function
 */
export const SystemCoreRequirements: Record<PermissionLicensedModuleUnion, PermissionSystemCoreUnion[]> = {
    "commerce": ["iam", "organization", "governance"],  // Needs org structure
    "pos": ["iam", "organization", "governance"],        // Needs org structure
    "erp": ["iam", "organization", "governance"],        // Needs org structure & governance
    "hrm": ["iam", "organization", "governance"],        // Needs org structure
    "crm": ["iam", "organization", "governance"],        // Needs org structure
    "logistics": ["iam", "organization", "governance"],  // Needs org structure
    "integrations": ["iam"],                             // Minimal: just auth
    "accounting": ["iam", "organization"],
    "reports": ["iam", "organization"],
    "api_access": ["iam", "organization"],
} as const;

/* ------------------------------------------------------------------
 * 🔄 TERMINOLOGY MAPPING (For Migration Planning)
 * ========== TECHNICAL DEBT: "commerce" vs "commerce" inconsistency ==========
 * 
 * CURRENT STATE (as of 2026-01-18):
 * - Backend (permission layer): Uses "commerce"
 * - Frontend (UI constants): Uses "commerce"
 * - Product types: Uses "commerce"
 * - Package seeder: Uses "commerce" in moduleAccess
 * 
 * FUTURE REFACTOR TODO:
 * 1. Update all frontend constants from "commerce" → "commerce"
 * 2. Update package.seeder.ts moduleAccess from "commerce" → "commerce"
 * 3. Update product types (shared-types/src/product.types.ts)
 * 4. Update catalog domain availableModules enums
 * 5. Update database records (existing packages, products)
 * 
 * MIGRATION STRATEGY:
 * - Add backward compatibility layer in license engine
 * - Support both "commerce" and "commerce" during transition
 * - Deprecate "commerce" after 2 releases
 * 
 * Files to update in future sprint:
 * - /apps/frontend/src/constant/*.ts (product.constant.ts, package.constant.ts, etc)
 * - /apps/backend/src/core/database/mongoose/seeders/package.seeder.ts
 * - /packages/shared-types/src/product.types.ts
 * - /domains/commerce/catalog/src/**/

export const TerminologyMapping = {
    current: {
        permissionLayer: "commerce",  // ✅ Standardized
        frontendUI: "commerce",       // ✅ Standardized
        productTypes: "commerce",     // ✅ Standardized
        packageSeeder: "commerce",    // ✅ Standardized
        accountingModule: "accounting", // ✅ Standardized (replacing finance)
        reportingModule: "reports",   // ✅ Standardized (replacing marketing)
    },
    legacy: {
        keys: ["commerce", "finance", "marketing"], // 🔄 Supported for backward compatibility lookup
    },
    recommendation: "Always use 'commerce' for any logic relating to online stores, storefronts, or digital sales. Use 'accounting' for financial logic and 'reports' for analytics."
} as const;
