import type { Request, Response } from 'express';
import { StorageService } from "#shared/file-storage/storage.service";
import { catchAsync } from '@manoxen/core-util';
import { ApiResponse } from '@manoxen/core-util';
import httpStatus from 'http-status';

const uploadImage = catchAsync(async (req: Request, res: Response) => {
    if (!req.file) {
        throw new Error('No file uploaded');
    }
    const result = await StorageService.uploadFile(req.file, 'uploads');

    ApiResponse.success(
        res,
        {
            url: result.url,
            public_id: result.key
        },
        'Image uploaded successfully',
        httpStatus.OK
    );
});

export const UploadController = {
    uploadImage
};






















