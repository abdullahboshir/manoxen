
import { authorize } from "#app/routes/middleware/authorize";
import { validateRequest } from "@manoxen/core-util"; // Assuming it is exported from index
import { Router } from 'express';

import type { AnyZodObject } from 'zod/v3';

import { PermissionActionObj, PermissionSourceObj, USER_ROLE } from "@manoxen/iam";
import auth from "#domain/iam/interface/http/middleware.js";
import { createBusinessUnitController, deleteBusinessUnitController, getAllBusinessUnitsController, getBusinessUnitByIdController, getBusinessUnitStatsController, updateBusinessUnitController } from "../controllers/business-unit.controller.js";
import { createBusinessUnitValidationSchema, updateBusinessUnitValidationSchema } from "../validation/business-unit.validation.js";


const router = Router();

router.get(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.ORGANIZATION_OWNER),
  authorize(PermissionSourceObj.businessUnit, PermissionActionObj.view),
  getAllBusinessUnitsController
);

router.post(
  '/create',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER), // Both super admin and organization owner can create BUs
  // authorize(PermissionSourceObj.businessUnit, PermissionActionObj.create), // Temporarily disabled
  validateRequest(createBusinessUnitValidationSchema as unknown as AnyZodObject),
  createBusinessUnitController
);

router.delete(
  '/:businessUnitId',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER),
  // authorize(PermissionSourceObj.businessUnit, PermissionActionObj.delete),
  deleteBusinessUnitController
);

router.get(
  '/:businessUnitId',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.ADMIN,
    USER_ROLE.ORGANIZATION_OWNER,
    USER_ROLE.MANAGER,
    USER_ROLE.OUTLET_MANAGER,
    USER_ROLE.SALES_ASSOCIATE,
    USER_ROLE.CASHIER,
    USER_ROLE.STAFF
  ),
  getBusinessUnitByIdController
);

router.patch(
  '/:businessUnitId',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER),
  validateRequest(updateBusinessUnitValidationSchema as unknown as AnyZodObject),
  updateBusinessUnitController
);

router.get(
  '/:businessUnitId/dashboard',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.ADMIN,
    USER_ROLE.ORGANIZATION_OWNER,
    USER_ROLE.MANAGER,
    USER_ROLE.OUTLET_MANAGER,
    USER_ROLE.SALES_ASSOCIATE,
    USER_ROLE.CASHIER,
    USER_ROLE.STAFF
  ),
  getBusinessUnitStatsController
);


export const businessUnitRoutes = router;
























