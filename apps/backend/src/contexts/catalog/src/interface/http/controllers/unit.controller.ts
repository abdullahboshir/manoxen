
import { UnitService } from "../../../application/services/unit.service";
import { GenericController } from "@manoxen/core-util";
import type { Request, Response, NextFunction } from "express";
import { catchAsync } from "@manoxen/core-util"; // Added this line to re-import catchAsync

const unitServiceMap = {
    create: UnitService.createUnit,
    getAll: UnitService.getAllUnits,
    getById: UnitService.getUnitById,
    update: UnitService.updateUnit,
    delete: UnitService.deleteUnit
};

const controller = new GenericController(unitServiceMap, "Unit");

export const UnitController = {
    ...controller,
    create: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        (req as any).body.createdBy = (req as any).user?.userId;
        controller.create(req, res, next);
    }),
    getAll: controller.getAll,
    getById: controller.getById,
    update: controller.update,
    delete: controller.delete
};
