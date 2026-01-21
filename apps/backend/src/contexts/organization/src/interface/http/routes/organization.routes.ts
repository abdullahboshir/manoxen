import express from 'express';
import * as OrganizationController from "#contexts/organization/src/interface/http/controllers/organization.controller.js";

const OrganizationSettingsRoutes = express.Router(); // Stub for nested settings routes
import auth from '#domain/iam/interface/http/middleware.js';

const router = express.Router();

router.use('/:organizationId/settings', OrganizationSettingsRoutes); // Nested Settings Route

router.post('/', auth('super-admin'), OrganizationController.createOrganization);
router.patch('/:id/tenant-config', auth('super-admin'), OrganizationController.updateOrganizationTenantConfig);
router.get('/', auth(), OrganizationController.getAllOrganizations);
router.get('/:id', auth(), OrganizationController.getOrganizationById);
router.get('/:organizationId/dashboard', auth(), OrganizationController.getOrganizationDashboardStats);

export const OrganizationRoutes = router;


















