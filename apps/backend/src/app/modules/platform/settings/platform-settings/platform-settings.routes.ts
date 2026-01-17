import express from 'express';
import { PlatformSettingsController } from "./platform-settings.controller";
import auth from "#core/middleware/auth";
import { USER_ROLE } from "#app/modules/iam/index";

const router = express.Router();

router.get(
    '/',
    auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.PLATFORM_ADMIN),
    PlatformSettingsController.getSettings
);

router.patch(
    '/',
    auth(USER_ROLE.SUPER_ADMIN),
    PlatformSettingsController.updateSettings
);

export const PlatformSettingsRoutes = router;


















