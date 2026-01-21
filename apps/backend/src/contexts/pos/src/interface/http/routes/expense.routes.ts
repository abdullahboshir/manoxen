import express from "express";
import { ExpenseController } from "#contexts/pos/src/interface/http/controllers/expense.controller.js";
import { ExpenseValidation } from "#contexts/pos/src/interface/http/validators/expense.validation.js";

const router = express.Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

router.post("/create", ExpenseController.createExpense);
router.get("/", ExpenseController.getAllExpenses);
router.get("/:id", ExpenseController.getExpenseById);
router.patch("/:id", ExpenseController.updateExpense);
router.delete("/:id", ExpenseController.deleteExpense);

export const ExpenseRoutes = router;

// Export validations for backend to apply
export { ExpenseValidation };
