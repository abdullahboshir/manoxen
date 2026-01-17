import { Router } from "express";
import { blacklistController, riskRuleController, RiskSearchController } from "./risk.controller";

const router = Router();

// Routes are exported without middleware
// Middleware is applied at backend route registration for security

// Blacklist Routes
router.post("/blacklist", blacklistController.create);
router.get("/blacklist", blacklistController.getAll);
router.get("/blacklist/:id", blacklistController.getById);
router.patch("/blacklist/:id", blacklistController.update);
router.delete("/blacklist/:id", blacklistController.delete);

// Risk Rule Routes
router.post("/rules", riskRuleController.create);
router.get("/rules", riskRuleController.getAll);
router.get("/rules/:id", riskRuleController.getById);
router.patch("/rules/:id", riskRuleController.update);
router.delete("/rules/:id", riskRuleController.delete);

// Fraud Check
router.post("/check-fraud", RiskSearchController.checkFraud);

export const riskRoutes = router;
