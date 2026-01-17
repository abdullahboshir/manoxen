import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import type { Request, Response } from "express";
import { MeetingService } from "./meeting.service";

const createMeeting = catchAsync(async (req: Request, res: Response) => {
    const result = await MeetingService.createMeeting({
        ...req.body,
        createdBy: (req as any).user?.['_id']
    });
    ApiResponse.success(res, result, "Meeting scheduled successfully", httpStatus.CREATED);
});

const getAllMeetings = catchAsync(async (req: Request, res: Response) => {
    const result = await MeetingService.getAllMeetings(req.query);
    ApiResponse.success(res, result, "Meetings retrieved successfully");
});

const updateMeeting = catchAsync(async (req: Request, res: Response) => {
    const result = await MeetingService.updateMeeting(req.params['id'] as string, req.body);
    ApiResponse.success(res, result, "Meeting details updated successfully");
});

export const MeetingController = {
    createMeeting,
    getAllMeetings,
    updateMeeting
};





