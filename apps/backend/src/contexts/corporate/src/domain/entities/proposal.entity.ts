/**
 * Proposal Domain Entity (Corporate Governance)
 * Pure domain representation - NO infrastructure dependencies
 */

export interface IVoteResult {
  for: number;
  against: number;
  abstain: number;
  totalVotes: number;
}

export interface IProposal {
  id: string;
  title: string;
  description: string;
  
  // Classification
  type: 'resolution' | 'amendment' | 'budget' | 'appointment' | 'policy' | 'other';
  category?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  
  // Ownership
  proposedBy: string;
  organization: string;
  
  // Timeline
  submittedAt: Date;
  votingStartsAt?: Date;
  votingEndsAt?: Date;
  
  // Voting
  requiredQuorum?: number; // percentage
  requiredMajority?: number; // percentage
  voteResult?: IVoteResult;
  
  // Status
  status: 'draft' | 'submitted' | 'under_review' | 'voting' | 'approved' | 'rejected' | 'withdrawn';
  
  // Attachments
  attachments?: string[];
  
  // Lifecycle
  createdAt: Date;
  updatedAt: Date;
  
  // Notes
  remarks?: string;
}

export type ProposalInput = Omit<IProposal, 'id' | 'createdAt' | 'updatedAt'>;
export type ProposalUpdate = Partial<ProposalInput>;
