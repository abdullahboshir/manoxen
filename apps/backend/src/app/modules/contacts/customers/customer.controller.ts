import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import type { Request, Response } from "express";
import { createCustomerService, getAllCustomersService } from "./customer.service";


export const getAllCustomersController = catchAsync(async (_req: Request, res: Response) => {
    const data = await getAllCustomersService();
    ApiResponse.success(res, data, "Customers retrieved successfully");
});

export const createCustomerController = catchAsync(async (req: Request, res: Response) => {
    const data = await createCustomerService(req.body);
    ApiResponse.success(res, data, "Account has been Created Successfully", httpStatus.CREATED);
});

















