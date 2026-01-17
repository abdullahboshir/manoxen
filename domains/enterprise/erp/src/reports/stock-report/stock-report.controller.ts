import type { Request, Response } from "express";
import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import { StockReportService } from "./stock-report.service";

const getStockValuation = catchAsync(async (req: Request, res: Response) => {
    // Extract filters from query
    const filters = {
        businessUnit: req.query['businessUnit'] as string,
        outlet: req.query['outlet'] as string,
        category: req.query['category'] as string,
        brand: req.query['brand'] as string,
        lowStockOnly: req.query['lowStockOnly'] === 'true'
    };

    const result = await StockReportService.getStockValuation(filters);
    ApiResponse.success(res, result, "Stock valuation report generated successfully", httpStatus.OK);
});

export const StockReportController = {
    getStockValuation
};





