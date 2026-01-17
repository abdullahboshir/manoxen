import express from "express";
import { WarrantyController } from "./warranty.controller";
import { WarrantyValidation } from "./warranty.validation";

const router = express.Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

router.post("/", WarrantyController.createWarranty);
router.get("/", WarrantyController.getAllWarranties);
router.get("/:id", WarrantyController.getSingleWarranty);
router.patch("/:id", WarrantyController.updateWarranty);
router.delete("/:id", WarrantyController.deleteWarranty);

export const WarrantyRoutes = router;

// Export validations for backend to apply
export { WarrantyValidation };
