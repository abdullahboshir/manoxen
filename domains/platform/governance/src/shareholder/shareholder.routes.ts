import { Router } from "express";
import { ShareholderController } from "./shareholder.controller";
const router = Router();

router.post(
    "/",
    // Should add strict permission: GOVERNANCE_SHAREHOLDER.MANAGE
    ShareholderController.createShareholder
);

router.get(
    "/",
    ShareholderController.getAllShareholders
);

router.patch(
    "/:id",
    ShareholderController.updateShareholder
);

router.delete(
    "/:id",
    ShareholderController.deleteShareholder
);

export const ShareholderRoutes = router;




