import { catchAsync, ApiResponse } from "@manoxen/core-util";
import status from "http-status";
import type { Request, Response } from "express";
import { FinanceService } from "../../../application/services/finance.service";

const getSettlementSummary = catchAsync(async (req: any, res: Response) => {
    const { businessUnitId } = req.params;
    const result = await FinanceService.getFinanceSummary(businessUnitId as string, req.user);
    ApiResponse.success(res, result, "Settlement summary retrieved successfully");
});

export const SettlementController = {
    getSettlementSummary
};
