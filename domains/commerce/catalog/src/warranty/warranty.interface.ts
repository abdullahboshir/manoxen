import type { Document, Types } from "mongoose";
import type { IWarranty as IBaseWarranty } from "@manoxen/shared-types";

export interface IWarranty extends IBaseWarranty {
  organization: Types.ObjectId;
  businessUnit?: Types.ObjectId;
}

export type IWarrantyDocument = IWarranty & Document;
