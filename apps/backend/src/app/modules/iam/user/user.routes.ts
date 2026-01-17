import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";

import {
  createCustomerController,
  getUsersController,
  getSingleUserController,
  updateUserController,
  getUserSettingsController,
  updateUserSettingsController,
  deleteUserController,
  updateProfileController,
} from "./user.controller";
import { createUserController } from "./create-user.controller";

import type { AnyZodObject as _AnyZodObject } from "zod/v3";


import {
  PermissionActionObj,
  PermissionSourceObj,
} from "@manoxen/iam-core";
import auth from "#core/middleware/auth";
import { authorize } from "#core/middleware/authorize";

import { upload } from "#core/utils/file-upload";
import { validateRequest } from "#core/middleware/validateRequest";

import { roleRoutes } from "..//role/role.routes";
import { USER_ROLE } from "@manoxen/iam-core";
import moduleGuard from "#app/middlewares/moduleGuard";
import { createCustomerZodSchema } from "#app/modules/contacts/index";


const router = Router();

router.use("/roles", roleRoutes);


router.get(
  "/all-users",
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.ADMIN),
  getUsersController
);

router.patch(
  "/profile",
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.CUSTOMER),
  upload.single("file"),
  (req: Request, _res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  updateProfileController
);

router.post(
  "/create",
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.ADMIN),
  // authorize(PermissionSourceObj.user, PermissionActionObj.create),
  createUserController
);

router.post(
  "/create-customer",
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.ADMIN),
  moduleGuard('crm'),
  authorize(PermissionSourceObj.customer, PermissionActionObj.create),
  upload.single("file"),
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createCustomerZodSchema),
  createCustomerController
);

// router.post(
//   '/create-vendor',
//    auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
//    authorize(PermissionSourceObj.vendor, PermissionActionObj.create),
//   upload.single('file'),
//   (req: Request, _res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data)
//     next()
//   },
//   validateRequest(CreateVendorValidation as unknown as AnyZodObject),
//   createVendorController
// )

// Settings Routes
router.get(
  "/settings",
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.CUSTOMER),
  getUserSettingsController
);

router.patch(
  "/settings",
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.CUSTOMER),
  updateUserSettingsController
);

// Get Single User
router.get(
  "/:id",
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.ADMIN),
  getSingleUserController
);

// Update user (roles, status, etc.)
router.patch(
  "/:id",
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.ADMIN),
  // authorize(PermissionSourceObj.user, PermissionActionObj.update),
  upload.single("file"),
  (req: Request, _res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  updateUserController
);

// Delete user
router.delete(
  "/:id",
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER, USER_ROLE.ADMIN),
  // authorize(PermissionSourceObj.user, PermissionActionObj.delete),
  deleteUserController
);

export const userRoutes = router;



















