import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import type { Request, Response } from "express";

const createCurrency = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.success(res, null, "Currency created successfully", httpStatus.CREATED);
});

const getAllCurrency = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.paginated(res, [], 1, 10, 0, "Currencies retrieved successfully");
});

const getCurrencyById = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.success(res, null, "Currency retrieved successfully");
});

const updateCurrency = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.success(res, null, "Currency updated successfully");
});

const deleteCurrency = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.success(res, null, "Currency deleted successfully");
});

export const CurrencyController = {
    createCurrency,
    getAllCurrency,
    getCurrencyById,
    updateCurrency,
    deleteCurrency,
};













