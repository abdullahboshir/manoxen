import status from "http-status";

import { catchAsync, ApiResponse, sanitizePayload } from "@manoxen/core-util";
import type { Request, Response } from "express";
import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, updateProductService } from "./product.service";



export const createProductController = catchAsync(async (req: Request, res: Response) => {
  // Sanitize payload (Service handles BU resolution)
  const cleanPayload = sanitizePayload(req.body, ['primaryCategory', 'unit', 'outlet', 'businessUnit']);

  const data = await createProductService(cleanPayload, (req as any).user);

  ApiResponse.success(
    res,
    data,
    'Product has been Created Successfully',
    status.OK
  )
})


export const getAllProductsController = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllProductsService(req.query);

  if (result && result.meta) {
    ApiResponse.paginated(
      res,
      result.result,
      result.meta.page,
      result.meta.limit,
      result.meta.total,
      'Products retrieved successfully',
      status.OK
    );
  } else {
    ApiResponse.success(
      res,
      result,
      'Products retrieved successfully',
      status.OK
    );
  }
});

export const getProductByIdController = catchAsync(async (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const data = await getProductByIdService(id as string);
  ApiResponse.success(
    res,
    data,
    'Product retrieved successfully',
    status.OK
  );
});

export const updateProductController = catchAsync(async (req: Request, res: Response) => {
  const id = req.params["id"] as string;

  // Sanitize payload (Service handles BU resolution)
  const cleanPayload = sanitizePayload(req.body, ['primaryCategory', 'unit', 'outlet', 'businessUnit']);

  const data = await updateProductService(id as string, cleanPayload, (req as any).user);
  ApiResponse.success(
    res,
    data,
    'Product updated successfully',
    status.OK
  );
});

export const deleteProductController = catchAsync(async (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const force = req.query['force'] === 'true';
  const data = await deleteProductService(id as string, force);
  ApiResponse.success(
    res,
    data,
    force ? 'Product permanently deleted' : 'Product moved to trash',
    status.OK
  );
});




