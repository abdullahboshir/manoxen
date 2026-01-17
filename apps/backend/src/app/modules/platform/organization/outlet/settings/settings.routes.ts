import { Router } from 'express';
import { OutletSettingsController } from "./settings.controller";

const router = Router({ mergeParams: true });

router.get('/', OutletSettingsController.getSettings);
router.patch('/', OutletSettingsController.updateSettings);

export const OutletSettingsRoutes = router;
















