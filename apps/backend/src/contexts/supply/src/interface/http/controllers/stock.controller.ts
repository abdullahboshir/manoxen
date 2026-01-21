import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import type { Request, Response } from "express";
import { getAllStockLevelsService, getProductStockLevelService } from "#domain/supply/application/services/stock.service";

export const getAllStockLevelsController = catchAsync(async (req: Request, res: Response) => {
    const result = await getAllStockLevelsService(req.query);
    ApiResponse.success(res, result, "Stock levels retrieved successfully");
});

export const getProductStockLevelController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getProductStockLevelService(id as string);
    ApiResponse.success(res, result, "Product stock level retrieved successfully");
});





