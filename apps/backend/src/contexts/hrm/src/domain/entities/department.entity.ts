export interface IDepartment {
    id?: string;
    name: string;
    code: string;
    description?: string;
    module: 'pos' | 'erp' | 'hrm' | 'commerce' | 'crm' | 'logistics' | 'system';
    businessUnit: string;
    parentId?: string;
    headOfDepartment?: string;
    organization: string;
    isActive: boolean;
}
