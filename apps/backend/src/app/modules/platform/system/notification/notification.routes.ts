
import { Router } from "express";
import { NotificationController } from "./notification.controller";

const router = Router();

router.get("/", NotificationController.getAllNotification);
router.patch("/:id/read", NotificationController.markAsRead);
router.delete("/:id", NotificationController.deleteNotification);

export const NotificationRoutes = router;
















