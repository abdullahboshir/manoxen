import { catchAsync, ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import type { Request, Response } from "express";
import { LeaveService } from "../../../application/services/leave.service";

const createLeave = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user?.['id'] || (req as any).user?.['_id'];
    if (!userId) throw new Error("User not authenticated");
    const result = await LeaveService.createLeave(userId as string, req.body);
    ApiResponse.success(res, result, "Leave request submitted successfully", httpStatus.CREATED);
});

const getAllLeave = catchAsync(async (req: Request, res: Response) => {
    const result = await LeaveService.getAllLeave(req.query);
    ApiResponse.success(res, result, "Leaves retrieved successfully");
});

const getLeaveById = catchAsync(async (req: Request, res: Response) => {
    ApiResponse.success(res, null, "Leave retrieved successfully");
});

const updateLeave = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user?.['id'] || (req as any).user?.['_id'];
    if (!userId) throw new Error("User not authenticated");
    const result = await LeaveService.updateLeaveStatus(
        req.params['id'] as string,
        req.body.status,
        userId as string,
        req.body.reason
    );
    ApiResponse.success(res, result, "Leave request updated successfully");
});

const deleteLeave = catchAsync(async (req: Request, res: Response) => {
    await LeaveService.deleteLeave(req.params['id'] as string);
    ApiResponse.success(res, null, "Leave request deleted successfully");
});

export const LeaveController = {
    createLeave,
    getAllLeave,
    getLeaveById,
    updateLeave,
    deleteLeave,
};
