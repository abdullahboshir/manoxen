
import express from 'express';
import {
    getAllPermissionGroups,
    getPermissionGroupById,
    createPermissionGroup,
    updatePermissionGroup,
    deletePermissionGroup
} from "../controllers/permission-group.controller";
import auth, { adminAuthMiddleware } from "../middleware";
// import { USER_ROLE } from '@manoxen/iam-core';

const router = express.Router();

router.use(auth()); // All routes require authentication

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



















