import type { Request, Response, NextFunction } from "express";
import status from "http-status";
import { AppError } from "@manoxen/core-util";
import mongoose from "mongoose";


export const resourceOwnerGuard = (model: mongoose.Model<any>, contextField: string = 'businessUnit') => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        const user = (req as any).user;
        const resourceId = (req.params['id'] || req.params['outletId'] || req.params['businessUnitId']) as string;

        if (!user) {
            return next(new AppError(status.UNAUTHORIZED, "Authentication required"));
        }

        // 🛡️ Super Admins bypass all ownership checks
        if (user.roleName?.includes('super-admin') || user.isSuperAdmin) {
            return next();
        }

        if (!resourceId || !mongoose.Types.ObjectId.isValid(resourceId)) {
            return next(); // Proceed to controller which might handle 404
        }

        try {
            // Find the resource and its context field
            const resource = await model.findById(resourceId).select(contextField).lean();

            if (!resource) {
                return next(); // Let controller handle 404
            }

            const resourceContext = (resource as any)[contextField]?.toString();

            if (!resourceContext) {
                // If the resource doesn't have a context (Global record?), allow but log warning
                return next();
            }

            // --- VALIDATE AGAINST USER CONTEXT ---
            let hasAccess = false;

            if (contextField === 'businessUnit' || contextField === 'businessUnitId') {
                const allowedBUs = user.businessUnits || [];
                hasAccess = allowedBUs.some((bu: any) => (bu._id?.toString() || bu.toString()) === resourceContext);
            }
            else if (contextField === 'organization' || contextField === 'organizationId') {
                const allowedOrganizations = user.organizations || [];
                hasAccess = allowedOrganizations.some((c: any) => (c._id?.toString() || c.toString()) === resourceContext);
            }
            else if (contextField === 'outlet' || contextField === 'outletId') {
                const allowedOutlets = user.outlets || [];
                hasAccess = allowedOutlets.some((o: any) => (o._id?.toString() || o.toString()) === resourceContext);
            }

            if (!hasAccess) {
                return next(new AppError(status.FORBIDDEN, `Ownership Security Error: You do not own this resource.`));
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

export default resourceOwnerGuard;
