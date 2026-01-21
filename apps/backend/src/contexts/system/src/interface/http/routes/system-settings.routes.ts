import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/system-settings.controller";
// import { authMiddleware } from "@manoxen/iam"; // Add auth later if needed

const router = Router();

router.get("/", getSettings);
router.patch("/", updateSettings);

export const SystemSettingsRoutes = router;
