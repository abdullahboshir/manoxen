import { Router } from "express";
import { ComplianceController } from "./compliance.controller";
const router = Router();

router.post("/", ComplianceController.uploadDocument);
router.get("/", ComplianceController.getAllDocuments);
router.delete("/:id", ComplianceController.deleteDocument);

export const ComplianceRoutes = router;




