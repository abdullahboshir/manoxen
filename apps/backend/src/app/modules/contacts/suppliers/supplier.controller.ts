import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import type { Request, Response } from "express";

export const getAllSuppliersController = catchAsync(async (_req: Request, res: Response) => {
    ApiResponse.success(res, [], "Suppliers retrieved successfully");
});













