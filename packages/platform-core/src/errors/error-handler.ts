import type { Request, Response, NextFunction } from "express";
import { ApiError } from "./api-error";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const e = err as any;
  const statusCode = e?.statusCode || e?.status || 500;
  const message = e?.message || "Internal Server Error";
  const code = e?.code || (err instanceof ApiError ? err.code : undefined);

  return res.status(statusCode).json({
    success: false,
    message,
    code,
  });
}

