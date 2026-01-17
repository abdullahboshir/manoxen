import type { Request, Response } from "express";
import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import { PurchaseReportService } from "./purchase-report.service";

const getPurchaseStats = catchAsync(async (req: Request, res: Response) => {
    // Extract filters from query
    const filters = {
        startDate: req.query['startDate'] as string,
        endDate: req.query['endDate'] as string,
        businessUnit: req.query['businessUnit'] as string,
        outlet: req.query['outlet'] as string,
        supplier: req.query['supplier'] as string,
        groupBy: req.query['groupBy'] as 'day' | 'month' | 'supplier'
    };

    const result = await PurchaseReportService.getPurchaseStats(filters);
    ApiResponse.success(res, result, "Purchase report generated successfully", httpStatus.OK);
});

export const PurchaseReportController = {
    getPurchaseStats
};





