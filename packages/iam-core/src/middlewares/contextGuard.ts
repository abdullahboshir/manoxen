
import { AppError } from "@manoxen/core-util";
import type { Request, Response, NextFunction } from "express";
import status from "http-status";

import mongoose from "mongoose";

export const contextGuard = () => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const user = (req as any).user;

        if (!user) {
            return next(new AppError(status.UNAUTHORIZED, "Authentication required for context validation"));
        }

        // ðŸ›¡ï¸ Super Admins & Organization Owners bypass all context checks (Global access within their scope)
        if (user.roleName?.includes('super-admin') || user.isSuperAdmin || user.roleName?.includes('organization-owner')) {
            return next();
        }

        // --- 1. COLLECT CONTEXTS FROM REQUEST ---
        // Context is already resolved by the global contextMiddleware
        const { businessUnitId: businessUnitContext, outletId: outletContext } = (req as any).context || {};

        // --- 2. VALIDATE BUSINESS UNIT ACCESS ---
        if (businessUnitContext) {
            const allowedBUs = user.businessUnits || [];
            const isObjectId = mongoose.Types.ObjectId.isValid(businessUnitContext);
            const contextStr = businessUnitContext.toString();

            const hasAccess = allowedBUs.some((bu: any) => {
                const buId = bu._id?.toString() || bu.id?.toString() || bu.toString();
                const buSlug = bu.slug;

                if (isObjectId) {
                    return buId === contextStr;
                } else {
                    return buSlug === contextStr;
                }
            });

            if (!hasAccess) {
                return next(new AppError(status.FORBIDDEN, `Context Security Error: You do not have access to Business Unit [${contextStr}]`));
            }
        }

        // --- 3. VALIDATE OUTLET ACCESS ---
        if (outletContext) {
            const allowedOutlets = user.outlets || [];
            const contextStr = outletContext.toString();

            const hasAccess = allowedOutlets.some((o: any) => {
                const oId = o._id?.toString() || o.id?.toString() || o.toString();
                return oId === contextStr;
            });

            if (!hasAccess) {
                return next(new AppError(status.FORBIDDEN, `Context Security Error: You do not have access to Outlet [${contextStr}]`));
            }
        }

        next();
    };
};

export default contextGuard;



