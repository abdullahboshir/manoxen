import { Router } from "express";
import { TaxController } from "./tax.controller";
import { TaxValidations } from "./tax.validation";

const router = Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

router.post("/", TaxController.createTax);
router.get("/", TaxController.getAllTaxes);
router.get("/:id", TaxController.getTaxById);
router.patch("/:id", TaxController.updateTax);
router.delete("/:id", TaxController.deleteTax);

export const TaxRoutes = router;

// Export validations for backend to apply
export { TaxValidations };
