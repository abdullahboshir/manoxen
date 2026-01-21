import express from "express";
import { CashRegisterController } from "#contexts/pos/src/interface/http/controllers/cash-register.controller.js";
import { CashRegisterValidation } from "#contexts/pos/src/interface/http/validators/cash-register.validation";

const router = express.Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

router.post("/open", CashRegisterController.openRegister);
router.post("/:id/close", CashRegisterController.closeRegister);
router.get("/active", CashRegisterController.getMyActiveRegister);
router.get("/", CashRegisterController.getAllRegisters);
router.get("/:id", CashRegisterController.getRegisterById);

export const CashRegisterRoutes = router;

// Export validations for backend to apply
export { CashRegisterValidation };
