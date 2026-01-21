import type { NextFunction, Request, Response } from "express";
import { ApiResponse, catchAsync } from "@manoxen/core-util";
import { createOrderService, getAllOrdersService, getOrderByIdService, updateOrderStatusService } from "#domain/sales/application/services/order.service.js";


export const createOrderController = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    // Assuming user/businessUnit is attached to req via middleware
    // For now, trust the body or inject businessUnit from user
    // req.body.businessUnit = req.user.businessUnit; 

    const result = await createOrderService(req.body);
    ApiResponse.success(res, result, "Order created successfully", 201);
});

export const getAllOrdersController = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const result = await getAllOrdersService(req.query);

    if (result && result.meta) {
        ApiResponse.paginated(
            res,
            result.result,
            result.meta.page,
            result.meta.limit,
            result.meta.total,
            "Orders retrieved successfully"
        );
    } else {
        ApiResponse.success(res, result, "Orders retriseved successfully");
    }
});

export const getOrderByIdController = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const orderId = req.params['id'];
    if (!orderId) {
        throw new Error("Order ID is required");
    }
    const result = await getOrderByIdService(orderId as string);
    ApiResponse.success(res, result, "Order details retrieved successfully");
});

export const updateOrderStatusController = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const orderId = req.params['id'];
    if (!orderId) {
        throw new Error("Order ID is required");
    }
    const result = await updateOrderStatusService(orderId as string, req.body.status);
    ApiResponse.success(res, result, "Order status updated successfully");
});





