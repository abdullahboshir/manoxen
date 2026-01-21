import { Router } from "express";
import { ReconciliationController } from "../controllers/reconciliation.controller";
import { authMiddleware as authGuard } from "@manoxen/iam";

const router = Router();

router.post("/run", authGuard('organization_finance_manage'), ReconciliationController.runReconciliation);

export const ReconciliationRoutes = router;
