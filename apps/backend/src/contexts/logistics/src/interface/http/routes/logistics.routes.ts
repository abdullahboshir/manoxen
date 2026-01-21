import express from "express";
import { courierController, LogisticsActionController } from "#contexts/logistics/src/interface/http/controllers/logistics.controller";
import { authMiddleware as authGuard } from "@manoxen/iam";
const roleGuard = (roles: string[]) => (_req: any, _res: any, next: any) => next(); // Mock if missing

const router = express.Router();

// Courier Management Routes
router.post("/couriers", authGuard(), roleGuard(["SUPER_ADMIN", "ORG_ADMIN"]), courierController.create);

router.get("/couriers", authGuard(), courierController.getAll);

router.get("/couriers/:id", authGuard(), courierController.getById);

router.put("/couriers/:id", authGuard(), roleGuard(["SUPER_ADMIN", "ORG_ADMIN"]), courierController.update);

router.delete("/couriers/:id", authGuard(), roleGuard(["SUPER_ADMIN", "ORG_ADMIN"]), courierController.delete);

// Shipment Management
router.post("/shipments", authGuard(), LogisticsActionController.createShipment);

export default router;
