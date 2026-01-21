import { Router } from "express";
import { getDashboardStatsController } from "../controllers/dashboard.controller";

import { USER_ROLE } from "@manoxen/iam-core";
import { authMiddleware } from "@manoxen/identity";

const router = Router();

router.get("/stats", authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER), getDashboardStatsController);

export const dashboardRoutes = router;

















