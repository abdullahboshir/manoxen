import { catchAsync, ApiResponse } from "@manoxen/core-util";
import status from "http-status";
import type { Request, Response } from "express";
import { FinanceService } from "../../../application/services/finance.service";

const createPayout = catchAsync(async (req: any, res: Response) => {
    const { businessUnitId, amount, method } = req.body;
    const result = await FinanceService.createPayout({ businessUnitId, amount, method }, req.user);
    ApiResponse.success(res, result, "Payout request processed successfully", status.CREATED);
});

const getAllPayouts = catchAsync(async (req: Request, res: Response) => {
    const result = await FinanceService.getAllPayouts(req.query);
    ApiResponse.paginated(res, result.result, (req.query.page as any) || 1, (req.query.limit as any) || 10, result.meta.total, "Payouts retrieved successfully");
});

const getPayoutSummary = catchAsync(async (req: any, res: Response) => {
    const { businessUnitId } = req.params;
    const result = await FinanceService.getFinanceSummary(businessUnitId as string, req.user);
    ApiResponse.success(res, result, "Payout summary retrieved successfully");
});

export const PayoutController = {
    createPayout,
    getAllPayouts,
    getPayoutSummary
};
