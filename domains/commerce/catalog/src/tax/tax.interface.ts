import { Types, Model, Document } from 'mongoose';
import type { ITax as IBaseTax } from "@manoxen/shared-types";

export interface ITax extends Omit<IBaseTax, '_id'>, Document {
    businessUnit: Types.ObjectId | null;
    organization: Types.ObjectId | null;
    createdBy?: Types.ObjectId;
}

export type TaxModel = Model<ITax, object>;
