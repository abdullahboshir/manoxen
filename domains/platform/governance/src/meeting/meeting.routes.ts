import { Router } from "express";
import { MeetingController } from "./meeting.controller";
const router = Router();

router.post("/", MeetingController.createMeeting);
router.get("/", MeetingController.getAllMeetings);
router.patch("/:id", MeetingController.updateMeeting);

export const MeetingRoutes = router;




