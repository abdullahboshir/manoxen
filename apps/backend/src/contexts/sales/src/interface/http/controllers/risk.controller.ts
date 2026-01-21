import type { Request, Response } from "express";
import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import { GenericController } from "@manoxen/core-util";
import { RiskService } from "#domain/sales/application/services/risk.service.js";

// Map for Blacklist Service
const blacklistServiceMap = {
    create: RiskService.createBlacklistEntry,
    getAll: RiskService.getAllBlacklistEntries,
    getById: RiskService.getBlacklistEntryById,
    update: RiskService.updateBlacklistEntry,
    delete: RiskService.deleteBlacklistEntry
};

// Map for RiskRule Service
const riskRuleServiceMap = {
    create: RiskService.createRiskRule,
    getAll: RiskService.getAllRiskRules,
    getById: RiskService.getRiskRuleById,
    update: RiskService.updateRiskRule,
    delete: RiskService.deleteRiskRule
};

const blacklistController = new GenericController(blacklistServiceMap, 'Blacklist');
const riskRuleController = new GenericController(riskRuleServiceMap, 'RiskRule');

const checkFraud = catchAsync(async (req: Request, res: Response) => {
    const result = await RiskService.checkFraud(req.body, (req as any).user);
    ApiResponse.success(
        res,
        result,
        "Fraud check completed successfully",
        httpStatus.OK
    );
});

export const RiskSearchController = {
    checkFraud
};

export { blacklistController, riskRuleController };





