import { catchAsync, ApiResponse } from "@manoxen/core-util";
import status from "http-status";
import type { Request, Response } from "express";
import { outletService } from "../../../application/services/outlet.service";

export const createOutletController = catchAsync(async (req: Request, res: Response) => {
  const data = await outletService.createOutlet(req.body, (req as any).user);
  ApiResponse.success(res, data, 'Outlet created successfully', status.CREATED);
});

export const getOutletsController = catchAsync(async (req: Request, res: Response) => {
  const result = await outletService.getOutlets(req.query);
  ApiResponse.paginated(
    res,
    result.data,
    result.meta.page,
    result.meta.limit,
    result.meta.total,
    'Outlets retrieved successfully',
    status.OK
  );
});

export const getOutletByIdController = catchAsync(async (req: Request, res: Response) => {
  const data = await outletService.getOutletById(req.params.id);
  ApiResponse.success(res, data, 'Outlet retrieved successfully', status.OK);
});

export const updateOutletController = catchAsync(async (req: Request, res: Response) => {
  const data = await outletService.updateOutlet(req.params.id, req.body);
  ApiResponse.success(res, data, 'Outlet updated successfully', status.OK);
});

export const deleteOutletController = catchAsync(async (req: Request, res: Response) => {
  await outletService.deleteOutlet(req.params.id);
  ApiResponse.success(res, null, 'Outlet deleted successfully', status.OK);
});

export const getOutletStatsController = catchAsync(async (req: Request, res: Response) => {
  const data = await outletService.getOutletStats(req.params.id);
  ApiResponse.success(res, data, 'Outlet stats retrieved successfully', status.OK);
});
