import { catchAsync, ApiResponse } from "@manoxen/core-util";
import status from "http-status";
import type { Request, Response } from "express";
import { BusinessUnitService } from "./business-unit.service";


export const createBusinessUnitController = catchAsync(async (req: Request, res: Response) => {
  const businessUnitData = req.body;
  const data = await BusinessUnitService.createBusinessUnit(businessUnitData)

  ApiResponse.success(
    res,
    data,
    'Account has been Created Successfully',
    status.OK
  )
})

export const getAllBusinessUnitsController = catchAsync(async (req: Request, res: Response) => {
  const result = await BusinessUnitService.getAllBusinessUnits(req.query, (req as any).user);

  if (result && result.meta) {
    ApiResponse.paginated(
      res,
      result.result,
      result.meta.page,
      result.meta.limit,
      result.meta.total,
      'Business Units retrieved successfully',
      status.OK
    );
  } else {
    ApiResponse.success(
      res,
      result,
      'Business Units retrieved successfully',
      status.OK
    );
  }
});

export const deleteBusinessUnitController = catchAsync(async (req: Request, res: Response) => {
  const businessUnitId = req.params["businessUnitId"] as string;
  if (!businessUnitId) {
    throw new Error("Business Unit ID is required");
  }
  await BusinessUnitService.deleteBusinessUnit(businessUnitId);
  ApiResponse.success(
    res,
    null,
    'Business Unit deleted successfully',
    status.OK
  );
});

export const getBusinessUnitByIdController = catchAsync(async (req: Request, res: Response) => {
  const businessUnitId = req.params["businessUnitId"] as string;
  if (!businessUnitId) {
    throw new Error("Business Unit ID is required");
  }
  const data = await BusinessUnitService.getBusinessUnitById(businessUnitId);
  ApiResponse.success(
    res,
    data,
    'Business Unit retrieved successfully',
    status.OK
  );
});

export const updateBusinessUnitController = catchAsync(async (req: Request, res: Response) => {
  const businessUnitId = req.params["businessUnitId"] as string;
  if (!businessUnitId) {
    throw new Error("Business Unit ID is required");
  }
  const updateData = req.body;
  const data = await BusinessUnitService.updateBusinessUnit(businessUnitId, updateData);
  ApiResponse.success(
    res,
    data,
    'Business Unit updated successfully',
    status.OK
  );
});

export const getBusinessUnitStatsController = catchAsync(async (req: Request, res: Response) => {
  const businessUnitId = req.params["businessUnitId"] as string;
  const { outletId } = req.query;

  if (!businessUnitId) {
    throw new Error("Business Unit ID is required");
  }

  const data = await BusinessUnitService.getDashboardStats(businessUnitId, outletId as string);

  ApiResponse.success(
    res,
    data,
    'Business Unit stats retrieved successfully',
    status.OK
  );
});
















