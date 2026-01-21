import { catchAsync, ApiResponse } from "@manoxen/core-util";
import status from "http-status";
import type { Request, Response } from "express";
import { FinanceService } from "../../../application/services/finance.service";

const runReconciliation = catchAsync(async (req: any, res: Response) => {
    const { businessUnitId } = req.body;
    const result = await FinanceService.reconcileTransactions(businessUnitId, req.user);
    ApiResponse.success(res, result, "Reconciliation process completed", status.OK);
});

export const ReconciliationController = {
    runReconciliation
};
