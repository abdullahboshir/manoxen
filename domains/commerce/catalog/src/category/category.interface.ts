import type { Types } from "mongoose";
import type { ICategory as IBaseCategory } from "@manoxen/shared-types";

export interface ICategory extends IBaseCategory {
  organization: Types.ObjectId;
  businessUnit: Types.ObjectId;
  parentId?: Types.ObjectId | null;
}
