import express from "express";
import { ExpenseCategoryController } from "./expense-category.controller";
import { ExpenseCategoryValidation } from "./expense-category.validation";

const router = express.Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

router.post("/", ExpenseCategoryController.createExpenseCategory);
router.get("/", ExpenseCategoryController.getAllExpenseCategories);
router.get("/:id", ExpenseCategoryController.getExpenseCategoryById);
router.patch("/:id", ExpenseCategoryController.updateExpenseCategory);
router.delete("/:id", ExpenseCategoryController.deleteExpenseCategory);

export const ExpenseCategoryRoutes = router;

// Export validations for backend to apply
export { ExpenseCategoryValidation };
