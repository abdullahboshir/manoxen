import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import type { Request, Response } from "express";

const createDesignation = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.success(res, null, "Designation created successfully", httpStatus.CREATED);
});

const getAllDesignation = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.paginated(res, [], 1, 10, 0, "Designations retrieved successfully");
});

const getDesignationById = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.success(res, null, "Designation retrieved successfully");
});

const updateDesignation = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.success(res, null, "Designation updated successfully");
});

const deleteDesignation = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.success(res, null, "Designation deleted successfully");
});

export const DesignationController = {
    createDesignation,
    getAllDesignation,
    getDesignationById,
    updateDesignation,
    deleteDesignation,
};

