
import express from 'express';
import {
    getAllPermissionGroups,
    getPermissionGroupById,
    createPermissionGroup,
    updatePermissionGroup,
    deletePermissionGroup
} from "./permission-group.controller";
import { authMiddleware, adminAuthMiddleware } from "#core/middleware/auth";
// import { USER_ROLE } from '@manoxen/iam-core';

const router = express.Router();

router.use(authMiddleware()); // All routes require authentication

// Get all groups
router.get(
    '/',
    adminAuthMiddleware,
    getAllPermissionGroups
);

// Create group
router.post(
    '/',
    adminAuthMiddleware,
    createPermissionGroup
);

// Get group by ID
router.get(
    '/:id',
    adminAuthMiddleware,
    getPermissionGroupById
);

// Update group
router.patch(
    '/:id',
    adminAuthMiddleware,
    updatePermissionGroup
);

// Delete group
router.delete(
    '/:id',
    adminAuthMiddleware,
    deletePermissionGroup
);

export const PermissionGroupRoutes = router;



















