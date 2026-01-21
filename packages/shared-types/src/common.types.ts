export type ModuleName = 
  | 'iam' 
  | 'pos' 
  | 'erp' 
  | 'hrm' 
  | 'commerce' 
  | 'crm' 
  | 'logistics'
  | 'governance' 
  | 'integrations' 
  | 'system' 
  | 'saas' 
  | 'platform'
  | 'accounting'
  | 'reports'
  | 'api_access';

export interface IModuleConfig {
  enabled: boolean;
  features?: Record<string, boolean>;
}

export type IActiveModules = Partial<Record<ModuleName, boolean>>;
