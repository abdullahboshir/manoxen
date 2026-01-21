import type { Request, Response } from "express";
import { catchAsync, GenericController } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import { LogisticsService } from "#contexts/logistics/src/application/services/logistics.service";


// Map for Courier Service
const courierServiceMap = {
    create: LogisticsService.createCourier,
    getAll: LogisticsService.getAllCouriers,
    getById: LogisticsService.getCourierById,
    update: LogisticsService.updateCourier,
    delete: LogisticsService.deleteCourier
};

const courierController = new GenericController(courierServiceMap, 'Courier');

const createShipment = catchAsync(async (req: Request, res: Response) => {
    const { orderId, courierId } = req.body;
    const result = await LogisticsService.createShipment(orderId, courierId, (req as any).user);
    ApiResponse.success(
        res,
        result,
        "Shipment created successfully",
        httpStatus.OK
    );
});

export const LogisticsActionController = {
    createShipment
};

export { courierController };

