import express from "express";
import { BusinessUnitSettingsController } from "./settings.controller";
import { authorize } from "#core/middleware/authorize";
import { PermissionActionObj, PermissionSourceObj } from "#app/modules/iam/index";

const router = express.Router();

router.get(
    "/:businessUnitId",
    authorize(PermissionSourceObj.businessSetting, PermissionActionObj.view),
    BusinessUnitSettingsController.getSettings
);

router.patch(
    "/:businessUnitId",
    authorize(PermissionSourceObj.businessSetting, PermissionActionObj.update),
    BusinessUnitSettingsController.updateSettings
);

export const BusinessUnitSettingsRoutes = router;
























