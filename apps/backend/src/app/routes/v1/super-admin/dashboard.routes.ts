import { Router } from "express";
import { getDashboardStatsController } from "./dashboard.controller";

import { USER_ROLE } from "@manoxen/iam-core";
import auth from "#core/middleware/auth";

const router = Router();

router.get("/stats", auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER), getDashboardStatsController);

export const dashboardRoutes = router;

















