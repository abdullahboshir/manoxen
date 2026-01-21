/**
 * Shareholder Domain Entity
 * Pure domain representation - NO infrastructure dependencies
 */

export interface IShareholderIdentity {
  nationalId?: string;
  passportNumber?: string;
  taxId?: string;
}

export interface IShareholder {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  
  // Ownership
  sharePercentage: number;
  shareCount?: number;
  shareClass?: 'common' | 'preferred' | 'founders';
  
  // Identity
  identity?: IShareholderIdentity;
  address?: string;
  
  // Classification
  type: 'individual' | 'institutional' | 'corporate';
  isFounder?: boolean;
  isBoardMember?: boolean;
  
  // Relationships
  organization: string;
  
  // Lifecycle
  status: 'active' | 'inactive' | 'exited';
  joinedAt?: Date;
  exitedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Voting
  votingRights?: boolean;
  votingWeight?: number;
}

export type ShareholderInput = Omit<IShareholder, 'id' | 'createdAt' | 'updatedAt'>;
export type ShareholderUpdate = Partial<ShareholderInput>;
