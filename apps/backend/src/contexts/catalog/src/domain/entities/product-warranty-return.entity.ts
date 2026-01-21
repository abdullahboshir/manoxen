import { Document } from "mongoose";

export interface IProductWarrantyReturn {
    product: string;
    // Add properties
}

export interface IProductWarrantyReturnDocument extends IProductWarrantyReturn, Document {}
