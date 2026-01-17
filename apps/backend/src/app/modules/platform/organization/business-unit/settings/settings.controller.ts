import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import status from "http-status";
import type { Request, Response } from "express";
import { getSettingsService, updateSettingsService } from "./settings.service";

const getSettings = catchAsync(async (req: Request, res: Response) => {
    const { businessUnitId } = req.params;
    const result = await getSettingsService(businessUnitId as string);

    ApiResponse.success(res, {
        statusCode: status.OK,
        success: true,
        message: "Business Unit Settings retrieved successfully",
        data: result,
    });
});

const updateSettings = catchAsync(async (req: Request, res: Response) => {
    const { businessUnitId } = req.params;
    const payload = req.body;
    const result = await updateSettingsService(businessUnitId as string, payload);

    ApiResponse.success(res, {
        statusCode: status.OK,
        success: true,
        message: "Settings updated successfully",
        data: result,
    });
});

export const BusinessUnitSettingsController = {
    getSettings,
    updateSettings,
};
















