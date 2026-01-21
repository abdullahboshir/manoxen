import { Router } from "express";
import { AttendanceController } from "../controllers/attendance.controller";
import { resourceOwnerGuard } from "@manoxen/iam-core";
import { Attendance } from "../../../infrastructure/persistence/mongoose/attendance.model";

const router = Router();

router.post("/", AttendanceController.createAttendance);
router.get("/", AttendanceController.getAllAttendance);
router.get("/:id", resourceOwnerGuard(Attendance), AttendanceController.getAttendanceById);
router.patch("/:id", resourceOwnerGuard(Attendance), AttendanceController.updateAttendance);
router.delete("/:id", resourceOwnerGuard(Attendance), AttendanceController.deleteAttendance);

export const AttendanceRoutes = router;
