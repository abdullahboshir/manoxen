import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import type { Request, Response } from "express";

const createAPIKey = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.success(res, null, "API Key created successfully", httpStatus.CREATED);
});

const getAllAPIKey = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.paginated(res, [], 1, 10, 0, "API Keys retrieved successfully");
});

const getAPIKeyById = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.success(res, null, "API Key retrieved successfully");
});

const revokeAPIKey = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.success(res, null, "API Key revoked successfully");
});

const deleteAPIKey = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.success(res, null, "API Key deleted successfully");
});

export const APIKeyController = {
    createAPIKey,
    getAllAPIKey,
    getAPIKeyById,
    revokeAPIKey,
    deleteAPIKey,
};













