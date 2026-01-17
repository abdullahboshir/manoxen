import { Router } from "express";
import { UnitController } from "./unit.controller";
import { UnitValidations } from "./unit.validation";

const router = Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

router.post("/", UnitController.create);
router.get("/", UnitController.getAll);
router.get("/:id", UnitController.getById);
router.patch("/:id", UnitController.update);
router.delete("/:id", UnitController.delete);

export const UnitRoutes = router;

// Export validations for backend to apply
export { UnitValidations };
