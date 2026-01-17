import { Router } from 'express';

import { PermissionActionObj, PermissionSourceObj, USER_ROLE } from '@manoxen/iam-core';
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  assignPermissionsToRole,
  removePermissionsFromRole
} from "./role.controller";
import { createRoleValidation, updateRoleValidation } from '@manoxen/iam-core';
import type { AnyZodObject } from 'zod/v3';
import { authMiddleware as auth } from "#core/middleware/auth";
import { authorize } from "#core/middleware/authorize";
import { validateRequest } from "#core/middleware/validateRequest";

const router = Router();

// Get all roles
router.get('/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.ADMIN),
  authorize(PermissionSourceObj.role, PermissionActionObj.view),
  getAllRoles
);

// Get single role
router.get('/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.ADMIN),
  authorize(PermissionSourceObj.role, PermissionActionObj.read),
  getRoleById
);

// Create role
router.post('/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER),
  authorize(PermissionSourceObj.role, PermissionActionObj.create),
  validateRequest(createRoleValidation as unknown as AnyZodObject),
  createRole
);

// Update role
router.patch('/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER),
  authorize(PermissionSourceObj.role, PermissionActionObj.update),
  validateRequest(updateRoleValidation as unknown as AnyZodObject),
  updateRole
);

// Delete role
router.delete('/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER),
  authorize(PermissionSourceObj.role, PermissionActionObj.delete),
  deleteRole
);

// Assign permissions to role
router.post('/:id/permissions',
  auth(USER_ROLE.SUPER_ADMIN),
  authorize(PermissionSourceObj.role, PermissionActionObj.manage),
  assignPermissionsToRole
);

// Remove permissions from role
router.delete('/:id/permissions',
  auth(USER_ROLE.SUPER_ADMIN),
  authorize(PermissionSourceObj.role, PermissionActionObj.manage),
  removePermissionsFromRole
);

export const roleRoutes = router;


















