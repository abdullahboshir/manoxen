export interface IUser {
    id: string;
    _id?: string;
    vendorId?: string;
    branches?: string;
    name?: {
        firstName: string;
        lastName?: string;
    };
    email: string;
    phone?: string;
    password?: string;
    isSuperAdmin: boolean;
    globalRoles: string[];
    isEmailVerified: boolean;
    region?: string;
    isPhoneVerified: boolean;
    status: string;
    avatar?: string;
    organization?: string;
    needsPasswordChange: boolean;
    passwordChangedAt?: Date;
    isDeleted: boolean;
    isActive: boolean;
    lastLogin?: Date;
    loginHistory?: Array<{
        date: Date;
        ip: string;
        userAgent: string;
    }>;
    settings?: {
        theme?: string;
        tableHeight?: string;
    };
    businessAccess?: any[]; // Replaced with actual type if available
    directPermissions?: any[];
    setupPasswordToken?: string;
    setupPasswordExpires?: Date;
    metadata?: any;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
