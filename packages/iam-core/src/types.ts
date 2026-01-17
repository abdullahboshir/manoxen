export type Action = 'create' | 'read' | 'update' | 'delete' | 'manage';
export type Resource = 'product' | 'order' | 'user' | 'business-unit' | 'settings';

export interface UserContext {
  id: string;
  roles: string[];
  permissions: string[];
  isSuperAdmin: boolean;
  organizationId?: string;
  businessUnitId?: string; // The BU they are currently ACTING in
  outletId?: string;       // The Outlet they are currently ACTING in
}

export interface PolicyContext {
  organizationId?: string;
  businessUnitId?: string;
  outletId?: string;
  [key: string]: any;
}

export type PolicyResult = {
  allowed: boolean;
  reason?: string;
}
