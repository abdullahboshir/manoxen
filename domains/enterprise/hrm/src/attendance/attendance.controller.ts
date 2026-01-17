import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import type { Request, Response } from "express";
import { AttendanceService } from "./attendance.service";

const createAttendance = catchAsync(async (req: Request, res: Response) => {
    // Check In
    const userId = (req as any).user?.['id'] || (req as any).user?.['_id'];
    // Business Unit from header or params? Usually params in this architecture [business-unit]
    // But backend might depend on context.
    // For now assuming body carries data or we infer from context.
    const result = await AttendanceService.checkIn(userId, req.body, (req as any).user);
    ApiResponse.success(res, result, "Checked in successfully", httpStatus.CREATED);
});

const getAllAttendance = catchAsync(async (req: Request, res: Response) => {
    const filters = req.query;
    const result = await AttendanceService.getAllAttendance(filters);
    ApiResponse.success(res, result, "Attendance retrieved successfully");
});

const getAttendanceById = catchAsync(async (req: Request, res: Response) => {
    const result = await AttendanceService.getAttendanceById(req.params['id'] as string);
    ApiResponse.success(res, result, "Attendance retrieved successfully");
});

const updateAttendance = catchAsync(async (req: Request, res: Response) => {
    // Check Out or Update
    const result = await AttendanceService.updateAttendance(req.params['id'] as string, req.body);
    ApiResponse.success(res, result, "Attendance updated successfully");
});

const deleteAttendance = catchAsync(async (req: Request, res: Response) => {
    await AttendanceService.deleteAttendance(req.params['id'] as string);
    ApiResponse.success(res, null, "Attendance deleted successfully");
});

export const AttendanceController = {
    createAttendance,
    getAllAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
};





