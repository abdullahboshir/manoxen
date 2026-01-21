import { Router } from "express";
import { ProfitLossController } from "../controllers/profit-loss.controller";
import { authMiddleware } from "@manoxen/identity";
import { USER_ROLE } from "@manoxen/iam-core";

const router = Router();

router.get("/stats", authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER), ProfitLossController.getProfitLoss);

export const ProfitLossRoutes = router;
