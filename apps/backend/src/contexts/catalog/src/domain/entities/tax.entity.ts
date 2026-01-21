import { Types } from 'mongoose';
import type { ITax as IBaseTax } from "@manoxen/shared-types";

export interface ITax extends Omit<IBaseTax, '_id'> {
    businessUnit: Types.ObjectId | null;
    organization: Types.ObjectId | null;
    createdBy?: Types.ObjectId;
}
