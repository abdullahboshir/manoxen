import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import type { Request, Response } from "express";
import { AppError } from "@manoxen/core-util";
import { OrganizationService } from "./organization.service";

const organizationService = new OrganizationService();

export const createOrganization = catchAsync(async (req: Request, res: Response) => {
    const organization = await organizationService.createOrganization(req.body);
    ApiResponse.success(res, organization, "Organization created successfully", httpStatus.CREATED);
});

export const getAllOrganizations = catchAsync(async (req: Request, res: Response) => {
    const organizations = await organizationService.getAllOrganizations(req.user);
    ApiResponse.success(res, organizations, "Organizations retrieved successfully");
});

export const getOrganizationById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params["id"] as string;
    if (!id) {
        throw new AppError(httpStatus.BAD_REQUEST, "Organization ID is required", "BAD_REQUEST");
    }

    const organization = await organizationService.getOrganizationById(id);
    if (!organization) {
        throw new AppError(httpStatus.NOT_FOUND, "Organization not found", "NOT_FOUND");
    }

    ApiResponse.success(res, organization, "Organization retrieved successfully");
});

export const getOrganizationDashboardStats = catchAsync(async (req: Request, res: Response) => {
    const organizationId = req.params["organizationId"] as string;
    if (!organizationId) {
        throw new AppError(httpStatus.BAD_REQUEST, "Organization ID is required", "BAD_REQUEST");
    }
    const stats = await organizationService.getOrganizationDashboardStats(organizationId);
    ApiResponse.success(res, stats, "Organization dashboard stats retrieved successfully");
});

export const updateOrganizationTenantConfig = catchAsync(async (req: Request, res: Response) => {
    const id = req.params["id"] as string;
    const config = req.body;
    
    if (!id) {
        throw new AppError(httpStatus.BAD_REQUEST, "Organization ID is required", "BAD_REQUEST");
    }

    const organization = await organizationService.updateTenantConfig(id, config);
    if (!organization) {
        throw new AppError(httpStatus.NOT_FOUND, "Organization not found", "NOT_FOUND");
    }

    ApiResponse.success(res, organization, "Tenant configuration updated successfully");
});


















