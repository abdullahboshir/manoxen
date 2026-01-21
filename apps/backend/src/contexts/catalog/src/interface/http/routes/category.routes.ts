import { Router } from "express";
import { CategoryController, getCategoriesByBusinessUnit } from "../controllers/category.controller";

const router = Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

router.post("/create", CategoryController.create);
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
router.patch("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);
router.get("/:businessUnitId/getCategories", getCategoriesByBusinessUnit);

export const categoryRoutes = router;
