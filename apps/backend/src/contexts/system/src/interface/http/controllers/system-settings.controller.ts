import type { NextFunction, Request, Response } from "express";
import { ApiResponse } from "@manoxen/core-util";

export const getSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        ApiResponse.success(res, { message: "System Settings", data: {} });
    } catch (error) {
        next(error);
    }
};

export const updateSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        ApiResponse.success(res, { message: "System Settings Updated", data: {} });
    } catch (error) {
        next(error);
    }
};
