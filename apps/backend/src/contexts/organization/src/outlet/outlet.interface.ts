import type { Document, Model, Types } from "mongoose";
import type { ISharedBranding, ISharedContact, ISharedLocation } from "../shared/common.interface";

export interface IOutlet {
    name: string;
    code: string;
    branding: ISharedBranding;
    contact: ISharedContact;
    location: ISharedLocation;
    activeModules: {
        pos: boolean;
        erp: boolean;
        hrm: boolean;
        commerce: boolean;
        crm: boolean;
        logistics: boolean;
    };
    organization: Types.ObjectId | string;
    businessUnit: Types.ObjectId | string;
    manager?: {
        name?: string;
        phone?: string;
        email?: string;
        userId?: Types.ObjectId | string;
    };
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IOutletDocument extends IOutlet, Document {}

export interface IOutletModel extends Model<IOutletDocument> {
    isCodeTaken(code: string, businessUnitId: string, session?: any): Promise<boolean>;
}
