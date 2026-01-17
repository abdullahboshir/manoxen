import type { Types } from "mongoose";


export interface IRole {
  _id?: Types.ObjectId;
  name: string;
  nameBangla?: string;
  description: string;
  descriptionBangla?: string;
  permissions: Types.ObjectId[];
  permissionGroups?: Types.ObjectId[];
  inheritedRoles?: Types.ObjectId[];
  isSystemRole: boolean;
  isDefault: boolean;
  isActive: boolean;
  roleScope: 'GLOBAL' | 'ORGANIZATION' | 'BUSINESS' | 'OUTLET';
  associatedModules?: string[];
  hierarchyLevel: number;
  organization?: Types.ObjectId | null;
  limits: {
    financial: {
      maxDiscountPercent: number;
      maxDiscountAmount: number;
      maxRefundAmount: number;
      maxCreditLimit: number;
      maxCashTransaction: number;
    };
    dataAccess: {
      maxProducts: number;
      maxOrders: number;
      maxCustomers: number;
      maxOutlets: number;
      maxWarehouses: number;
    };
    security: {
      maxLoginSessions: number;
      ipWhitelistEnabled: boolean;
      loginTimeRestricted: boolean;
    };
    approval: {
      maxPurchaseOrderAmount: number;
      maxExpenseEntry: number;
    }
  };
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  // virtuals
  allPermissions?: Types.ObjectId[];
}
