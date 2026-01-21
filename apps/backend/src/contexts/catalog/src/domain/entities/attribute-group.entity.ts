
export interface IAttributeField {
    key: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'select' | 'boolean' | 'textarea';
    required: boolean;
    options?: string[];
    placeholder?: string;
}

export interface IAttributeGroup {
    name: string;
    code: string;
    description?: string;
    availableModules: ('pos' | 'erp' | 'hrm' | 'commerce' | 'crm' | 'logistics' | 'marketing' | 'integrations' | 'system')[];
    fields: IAttributeField[];
    sortOrder: number;
    isActive: boolean;
    organization: string;
    businessUnit: string;
}
