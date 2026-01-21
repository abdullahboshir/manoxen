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
} from "../controllers/user.controller";
import { createUserController } from "../controllers/create-user.controller";

import type { AnyZodObject as _AnyZodObject } from "zod/v3";


import {
  PermissionActionObj,
  PermissionSourceObj,
} from "@manoxen/iam-core";


import { validateRequest } from "@manoxen/core-util";

import { USER_ROLE } from "@manoxen/iam-core";
import auth from "../middleware";
import { roleRoutes } from "./role.routes";
import { upload } from "@manoxen/infra-common";
import moduleGuard from "#app/middlewares/moduleGuard.js";
import { authorize } from "#app/routes/middleware/authorize.js";
import { createCustomerZodSchema } from "@manoxen/backend/src/contexts/contacts";


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



















