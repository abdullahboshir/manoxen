export interface IAssetCategory {
    id?: string;
    name: string;
    code: string;
    description?: string;
    module: 'pos' | 'erp' | 'hrm' | 'commerce' | 'crm' | 'logistics' | 'system';
    depreciationRate?: number;
    isActive: boolean;
    businessUnit: string;
}
