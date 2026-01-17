import express from 'express';
import * as OrganizationController from "./organization.controller";
import { validateRequest } from "#core/middleware/validateRequest";
import { createOrganizationSchema, updateOrganizationSchema } from "./organization.validation";

import { OrganizationSettingsRoutes } from "./settings/settings.routes";
import auth from "#core/middleware/auth";

const router = express.Router();

router.use('/:organizationId/settings', OrganizationSettingsRoutes); // Nested Settings Route

router.post('/', auth('super-admin'), validateRequest(createOrganizationSchema), OrganizationController.createOrganization);
router.patch('/:id/tenant-config', auth('super-admin'), validateRequest(updateOrganizationSchema), OrganizationController.updateOrganizationTenantConfig);
router.get('/', auth(), OrganizationController.getAllOrganizations);
router.get('/:id', auth(), OrganizationController.getOrganizationById);
router.get('/:organizationId/dashboard', auth(), OrganizationController.getOrganizationDashboardStats);

export const OrganizationRoutes = router;


















