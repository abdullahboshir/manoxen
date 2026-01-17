import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import type { Request, Response } from "express";
import { createAdjustmentService, getAdjustmentsService } from "./adjustment.service";
import { getLedgerHistoryService } from "../ledger/ledger.service";


export const createAdjustmentController = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user._id;
    const result = await createAdjustmentService(req.body, userId);
    ApiResponse.success(res, result, "Stock adjustment created successfully", httpStatus.CREATED);
});

export const getAdjustmentsController = catchAsync(async (req: Request, res: Response) => {
    const result = await getAdjustmentsService(req.query);
    ApiResponse.success(res, result, "Adjustments retrieved successfully");
});

export const getLedgerController = catchAsync(async (req: Request, res: Response) => {
    const result = await getLedgerHistoryService(req.query);
    ApiResponse.success(res, result, "Ledger history retrieved successfully");
});






