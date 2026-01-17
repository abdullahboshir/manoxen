import { Router } from "express";
import { BrandController } from "./brand.controller";
import { BrandValidations } from "./brand.validation";

const router = Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

router.post("/", BrandController.create);
router.get("/", BrandController.getAll);
router.get("/:id", BrandController.getById);
router.patch("/:id", BrandController.update);
router.delete("/:id", BrandController.delete);

export const BrandRoutes = router;

// Export validations for backend to apply
export { BrandValidations };
