/**
 * Module License Guard Middleware
 * --------------------------------
 * Runtime access control for licensed modules.
 * Checks if the requesting user's business unit has the required module licensed.
 */

import type { Request, Response, NextFunction } from 'express';
import { PermissionLicensedModule } from '@manoxen/iam-core';
import { AppError } from '@manoxen/core-util';
import status from 'http-status';

/** Licensed module type */
export type LicensedModule = (typeof PermissionLicensedModule)[number];

/**
 * Check if a module is licensed for the user's business unit
 */
const isModuleLicensed = (user: any, module: LicensedModule): boolean => {
    if (!user?.businessUnit?.licensedModules) {
        return false;
    }
    return user.businessUnit.licensedModules.includes(module);
};

/**
 * Log license violation for audit
 */
const logLicenseViolation = (
    userId: string,
    businessUnitId: string,
    requestedModule: LicensedModule,
    route: string
): void => {
    console.warn(`[LICENSE VIOLATION] User ${userId} from BU ${businessUnitId} attempted to access unlicensed module '${requestedModule}' at ${route}`);
    // TODO: Integrate with AuditLog service for persistent logging
};

/**
 * Middleware: Require a specific module to be licensed
 * Usage: router.use('/pos', requireModule('pos'), posRoutes);
 */
export const requireModule = (module: LicensedModule) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        
        // Skip check for super-admins
        if (user?.isSuperAdmin || user?.roleName?.includes('super-admin')) {
            return next();
        }
        
        if (!isModuleLicensed(user, module)) {
            const userId = user?._id || 'unknown';
            const buId = user?.businessUnit?._id || 'unknown';
            
            logLicenseViolation(userId, buId, module, req.originalUrl);
            
            throw new AppError(
                status.FORBIDDEN,
                `Module '${module}' is not licensed for your organization. Please upgrade your plan.`
            );
        }
        
        next();
    };
};

/**
 * Middleware: Require ANY of the specified modules to be licensed
 * Usage: router.use('/analytics', requireAnyModule(['erp', 'reports']), analyticsRoutes);
 */
export const requireAnyModule = (modules: LicensedModule[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        
        // Skip check for super-admins
        if (user?.isSuperAdmin || user?.roleName?.includes('super-admin')) {
            return next();
        }
        
        const hasAnyModule = modules.some((module) => isModuleLicensed(user, module));
        
        if (!hasAnyModule) {
            const userId = user?._id || 'unknown';
            const buId = user?.businessUnit?._id || 'unknown';
            
            console.warn(`[LICENSE VIOLATION] User ${userId} from BU ${buId} attempted to access route requiring any of [${modules.join(', ')}] at ${req.originalUrl}`);
            
            throw new AppError(
                status.FORBIDDEN,
                `This feature requires one of the following modules: ${modules.join(', ')}. Please upgrade your plan.`
            );
        }
        
        next();
    };
};

/**
 * Middleware: Require ALL specified modules to be licensed
 * Usage: router.use('/advanced-reports', requireAllModules(['erp', 'reports']), advancedRoutes);
 */
export const requireAllModules = (modules: LicensedModule[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        
        // Skip check for super-admins
        if (user?.isSuperAdmin || user?.roleName?.includes('super-admin')) {
            return next();
        }
        
        const missingModules = modules.filter((module) => !isModuleLicensed(user, module));
        
        if (missingModules.length > 0) {
            const userId = user?._id || 'unknown';
            const buId = user?.businessUnit?._id || 'unknown';
            
            console.warn(`[LICENSE VIOLATION] User ${userId} from BU ${buId} missing modules [${missingModules.join(', ')}] at ${req.originalUrl}`);
            
            throw new AppError(
                status.FORBIDDEN,
                `This feature requires all of the following modules: ${modules.join(', ')}. Missing: ${missingModules.join(', ')}`
            );
        }
        
        next();
    };
};

/**
 * Get licensed modules from request user
 * Utility for conditional logic in controllers
 */
export const getLicensedModules = (req: Request): LicensedModule[] => {
    return (req as any).user?.businessUnit?.licensedModules || [];
};

/**
 * Check if user has module licensed
 * Utility for conditional logic in controllers
 */
export const hasModuleLicensed = (req: Request, module: LicensedModule): boolean => {
    return isModuleLicensed((req as any).user, module);
};
