import type { Request, Response } from 'express';
import { WebhookService } from '../../../application/services/webhook.service';
import { ApiResponse, catchAsync } from '@manoxen/core-util';
import status from 'http-status';

export class WebhookController {
    static create = catchAsync(async (req: any, res: Response) => {
        const result = await WebhookService.createWebhook(req.body, req.user);
        ApiResponse.success(res, result, 'Webhook created successfully', status.CREATED);
    });

    static getAll = catchAsync(async (req: any, res: Response) => {
        const result = await WebhookService.getWebhooks(req.user);
        ApiResponse.success(res, result, 'Webhooks retrieved successfully');
    });

    static update = catchAsync(async (req: any, res: Response) => {
        const result = await WebhookService.updateWebhook(req.params.id, req.body, req.user);
        ApiResponse.success(res, result, 'Webhook updated successfully');
    });

    static delete = catchAsync(async (req: any, res: Response) => {
        await WebhookService.deleteWebhook(req.params.id, req.user);
        ApiResponse.success(res, null, 'Webhook deleted successfully');
    });
}
