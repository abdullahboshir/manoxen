import { Types } from "mongoose";
import type { IBrand as IBaseBrand } from "@manoxen/shared-types";

export interface IBrand extends IBaseBrand {
    businessUnit?: Types.ObjectId;
    organization?: Types.ObjectId;
}
