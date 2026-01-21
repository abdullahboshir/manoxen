import { Router } from "express";
import { getAllStockLevelsController } from "../controllers/stock.controller";
import { authMiddleware } from "@manoxen/iam";
import { USER_ROLE } from "@manoxen/iam-core";

const router = Router();

// Basic security
router.use(authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER));

router.get("/", getAllStockLevelsController);

export const InventoryRoutes = router;
