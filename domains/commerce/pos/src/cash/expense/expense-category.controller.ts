import type { Request, Response } from "express";
import { catchAsync } from "@manoxen/core-util";
import { ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import { ExpenseCategoryService } from "./expense-category.service";

const createExpenseCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await ExpenseCategoryService.createExpenseCategory(req.body);
    ApiResponse.success(res, result, "Expense category created successfully", httpStatus.CREATED);
});

const getAllExpenseCategories = catchAsync(async (req: Request, res: Response) => {
    const result = await ExpenseCategoryService.getAllExpenseCategories(req.query);
    const { meta, result: data } = result;
    ApiResponse.paginated(res, data, meta.page, meta.limit, meta.total, "Expense categories retrieved successfully");
});

const getExpenseCategoryById = catchAsync(async (req: Request, res: Response) => {
    const result = await ExpenseCategoryService.getExpenseCategoryById(req.params['id'] as string);
    ApiResponse.success(res, result, "Expense category retrieved successfully", httpStatus.OK);
});

const updateExpenseCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await ExpenseCategoryService.updateExpenseCategory(req.params['id'] as string, req.body);
    ApiResponse.success(res, result, "Expense category updated successfully", httpStatus.OK);
});

const deleteExpenseCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await ExpenseCategoryService.deleteExpenseCategory(req.params['id'] as string);
    ApiResponse.success(res, result, "Expense category deleted successfully", httpStatus.OK);
});

export const ExpenseCategoryController = {
    createExpenseCategory,
    getAllExpenseCategories,
    getExpenseCategoryById,
    updateExpenseCategory,
    deleteExpenseCategory,
};




