import { Router } from 'express';

import { PermissionActionObj, PermissionSourceObj, USER_ROLE } from '@manoxen/iam-core';
import {
  getAllPermissions,
  getPermissionResources,
  getPermissionById,
  getUserPermissions,
  checkUserPermission
} from "./permission.controller";
import auth from "#core/middleware/auth";
import { authorize } from "#core/middleware/authorize";

const router = Router();

// Get unique permission resources
router.get('/resources',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.ADMIN),
  getPermissionResources
);

// Get all permissions - Admin only
router.get('/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.ADMIN),
  authorize(PermissionSourceObj.role, PermissionActionObj.read),
  getAllPermissions
);

// Get single permission
router.get('/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.ADMIN),
  authorize(PermissionSourceObj.role, PermissionActionObj.read),
  getPermissionById
);

// Get permissions for a specific user
router.get('/user/:userId',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.ADMIN),
  getUserPermissions
);

// Check if user has specific permission
router.post('/check',
  auth(),
  checkUserPermission
);

export const permissionRoutes = router;


















