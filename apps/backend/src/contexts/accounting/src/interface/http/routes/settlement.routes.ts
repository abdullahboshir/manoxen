import { Router } from "express";
import { SettlementController } from "../controllers/settlement.controller";
import { authMiddleware as authGuard } from "@manoxen/iam";

const router = Router();

router.get("/summary/:businessUnitId", authGuard('organization_finance_view'), SettlementController.getSettlementSummary);

export const SettlementRoutes = router;
