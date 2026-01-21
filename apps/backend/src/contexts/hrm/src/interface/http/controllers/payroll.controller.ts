import { catchAsync, ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import type { Request, Response } from "express";

const createPayroll = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.success(res, null, "Payroll created successfully", httpStatus.CREATED);
});

const getAllPayroll = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.paginated(res, [], 1, 10, 0, "Payrolls retrieved successfully");
});

export const PayrollController = {
    createPayroll,
    getAllPayroll,
};
