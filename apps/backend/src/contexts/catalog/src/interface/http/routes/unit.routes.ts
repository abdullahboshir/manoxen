import { Router } from "express";
import { UnitController } from "../controllers/unit.controller";
import { createUnitValidationSchema, updateUnitValidationSchema } from "../validators/unit.validation";

const router = Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

router.post("/", UnitController.create);
router.get("/", UnitController.getAll);
router.get("/:id", UnitController.getById);
router.patch("/:id", UnitController.update);
router.delete("/:id", UnitController.delete);

export const UnitRoutes = router;


