export type ModuleName = 
  | 'iam' 
  | 'pos' 
  | 'erp' 
  | 'hrm' 
  | 'ecommerce' 
  | 'crm' 
  | 'governance' 
  | 'integrations' 
  | 'system' 
  | 'saas' 
  | 'platform';

export interface IModuleConfig {
  enabled: boolean;
  features?: Record<string, boolean>;
}

export type IActiveModules = Partial<Record<ModuleName, boolean>>;
