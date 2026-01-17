import type { Request, Response } from 'express';
import { catchAsync } from '@manoxen/core-util';
import { ApiResponse } from '@manoxen/core-util';
import status from 'http-status';
import { OrganizationSettingsService } from "./settings.service";
import { AppError } from "@manoxen/core-util";

const getSettings = catchAsync(async (req: Request, res: Response) => {
    const organizationId = req.params['organizationId'] as string;
    if (!organizationId) throw new AppError(status.BAD_REQUEST, 'Organization ID is required');

    const result = await OrganizationSettingsService.getSettings(organizationId);
    ApiResponse.success(res, result, 'Organization settings retrieved', status.OK);
});

const updateSettings = catchAsync(async (req: Request, res: Response) => {
    const organizationId = req.params['organizationId'] as string;
    if (!organizationId) throw new AppError(status.BAD_REQUEST, 'Organization ID is required');

    const result = await OrganizationSettingsService.updateSettings(organizationId, req.body);
    ApiResponse.success(res, result, 'Organization settings updated', status.OK);
});

export const OrganizationSettingsController = {
    getSettings,
    updateSettings
};



















