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

// ============================================
// Tenant Configuration
// ============================================
export type DeploymentType = 'shared' | 'dedicated';

export interface ITenantConfig {
  deploymentType: DeploymentType;
  customDomain?: string;       // e.g., 'client.theirorganization.com'
  databaseUri?: string;        // Dedicated DB URI (encrypted at rest)
  storageConfig?: {
    provider?: 'cloudinary' | 's3' | 'local';
    // Cloudinary specific
    cloudName?: string;
    apiKey?: string;
    apiSecret?: string;
    // S3 specific
    bucket?: string;
    region?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    // Common
    cdnUrl?: string;
    basePath?: string; // Custom folder prefix
  };
  isProvisioned?: boolean;     // Has the dedicated environment been set up?
  provisionedAt?: Date;
}

// ============================================
// Domain Manifest
// ============================================
export interface IDomainManifest {
  domain: string;
  type: 'core' | 'supporting' | 'generic';
  status: 'active' | 'deprecated' | 'planned';
  version: string;
  description?: string;
  dependencies?: string[];
  optional?: string[];
  exposes?: string[];
  notes?: string;
  roadmap?: Record<string, string>;
  createdAt?: string;
}

