import { Router } from 'express';
import {
    getStoreConfigController,
    updateStoreConfigController,
    getPageController,
    savePageController,
    getAllPagesController,
    deletePageController,
    getStoreProductsController
} from "./storefront.controller";

const router = Router();

// Routes are exported without auth middleware
// Middleware is applied at backend route registration for security

// PUBLIC ROUTES
router.get('/:businessUnitId/products', getStoreProductsController);
router.get('/:businessUnitId/config', getStoreConfigController);
router.get('/:businessUnitId/pages/:slug', getPageController);

// ADMIN ROUTES
router.patch('/:businessUnitId/config', updateStoreConfigController);
router.post('/:businessUnitId/pages', savePageController);
router.get('/:businessUnitId/pages', getAllPagesController);
router.delete('/:businessUnitId/pages/:pageId', deletePageController);

export const storefrontRoutes = router;
