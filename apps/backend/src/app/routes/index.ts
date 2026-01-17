import { Router } from "express";
import { v1Routes } from "./v1/index";
import { SystemSettingsRoutes } from "..//modules/platform/settings/system-settings/system-settings.routes";
import { ApiResponse } from "@manoxen/core-util";

const router = Router();

router.use("/v1", v1Routes);
router.use("/v1/system-settings", SystemSettingsRoutes);

router.get("health", (_req, res) => {
  ApiResponse.success(res, {
    status: "Success",
    timestamp: new Date().toISOString(),
  }, "Server is running");
});

export default router;


















