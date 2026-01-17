import { Router } from 'express';
import { productRoutes } from "#domain/catalog/product/domain/product-core/product.routes";

const router = Router();

// Mount the core product routes
router.use('/', productRoutes);

export default router;













