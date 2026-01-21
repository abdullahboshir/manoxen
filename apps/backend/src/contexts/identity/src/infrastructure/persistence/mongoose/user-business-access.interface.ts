import { Types, Document } from "mongoose";

export interface IUserBusinessAccess extends Document {
    user: Types.ObjectId;
    role: Types.ObjectId;
    scope: 'GLOBAL' | 'ORGANIZATION' | 'BUSINESS' | 'OUTLET';
    organization?: Types.ObjectId;
    businessUnit?: Types.ObjectId;
    outlet?: Types.ObjectId;
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
    restrictedModules: string[];
    isPrimary: boolean;
    assignedBy?: Types.ObjectId;
    assignedAt: Date;
    expiresAt?: Date;
    notes?: string;
    dataScopeOverride?: 'own' | 'outlet' | 'business' | 'organization' | 'global' | null;
}
