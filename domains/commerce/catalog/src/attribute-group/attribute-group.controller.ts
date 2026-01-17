import type { Request, Response } from "express";
import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import { AttributeGroupService } from "./attribute-group.service";

const createAttributeGroup = catchAsync(async (req: Request, res: Response) => {
    const result = await AttributeGroupService.createAttributeGroup(req.body);
    ApiResponse.success(res, result, "Attribute Group created successfully", httpStatus.CREATED);
});

const getAllAttributeGroups = catchAsync(async (req: Request, res: Response) => {
    const result = await AttributeGroupService.getAllAttributeGroups(req.query as Record<string, unknown>);
    ApiResponse.success(res, result, "Attribute Groups retrieved successfully", httpStatus.OK);
});

const getAttributeGroupById = catchAsync(async (req: Request, res: Response) => {
    const result = await AttributeGroupService.getAttributeGroupById(req.params['id'] as string);
    ApiResponse.success(res, result, "Attribute Group retrieved successfully", httpStatus.OK);
});

const updateAttributeGroup = catchAsync(async (req: Request, res: Response) => {
    const result = await AttributeGroupService.updateAttributeGroup(req.params['id'] as string, req.body);
    ApiResponse.success(res, result, "Attribute Group updated successfully", httpStatus.OK);
});

const deleteAttributeGroup = catchAsync(async (req: Request, res: Response) => {
    const result = await AttributeGroupService.deleteAttributeGroup(req.params['id'] as string);
    ApiResponse.success(res, result, "Attribute Group deleted successfully", httpStatus.OK);
});

export const AttributeGroupController = {
    createAttributeGroup,
    getAllAttributeGroups,
    getAttributeGroupById,
    updateAttributeGroup,
    deleteAttributeGroup
};





