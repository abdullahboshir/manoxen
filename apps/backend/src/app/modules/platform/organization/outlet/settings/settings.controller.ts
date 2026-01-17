import type { Request, Response } from 'express';
import { catchAsync } from '@manoxen/core-util';
import { ApiResponse } from '@manoxen/core-util';
import status from 'http-status';
import { OutletSettingsService } from "./settings.service";
import { AppError } from "@manoxen/core-util";

const getSettings = catchAsync(async (req: Request, res: Response) => {
    const outletId = req.params['outletId'] as string;
    if (!outletId) throw new AppError(status.BAD_REQUEST, 'Outlet ID is required');

    const result = await OutletSettingsService.getSettings(outletId);
    ApiResponse.success(res, result, 'Outlet settings retrieved', status.OK);
});

const updateSettings = catchAsync(async (req: Request, res: Response) => {
    const outletId = req.params['outletId'] as string;
    if (!outletId) throw new AppError(status.BAD_REQUEST, 'Outlet ID is required');

    const result = await OutletSettingsService.updateSettings(outletId, req.body);
    ApiResponse.success(res, result, 'Outlet settings updated', status.OK);
});

export const OutletSettingsController = {
    getSettings,
    updateSettings
};



















