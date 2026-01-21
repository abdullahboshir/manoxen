import type { Request, Response } from 'express';
import { SubscriptionService } from '../../../application/services/subscription.service';
import { ApiResponse, catchAsync } from '@manoxen/core-util';
import status from 'http-status';

export class SubscriptionController {
    static getActive = catchAsync(async (req: any, res: Response) => {
        const result = await SubscriptionService.getActiveSubscription(req.user);
        ApiResponse.success(res, result, 'Active subscription retrieved successfully');
    });

    static activate = catchAsync(async (req: any, res: Response) => {
        const result = await SubscriptionService.activateSubscription(req.body, req.user);
        ApiResponse.success(res, result, 'Subscription activated successfully', status.CREATED);
    });

    static cancel = catchAsync(async (req: any, res: Response) => {
        const result = await SubscriptionService.cancelSubscription(req.params.id, req.body.reason, req.user);
        ApiResponse.success(res, result, 'Subscription cancelled successfully');
    });

    static getBillingHistory = catchAsync(async (req: any, res: Response) => {
        const result = await SubscriptionService.getBillingHistory(req.user);
        ApiResponse.success(res, result, 'Billing history retrieved successfully');
    });
}
