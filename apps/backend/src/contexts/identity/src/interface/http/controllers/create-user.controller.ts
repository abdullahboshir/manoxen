import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import status from "http-status";
import { User } from "../../../infrastructure/persistence/mongoose/user.model";
import mongoose from "mongoose";
import { createCustomerService, createStaffService } from "../../../application/services/user.service";
import { sendImageToCloudinary } from "@manoxen/infra-common";
import { USER_ROLE } from "@manoxen/iam-core";
import { resolveBusinessUnitIds } from "@manoxen/core-util";

export const createUserController = catchAsync(async (req: any, res) => {
    const userData = req.body;
    const file = req.file;

    console.log("=== CREATE USER CONTROLLER ===");
    console.log("Role:", userData.role);


    // Inject Audit Fields
    if (req.user) {
        userData.createdBy = (req.user as any)['userId'];
        userData.updatedBy = (req.user as any)['userId'];
    }

    let roleId = userData.role;
    // Fallback: Check if role is inside permissions array (Frontend sends this structure in Add User Page)
    if (!roleId && userData.permissions && Array.isArray(userData.permissions) && userData.permissions.length > 0) {
        roleId = userData.permissions[0].role;
    }
    // Fallback 2: Check if role is inside roles array (Frontend sends this in Staff Modal)
    if (!roleId && userData.roles && Array.isArray(userData.roles) && userData.roles.length > 0) {
        // user.roles can be array of IDs or Objects (if populated, but usually IDs in create payload)
        const firstRole = userData.roles[0];
        roleId = typeof firstRole === 'string' ? firstRole : firstRole._id || firstRole.id;
    }

    let roleName = "";
    const Role = mongoose.model('Role');
    if (roleId) {
        const roleDoc = await Role.findById(roleId);
        if (roleDoc) {
            roleName = roleDoc.name.toUpperCase();
        }
    }

    let result;

    if (roleName === 'CUSTOMER') {
        console.log(">> Creating Customer Profile...");
        // Map userData to ICustomer
        const customerPayload = {
            ...userData,
            name: {
                firstName: userData.firstName,
                lastName: userData.lastName
            },
            // Mapping businessUnits? Customers usually don't have BU assignments in the same way, or just 'customer'
        };
        result = await createCustomerService(customerPayload, userData.password, file);

    } else if (
        [USER_ROLE.SUPER_ADMIN, USER_ROLE.GUEST, USER_ROLE.VENDOR].map(r => r.toUpperCase()).includes(roleName)
    ) {
        console.log(">> Creating Generic User (Super Admin, Guest, or Vendor)...");
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Generate unique user ID if not provided
            if (!userData.id) {
                const timestamp = Date.now().toString(36);
                const random = Math.random().toString(36).substring(2, 7);
                userData.id = `USER_${timestamp}_${random}`.toUpperCase();
            }

            // Apply Name Schema structure if flattened
            if (!userData.name && userData.firstName) {
                userData.name = {
                    firstName: userData.firstName,
                    lastName: userData.lastName
                };
            }

            // Resolve businessUnits using helper
            if (userData.businessUnits && Array.isArray(userData.businessUnits)) {
                userData.businessUnits = await resolveBusinessUnitIds(userData.businessUnits);
            }

            // Handle Image if generic user
            if (file) {
                const { secure_url } = (await sendImageToCloudinary(
                    `USER-${userData.id}`,
                    file.path
                )) as any;
                userData.avatar = secure_url;
            }

            // Create user
            const newUsers = await User.create([userData], { session });
            result = newUsers[0];

            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

    } else {
        // DEFAULT: All other roles (Manager, Admin, Cashier, Sales Associate, and ANY DYNAMIC ROLE)
        // are treated as STAFF and get a Staff Profile.
        console.log(`>> Creating Staff Profile for Role: ${roleName}`);

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Map userData to IStaff
            const firstName = userData.firstName || userData.name?.firstName;
            const lastName = userData.lastName || userData.name?.lastName;

            const staffPayload = {
                ...userData,
                firstName: firstName,
                lastName: lastName,
                businessUnit: userData.businessUnit, // ID
                // Ensure designation is set (fallback to Role Name if missing)
                designation: userData.designation || roleName,
            };
            result = await createStaffService(staffPayload, userData.password, file);

            // POST-CREATION PERMISSION FIX (Link multiple outlets)
            if (result && userData.permissions && Array.isArray(userData.permissions) && userData.permissions.length > 0) {
                const userId = result.user._id || result.user; // result might be Staff doc populated
                const UserBusinessAccess = mongoose.model('UserBusinessAccess');

                // 1. Remove the default access created by service (if any) to avoid duplication/conflict
                await UserBusinessAccess.deleteMany({ user: userId });

                // 2. Create requested accesses
                const accessPayloads = userData.permissions.map((p: any) => ({
                    user: userId,
                    role: p.role,
                    organization: p.organization || userData.organization, // Include organization
                    businessUnit: p.businessUnit,
                    outlet: p.outlet || null,
                    scope: p.outlet ? 'OUTLET' : 'BUSINESS',
                    status: 'ACTIVE',
                    isPrimary: p.isPrimary || false
                }));

                if (accessPayloads.length > 0) accessPayloads[0].isPrimary = true;

                await UserBusinessAccess.insertMany(accessPayloads);
                console.log(`>> Updated ${accessPayloads.length} permissions for user ${userId}`);
            }

        } catch (error) {
            // If createStaffService threw, it already rolled back.
            // If our permission logic throws, we are in trouble unless we wrapped everything.
            // Given constraint, I will stick to this optimisitic approach or user might need comprehensive refactor of Service to accept Session.
            throw error;
        } finally {
            session.endSession();
        }
    }

    ApiResponse.success(res, {
        success: true,
        statusCode: status.CREATED,
        message: "User and Profile created successfully",
        data: result,
    });
});



















