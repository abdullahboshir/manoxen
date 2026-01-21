import { Router } from "express";
import * as OutletController from "../controllers/outlet.controller";

const router = Router();

router.post("/", OutletController.createOutletController);
router.get("/", OutletController.getOutletsController);
router.get("/:id", OutletController.getOutletByIdController);
router.patch("/:id", OutletController.updateOutletController);
router.delete("/:id", OutletController.deleteOutletController);
router.get("/:id/stats", OutletController.getOutletStatsController);

export const OutletRoutes = router;
