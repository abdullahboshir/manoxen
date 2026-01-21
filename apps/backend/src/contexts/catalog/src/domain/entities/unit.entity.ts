import { Types } from 'mongoose';
import type { IUnit as IBaseUnit } from "@manoxen/shared-types";

export interface IUnit extends Omit<IBaseUnit, '_id'> {
    businessUnit: Types.ObjectId | null;
    organization: Types.ObjectId | null;
    createdBy?: Types.ObjectId;
}
