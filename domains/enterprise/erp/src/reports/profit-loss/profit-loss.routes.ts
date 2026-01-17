import express from "express";
import { ProfitLossController } from "./profit-loss.controller";

const router = express.Router();

// Routes are exported without auth middleware
// Middleware is applied at backend route registration for security

router.get("/statement", ProfitLossController.getProfitLoss);

export const ProfitLossRoutes = router;
