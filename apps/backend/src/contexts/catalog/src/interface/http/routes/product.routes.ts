import { Router } from "express";
import { createProductController, getAllProductsController, getProductByIdController, updateProductController, deleteProductController } from "../controllers/product.controller";
import { productZodSchema, productUpdateSchema } from "../validators/product.validation";

const router = Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

router.post("/create", createProductController);
router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);
router.patch("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export const productRoutes = router;

// Export validations and metadata for backend to apply security layers
export const productRouteConfig = {
    module: 'erp',
    validations: {
        create: productZodSchema,
        update: productUpdateSchema
    }
};
