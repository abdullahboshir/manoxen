import type { IOrganizationSettings } from "#domain/organization/settings/settings.interface.js";
import type { ISharedBranding, ISharedContact, ISharedLocation } from "../../shared/common.interface";

// ====== TENANT CONFIGURATION (Hybrid Multi-Tenancy) ======
import type { ITenantConfig, DeploymentType } from "@manoxen/shared-types";

// ====== TENANT CONFIGURATION (Hybrid Multi-Tenancy) ======
// imported from @manoxen/shared-types

export interface IOrganization {
  branding: ISharedBranding;
  name: string;
  contact: ISharedContact;
  location: ISharedLocation;
  slug: string;

  registrationNumber: string;

  // Business Details
  businessType: 'proprietorship' | 'partnership' | 'private_limited' | 'public_limited' | 'ngo' | 'cooperative';
  establishedDate?: Date;
  numberOfEmployees?: number;

  // Legal Representative
  legalRepresentative?: {
    name?: string;
    designation?: string;
    contactPhone?: string;
    email?: string;
    nationalId?: string;
  };

  // Authorized Capital (for Pvt/Public Ltd)
  capital?: {
    authorizedCapital?: number;
    paidUpCapital?: number;
    shareCapital?: number;
    currency?: string;
  };

  // Ownership & Governance
  shareholders?: Array<{
    name: string;
    sharePercentage: number;
    nidOrPassport?: string;
  }>;
  directors?: Array<{
    name: string;
    designation: string;
    nidOrPassport?: string;
    isManagingDirector?: boolean;
  }>;

  isActive: boolean;
  activeModules?: {
    pos: boolean;
    erp: boolean;
    hrm: boolean;
    commerce: boolean;
    crm: boolean;
    logistics: boolean;
    accounting: boolean;
    reports: boolean;
    integrations: boolean;
    governance: boolean;
    saas: boolean;
    api_access: boolean;
  };

  // ====== TENANT CONFIGURATION ======
  tenantConfig?: ITenantConfig;

  // Virtuals
  settings?: IOrganizationSettings;
}
















