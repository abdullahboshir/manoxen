import type { NextFunction, Request, Response } from "express";

export const authorize = (resource: any, action: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // TODO: Implement actual authorization logic using IAM core
    next();
  };
};
