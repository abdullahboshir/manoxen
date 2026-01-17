import { Document, Model, Types } from 'mongoose';
import type { ISharedBranding, ISharedContact, ISharedLocation } from "@manoxen/core-util";

export interface IOutlet extends Document {
    branding: ISharedBranding;
    name: string;
    contact: ISharedContact;
    location: ISharedLocation;
    code: string;
    activeModules?: {
        pos: boolean;
        erp: boolean;
        hrm: boolean;
        ecommerce: boolean;
        crm: boolean;
        logistics: boolean;
    };
    organization: Types.ObjectId;
    businessUnit: Types.ObjectId;
    manager?: {
        name: string;
        phone: string;
        email: string;
        userId?: Types.ObjectId;
    };
    isActive: boolean;
    updatedAt: Date;
    settings?: any; 
}

export interface IOutletModel extends Model<IOutlet> {
    isCodeTaken(code: string, businessUnitId: string, session?: any): Promise<boolean>;
}
