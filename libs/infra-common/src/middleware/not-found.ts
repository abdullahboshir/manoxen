
import type { Response, Request } from "express";
import httpStatus from "http-status";
import { ApiResponse } from "@manoxen/core-util";

export const notFoundMiddleware = (req: Request, res: Response) => {
  return ApiResponse.error(
    res,
    `Route ${req.originalUrl} not found!`,
    "NOT_FOUND",
    httpStatus.NOT_FOUND
  );
};












