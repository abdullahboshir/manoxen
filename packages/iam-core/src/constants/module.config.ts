/**
 * Module Configuration
 * -------------------
 * Central configuration for hybrid multi-tenancy module system.
 * Maps licensed modules to DDD contexts and provides runtime control.
 */

import { PermissionLicensedModuleUnion, PermissionLicensedModule } from './permission.resource';

/**
 * Tenant Types
 */
export type TenantType = 'shared' | 'dedicated';

/**
 * DDD Context Names (as they appear in the contexts/ folder)
 */
export const DDD_CONTEXTS = [
    // Core (always enabled)
    'identity',
    'organization',
    'system',
    'governance',
    
    // Commerce
    'catalog',
    'sales',
    'pricing',
    'pos',
    'storefront',
    
    // CRM
    'contacts',
    'crm',
    'marketing',
    
    // ERP Suite
    'accounting',
    'supply',
    'ops',
    'analytics',
    
    // Other
    'hrm',
    'logistics',
    'integration',
    'automation',
    'contracts',
    'legal',
    'corporate',
    'shared',
] as const;

export type DDDContext = (typeof DDD_CONTEXTS)[number];

/**
 * Core contexts that are ALWAYS enabled regardless of license
 * These are mandatory for the system to function
 */
export const CORE_CONTEXTS: DDDContext[] = [
    'identity',
    'organization',
    'system',
    'governance',
    'shared',
];

/**
 * Maps licensed modules to their required DDD contexts
 * When a module is licensed, these contexts become accessible
 */
export const MODULE_TO_CONTEXT_MAPPING: Record<PermissionLicensedModuleUnion, DDDContext[]> = {
    commerce: ['catalog', 'sales', 'pricing', 'pos', 'storefront', 'contacts'],
    pos: ['pos', 'catalog', 'pricing', 'contacts'],
    erp: ['accounting', 'supply', 'ops', 'analytics'],
    hrm: ['hrm'],
    crm: ['crm', 'contacts', 'marketing'],
    logistics: ['logistics'],
    integrations: ['integration'],
    accounting: ['accounting'],
    reports: ['analytics'],
    api_access: ['integration'],
};

/**
 * Reverse mapping: Context → Required Module
 * Used to check if a context is accessible based on license
 */
export const CONTEXT_TO_MODULE_MAPPING: Record<DDDContext, PermissionLicensedModuleUnion[]> = Object.entries(
    MODULE_TO_CONTEXT_MAPPING
).reduce((acc, [module, contexts]) => {
    contexts.forEach((context) => {
        if (!acc[context]) {
            acc[context] = [];
        }
        acc[context].push(module as PermissionLicensedModuleUnion);
    });
    return acc;
}, {} as Record<DDDContext, PermissionLicensedModuleUnion[]>);

/**
 * Environment-based module enablement
 * For dedicated tenants, only enabled modules are loaded
 */
export const getEnabledModules = (): PermissionLicensedModuleUnion[] => {
    const envModules = process.env.ENABLED_MODULES;
    
    // If not set, enable all modules (shared tenant mode)
    if (!envModules) {
        return [...PermissionLicensedModule];
    }
    
    return envModules
        .split(',')
        .map((m) => m.trim() as PermissionLicensedModuleUnion)
        .filter((m) => PermissionLicensedModule.includes(m));
};

/**
 * Check if a specific module is enabled in the current deployment
 */
export const isModuleEnabled = (module: PermissionLicensedModuleUnion): boolean => {
    return getEnabledModules().includes(module);
};

/**
 * Check if a specific context is enabled based on enabled modules
 */
export const isContextEnabled = (context: DDDContext): boolean => {
    // Core contexts are always enabled
    if (CORE_CONTEXTS.includes(context)) {
        return true;
    }
    
    const requiredModules = CONTEXT_TO_MODULE_MAPPING[context] || [];
    const enabledModules = getEnabledModules();
    
    // Context is enabled if ANY of its required modules is enabled
    return requiredModules.some((module) => enabledModules.includes(module));
};

/**
 * Get all enabled contexts based on current module configuration
 */
export const getEnabledContexts = (): DDDContext[] => {
    const enabledModules = getEnabledModules();
    const enabledContexts = new Set<DDDContext>(CORE_CONTEXTS);
    
    enabledModules.forEach((module) => {
        const contexts = MODULE_TO_CONTEXT_MAPPING[module] || [];
        contexts.forEach((ctx) => enabledContexts.add(ctx));
    });
    
    return Array.from(enabledContexts);
};

/**
 * Get the tenant type from environment
 */
export const getTenantType = (): TenantType => {
    return (process.env.TENANT_TYPE as TenantType) || 'shared';
};

/**
 * Check if running in dedicated tenant mode
 */
export const isDedicatedTenant = (): boolean => {
    return getTenantType() === 'dedicated';
};

/**
 * Startup log for module configuration
 */
export const logModuleConfiguration = (): void => {
    const tenantType = getTenantType();
    const enabledModules = getEnabledModules();
    const enabledContexts = getEnabledContexts();
    
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║             MODULE CONFIGURATION                             ║');
    console.log('╠══════════════════════════════════════════════════════════════╣');
    console.log(`║ Tenant Type:      ${tenantType.padEnd(43)}║`);
    console.log(`║ Enabled Modules:  ${enabledModules.join(', ').padEnd(43)}║`);
    console.log(`║ Enabled Contexts: ${enabledContexts.join(', ').substring(0, 43).padEnd(43)}║`);
    console.log('╚══════════════════════════════════════════════════════════════╝');
};
