import { Router } from "express";
import { PayoutController } from "../controllers/payout.controller";
import { authMiddleware as authGuard } from "@manoxen/iam";

const router = Router();

router.post("/", authGuard('organization_finance_manage'), PayoutController.createPayout);
router.get("/", authGuard('organization_finance_view'), PayoutController.getAllPayouts);
router.get("/summary/:businessUnitId", authGuard('organization_finance_view'), PayoutController.getPayoutSummary);

export const PayoutRoutes = router;
