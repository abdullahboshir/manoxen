
import { Router } from "express";
import { BudgetController } from "../controllers/budget.controller";

const router = Router();

router.post("/", BudgetController.createBudget);
router.get("/", BudgetController.getAllBudget);
router.get("/:id", BudgetController.getBudgetById);
router.patch("/:id", BudgetController.updateBudget);
router.delete("/:id", BudgetController.deleteBudget);

export const BudgetRoutes = router;




