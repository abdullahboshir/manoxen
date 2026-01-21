import express from "express";
import { WarrantyController } from "../controllers/warranty.controller";
import { createWarrantyValidationSchema, updateWarrantyValidationSchema } from "../validators/warranty.validation";

const router = express.Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

router.post("/", WarrantyController.createWarranty);
router.get("/", WarrantyController.getAllWarranties);
router.get("/:id", WarrantyController.getSingleWarranty);
router.patch("/:id", WarrantyController.updateWarranty);
router.delete("/:id", WarrantyController.deleteWarranty);

export const WarrantyRoutes = router;


