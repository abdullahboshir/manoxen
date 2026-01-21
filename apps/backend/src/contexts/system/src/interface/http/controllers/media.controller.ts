import type { Request, Response } from 'express';
import { MediaService } from '../../../application/services/media.service';
import { ApiResponse, catchAsync } from '@manoxen/core-util';
import status from 'http-status';

export class MediaController {
    static register = catchAsync(async (req: any, res: Response) => {
        const result = await MediaService.registerMedia(req.body, req.user);
        ApiResponse.success(res, result, 'Media registered successfully', status.CREATED);
    });

    static getLibrary = catchAsync(async (req: any, res: Response) => {
        const result = await MediaService.getMediaLibrary(req.user, req.query);
        ApiResponse.success(res, result, 'Media library retrieved successfully');
    });

    static getById = catchAsync(async (req: any, res: Response) => {
        const result = await MediaService.getMediaById(req.params.id, req.user);
        ApiResponse.success(res, result, 'Media retrieved successfully');
    });

    static updateMetadata = catchAsync(async (req: any, res: Response) => {
        const result = await MediaService.updateMediaMetadata(req.params.id, req.body, req.user);
        ApiResponse.success(res, result, 'Media metadata updated successfully');
    });

    static delete = catchAsync(async (req: any, res: Response) => {
        await MediaService.deleteMedia(req.params.id, req.user);
        ApiResponse.success(res, null, 'Media deleted successfully');
    });
}
