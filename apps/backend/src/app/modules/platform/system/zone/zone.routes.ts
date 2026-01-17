
import { Router } from "express";
import { ZoneController } from "./zone.controller";

const router = Router();

router.post("/", ZoneController.createZone);
router.get("/", ZoneController.getAllZone);
router.get("/:id", ZoneController.getZoneById);
router.patch("/:id", ZoneController.updateZone);
router.delete("/:id", ZoneController.deleteZone);

export const ZoneRoutes = router;
















