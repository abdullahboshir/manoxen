import { UserBusinessAccess } from "../../infrastructure/persistence/mongoose/user-business-access.model";
import { User } from "../../infrastructure/persistence/mongoose/user.model";
import { AppError } from "@manoxen/core-util";
import status from "http-status";
import type { IUserBusinessAccess } from "../../infrastructure/persistence/mongoose/user-business-access.interface";

/**
 * IAMManagementService
 * Manages Granular RBAC and Scoped Access assignments.
 */
const assignScopedAccess = async (payload: Partial<IUserBusinessAccess>, adminUser: any) => {
    // 1. Verify User Exists
    const user = await User.findById(payload.user);
    if (!user) throw new AppError(status.NOT_FOUND, "User not found");

    // 2. Create Access Entry
    const access = await UserBusinessAccess.create({
        ...payload,
        assignedBy: adminUser.userId || adminUser._id
    });

    return access;
};

const revokeScopedAccess = async (accessId: string) => {
    const result = await UserBusinessAccess.findByIdAndDelete(accessId);
    if (!result) throw new AppError(status.NOT_FOUND, "Access entry not found");
    return result;
};

const getUserAccessList = async (userId: string) => {
    return await UserBusinessAccess.find({ user: userId })
        .populate('role')
        .populate('organization', 'name')
        .populate('businessUnit', 'name')
        .populate('outlet', 'name');
};

const updateAccessStatus = async (accessId: string, statusText: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED') => {
    const access = await UserBusinessAccess.findByIdAndUpdate(accessId, { status: statusText }, { new: true });
    if (!access) throw new AppError(status.NOT_FOUND, "Access entry not found");
    return access;
};

export const IAMManagementService = {
    assignScopedAccess,
    revokeScopedAccess,
    getUserAccessList,
    updateAccessStatus
};
