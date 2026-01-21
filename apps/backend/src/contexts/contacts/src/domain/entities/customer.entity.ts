/**
 * Customer Domain Entity
 * Pure domain representation - NO infrastructure dependencies
 */

import type { TName } from "@manoxen/iam-core";

export interface ICustomerAddress {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface ICustomer {
  id: string;
  name: TName;
  email: string;
  phone?: string;
  alternatePhone?: string;
  address?: ICustomerAddress;
  
  // Classification
  type: 'individual' | 'business';
  segment?: 'regular' | 'premium' | 'vip';
  
  // Relationships
  user: string;
  organization?: string;
  businessUnit?: string;
  
  // Lifecycle
  status: 'active' | 'inactive' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
  
  // Marketing
  tags?: string[];
  notes?: string;
  loyaltyPoints?: number;
  avatar?: string;
  outlet?: string;
}

export type CustomerInput = Omit<ICustomer, 'id' | 'createdAt' | 'updatedAt'>;
export type CustomerUpdate = Partial<CustomerInput>;
