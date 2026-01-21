/**
 * Lead Domain Entity
 * Pure domain representation - NO infrastructure dependencies
 */

export interface ILeadContact {
  name: string;
  email?: string;
  phone?: string;
  designation?: string;
}

export interface ILead {
  id: string;
  title: string;
  description?: string;
  
  // Contact
  contact: ILeadContact;
  company?: string;
  
  // Pipeline
  source: 'website' | 'referral' | 'social' | 'cold_call' | 'advertisement' | 'other';
  stage: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  probability?: number; // 0-100
  
  // Value
  estimatedValue?: number;
  currency?: string;
  
  // Assignment
  assignedTo?: string;
  organization?: string;
  businessUnit?: string;
  
  // Lifecycle
  status: 'active' | 'converted' | 'archived';
  convertedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Notes
  tags?: string[];
  notes?: string;
}

export type LeadInput = Omit<ILead, 'id' | 'createdAt' | 'updatedAt'>;
export type LeadUpdate = Partial<LeadInput>;
