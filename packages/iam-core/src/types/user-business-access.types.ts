import { Types, Document } from "mongoose";

export interface IUserBusinessAccess extends Document {
    user: Types.ObjectId;
    role: Types.ObjectId;
    scope: 'GLOBAL' | 'ORGANIZATION' | 'BUSINESS' | 'OUTLET';
    organization?: Types.ObjectId | null;
    businessUnit?: Types.ObjectId | null;
    outlet?: Types.ObjectId | null;
    restrictedModules?: string[];
    status: 'active' | 'suspended';
    isPrimary: boolean;
    assignedBy?: Types.ObjectId;
    assignedAt: Date;
    expiresAt?: Date;
    notes?: string;
    dataScopeOverride?: 'own' | 'outlet' | 'business' | 'organization' | 'global' | null;
}
