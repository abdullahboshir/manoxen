import { Router } from "express";
import { DesignationController } from "../controllers/designation.controller";

const router = Router();

router.post("/", DesignationController.createDesignation);
router.get("/", DesignationController.getAllDesignation);
router.get("/:id", DesignationController.getDesignationById);
router.patch("/:id", DesignationController.updateDesignation);
router.delete("/:id", DesignationController.deleteDesignation);

export const DesignationRoutes = router;
