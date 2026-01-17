// Shared Types for Manoxen Monorepo
// Types that are used across multiple packages and applications

// ============================================
// Common Entities
// ============================================
export interface IBaseEntity {
  _id: string;
  id: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  isDeleted?: boolean;
}

export interface IPaginatedResponse<T> {
  result: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// ============================================
// Multi-Tenancy Context
// ============================================
export interface ITenantContext {
  organizationId?: string;
  businessUnitId?: string;
  outletId?: string;
}

export interface IRequestContext extends ITenantContext {
  userId: string;
  roleType: string;
  scopeLevel: 'PLATFORM' | 'ORGANIZATION' | 'BUSINESS_UNIT' | 'OUTLET';
  domain?: string;
}

// ============================================
// Module Configuration
// ============================================
export * from "./common.types";

export * from "./module.contracts";
export * from "./product.types";
